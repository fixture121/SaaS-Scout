import os
from datetime import datetime, timedelta
from typing import Dict, List
import asyncpraw
from dotenv import load_dotenv
from base_scraper import BaseScraper

class RedditScraper(BaseScraper):
    def __init__(self):
        super().__init__()
        load_dotenv()
        
        # Initialize Reddit API client
        self.reddit = asyncpraw.Reddit(
            client_id=os.getenv("REDDIT_CLIENT_ID"),
            client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
            user_agent="SaaS Scout Scraper v1.0"
        )
        
        # Subreddits to monitor
        self.subreddits = [
            "SaaS",
            "sideproject",
            "Entrepreneur",
            "artificial",
            "startups"
        ]
        
        # Keywords to look for
        self.keywords = [
            "launch",
            "MVP",
            "startup",
            "AI tool",
            "new product",
            "just launched"
        ]

    async def scrape(self) -> None:
        """Scrape new products from Reddit"""
        try:
            print("\nStarting Reddit scraper...")
            for subreddit_name in self.subreddits:
                print(f"\nScanning r/{subreddit_name}...")
                subreddit = await self.reddit.subreddit(subreddit_name)
                posts_found = 0
                
                # Get top posts from the last week
                async for submission in subreddit.top(time_filter="week"):
                    # Check if post contains any of our keywords
                    if any(keyword.lower() in submission.title.lower() for keyword in self.keywords):
                        # Extract product information
                        product_name = self._extract_product_name(submission.title)
                        description = submission.selftext[:300] if submission.selftext else ""
                        
                        # Try to find website URL
                        website_url = self._extract_website_url(submission)
                        
                        if website_url:
                            posts_found += 1
                            print(f"\nFound product: {product_name}")
                            print(f"URL: {website_url}")
                            print(f"Description: {description[:100]}...")
                            
                            # Create product entry
                            product_data = self._create_product_entry(
                                productName=product_name,
                                description=description,
                                websiteUrl=website_url,
                                launchDate=datetime.fromtimestamp(submission.created_utc).isoformat(),
                                source=f"Reddit - r/{subreddit_name}",
                                platformFoundOn="Reddit",
                                category=self._determine_category(submission),
                                tags=self._extract_tags(submission),
                                socialProof={
                                    "redditUpvotes": submission.score
                                },
                                notes=f"Found on r/{subreddit_name} with {submission.score} upvotes"
                            )
                            
                            self.add_product(product_data)
                
                print(f"Found {posts_found} products in r/{subreddit_name}")
            
        except Exception as e:
            print(f"Error scraping Reddit: {str(e)}")
        finally:
            await self.reddit.close()

    def _extract_product_name(self, title: str) -> str:
        """Extract product name from Reddit post title"""
        # Remove common prefixes
        prefixes = ["[Launch]", "[MVP]", "Just launched:", "New:"]
        for prefix in prefixes:
            if title.startswith(prefix):
                title = title[len(prefix):].strip()
        
        return title

    def _extract_website_url(self, submission) -> str:
        """Extract website URL from Reddit post"""
        # Check if URL is in the post
        if submission.url and not submission.url.startswith("https://www.reddit.com"):
            return submission.url
            
        # Check if URL is in the text
        if submission.selftext:
            import re
            urls = re.findall(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', submission.selftext)
            if urls:
                return urls[0]
                
        return ""

    def _determine_category(self, submission) -> str:
        """Determine category based on post content"""
        content = f"{submission.title} {submission.selftext}".lower()
        
        category_keywords = {
            "AI": ["ai", "artificial intelligence", "machine learning", "ml"],
            "Developer Tools": ["api", "developer", "programming", "code"],
            "Productivity": ["productivity", "workflow", "automation"],
            "Marketing": ["marketing", "seo", "social media"],
            "Design": ["design", "ui", "ux"],
            "Finance": ["finance", "payment", "accounting"],
            "Support": ["support", "help desk", "customer service"]
        }
        
        for category, keywords in category_keywords.items():
            if any(keyword in content for keyword in keywords):
                return category
                
        return "Other"

    def _extract_tags(self, submission) -> List[str]:
        """Extract relevant tags from post"""
        tags = []
        content = f"{submission.title} {submission.selftext}".lower()
        
        # Common tags to look for
        common_tags = [
            "saas", "startup", "ai", "ml", "api", "automation",
            "productivity", "marketing", "design", "finance",
            "support", "tool", "platform", "software"
        ]
        
        for tag in common_tags:
            if tag in content:
                tags.append(tag)
                
        return tags 