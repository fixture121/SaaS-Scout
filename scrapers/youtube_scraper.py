import os
from datetime import datetime
from typing import Dict, List
import googleapiclient.discovery
from dotenv import load_dotenv
from base_scraper import BaseScraper

class YouTubeScraper(BaseScraper):
    def __init__(self):
        super().__init__()
        load_dotenv()
        
        # Initialize YouTube API client
        self.youtube = googleapiclient.discovery.build(
            "youtube", "v3", developerKey=os.getenv("YOUTUBE_API_KEY")
        )
        
        # Channels to monitor
        self.channels = {
            "UCmG1Yj8W5UQxZJgvVx8h0aQ": "Ali Abdaal",
            "UCdJdE9bqR0FUSYOj9KluGwg": "Danny Postma",
            "UCrUL8K81R4VBzm-KOYwrcxQ": "Ben's Bites",
            "UCrUL8K81R4VBzm-KOYwrcxQ": "Future Tools",
            "UCrUL8K81R4VBzm-KOYwrcxQ": "Fireship"
        }
        
        # Keywords to look for
        self.keywords = [
            "new AI tools",
            "SaaS startups",
            "underrated AI startups",
            "best AI tools",
            "new tech tools"
        ]

    async def scrape(self) -> None:
        """Scrape new products from YouTube videos"""
        try:
            for channel_id, channel_name in self.channels.items():
                # Get recent videos from the channel
                request = self.youtube.search().list(
                    part="snippet",
                    channelId=channel_id,
                    maxResults=20,
                    order="date",
                    type="video"
                )
                response = request.execute()
                
                for item in response["items"]:
                    video_id = item["id"]["videoId"]
                    video_title = item["snippet"]["title"]
                    
                    # Check if video title contains any of our keywords
                    if any(keyword.lower() in video_title.lower() for keyword in self.keywords):
                        # Get video details
                        video_request = self.youtube.videos().list(
                            part="snippet,statistics",
                            id=video_id
                        )
                        video_response = video_request.execute()
                        
                        if video_response["items"]:
                            video = video_response["items"][0]
                            description = video["snippet"]["description"]
                            
                            # Extract product information from description
                            products = self._extract_products_from_description(description)
                            
                            for product in products:
                                product_data = self._create_product_entry(
                                    productName=product["name"],
                                    description=product["description"],
                                    websiteUrl=product["website"],
                                    launchDate=video["snippet"]["publishedAt"],
                                    source=f"YouTube - {channel_name} - {video_title}",
                                    platformFoundOn="YouTube",
                                    category=product["category"],
                                    tags=product["tags"],
                                    socialProof={
                                        "youtubeSubscribers": self._get_channel_subscribers(channel_id)
                                    },
                                    notes=f"Found in video: {video_title}"
                                )
                                
                                self.add_product(product_data)
            
        except Exception as e:
            print(f"Error scraping YouTube: {str(e)}")

    def _extract_products_from_description(self, description: str) -> List[Dict]:
        """Extract product information from video description"""
        products = []
        
        # Common patterns in YouTube descriptions
        patterns = [
            r"🔗 (.*?): (http[s]?://\S+)",  # Link with emoji
            r"\[(.*?)\]\((http[s]?://\S+)\)",  # Markdown links
            r"(.*?) - (http[s]?://\S+)",  # Name - URL
        ]
        
        import re
        for pattern in patterns:
            matches = re.findall(pattern, description)
            for match in matches:
                if len(match) == 2:
                    name, url = match
                    products.append({
                        "name": name.strip(),
                        "website": url.strip(),
                        "description": self._extract_product_description(description, name),
                        "category": self._determine_category(name, description),
                        "tags": self._extract_tags(name, description)
                    })
        
        return products

    def _extract_product_description(self, description: str, product_name: str) -> str:
        """Extract product description from video description"""
        # Look for text after the product name
        lines = description.split("\n")
        for i, line in enumerate(lines):
            if product_name in line:
                # Get the next few lines as description
                description_lines = lines[i+1:i+4]
                return " ".join(line.strip() for line in description_lines if line.strip())
        
        return ""

    def _determine_category(self, product_name: str, description: str) -> str:
        """Determine category based on product name and description"""
        content = f"{product_name} {description}".lower()
        
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

    def _extract_tags(self, product_name: str, description: str) -> List[str]:
        """Extract relevant tags from product name and description"""
        tags = []
        content = f"{product_name} {description}".lower()
        
        common_tags = [
            "saas", "startup", "ai", "ml", "api", "automation",
            "productivity", "marketing", "design", "finance",
            "support", "tool", "platform", "software"
        ]
        
        for tag in common_tags:
            if tag in content:
                tags.append(tag)
                
        return tags

    def _get_channel_subscribers(self, channel_id: str) -> int:
        """Get number of subscribers for a channel"""
        try:
            request = self.youtube.channels().list(
                part="statistics",
                id=channel_id
            )
            response = request.execute()
            
            if response["items"]:
                return int(response["items"][0]["statistics"]["subscriberCount"])
        except:
            pass
            
        return 0 