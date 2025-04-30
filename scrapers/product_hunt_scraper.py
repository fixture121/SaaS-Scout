import os
import aiohttp
import asyncio
import json
from datetime import datetime, timedelta
from typing import List, Dict, Any
from dotenv import load_dotenv
from base_scraper import BaseScraper
import requests

class ProductHuntScraper(BaseScraper):
    def __init__(self):
        super().__init__()
        load_dotenv()
        self.api_key = os.getenv('PRODUCT_HUNT_API_KEY')
        if not self.api_key:
            raise ValueError("PRODUCT_HUNT_API_KEY not found in environment variables")
        self.base_url = "https://api.producthunt.com/v2/api/graphql"
        self.headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}",
            "User-Agent": "SaasScout/1.0"
        }

    async def scrape(self) -> None:
        """Scrape products from Product Hunt"""
        products = await self.fetch_products()
        for product in products:
            self.add_product(product)

    async def fetch_products(self):
        query = """
        query {
            posts(first: 50, order: NEWEST) {
                edges {
                    node {
                        name
                        tagline
                        description
                        website
                        thumbnail {
                            url
                        }
                        topics {
                            edges {
                                node {
                                    name
                                }
                            }
                        }
                        votesCount
                        commentsCount
                        createdAt
                        makers {
                            name
                        }
                        pricingType
                        reviewsRating
                        reviewsCount
                        followersCount
                    }
                }
            }
        }
        """
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    self.base_url,
                    headers=self.headers,
                    json={"query": query}
                ) as response:
                    if response.status != 200:
                        error_text = await response.text()
                        print(f"Error response: {error_text}")
                        raise Exception(f"Failed to fetch products: {response.status}")
                    
                    data = await response.json()
                    if not data or 'data' not in data or 'posts' not in data['data']:
                        raise Exception("Invalid response format")
                    
                    posts = data['data']['posts']['edges']
                    return self.process_products(posts)
        except Exception as e:
            print(f"Error fetching products: {str(e)}")
            return []

    def process_products(self, posts):
        processed = []
        for post in posts:
            node = post['node']
            topics = [
                topic['node']['name']
                for topic in node.get('topics', {}).get('edges', [])
            ]
            
            processed.append({
                "name": node.get('name', ''),
                "shortDescription": node.get('tagline', ''),
                "description": node.get('description', ''),
                "website": node.get('website', ''),
                "image": node.get('thumbnail', {}).get('url', ''),
                "category": self.determine_category(topics),
                "topics": topics,
                "votes": node.get('votesCount', 0),
                "comments": node.get('commentsCount', 0),
                "launchDate": node.get('createdAt', ''),
                "source": "Product Hunt",
                "pricing": self._get_pricing_type(node.get('pricingType', '')),
                "overallScore": self._calculate_score(node),
                "scores": {
                    "design": self._score_design(node),
                    "value": self._score_value(node),
                    "features": self._score_features(node),
                    "originality": self._score_originality(node),
                    "clarity": self._score_clarity(node),
                    "team": self._score_team(node)
                },
                "pros": self._generate_pros(node),
                "cons": self._generate_cons(node),
                "verdict": self._get_verdict(node),
                "userCount": node.get('followersCount', 0),
                "productHuntRating": node.get('reviewsRating', 0),
                "productHuntVotes": node.get('votesCount', 0),
                "productHuntComments": node.get('commentsCount', 0),
                "pricingTier": self._get_pricing_tier(node.get('pricingType', '')),
                "integrations": self._get_integrations(node),
                "targetAudience": self._get_target_audience(node),
                "useCases": self._get_use_cases(node)
            })
        return processed

    async def get_products(self):
        """Get all products from Product Hunt"""
        return await self.fetch_products()

    def determine_category(self, topics):
        """Map Product Hunt topics to our categories"""
        topic_mapping = {
            "Developer Tools": "Development",
            "Design Tools": "Design",
            "Marketing": "Marketing",
            "Analytics": "Analytics",
            "Productivity": "Productivity",
            "Communication": "Communication",
            "Artificial Intelligence": "AI & Machine Learning"
        }
        
        for topic in topics:
            if topic in topic_mapping:
                return topic_mapping[topic]
        return "Other"

    def _get_pricing_type(self, pricing_type: str) -> str:
        pricing_map = {
            'FREE': 'Free',
            'PAID': 'Paid',
            'FREEMIUM': 'Freemium',
            'ENTERPRISE': 'Enterprise'
        }
        return pricing_map.get(pricing_type, 'See website for pricing')

    def _calculate_score(self, product: Dict[str, Any]) -> int:
        scores = [
            self._score_design(product),
            self._score_value(product),
            self._score_features(product),
            self._score_originality(product),
            self._score_clarity(product),
            self._score_team(product)
        ]
        return sum(scores) // len(scores)

    def _score_design(self, product: Dict[str, Any]) -> int:
        # Score based on thumbnail quality and website design
        return 15 if product['thumbnail']['url'] else 10

    def _score_value(self, product: Dict[str, Any]) -> int:
        # Score based on pricing and reviews
        base_score = 10
        if product['reviewsRating']:
            base_score += int(product['reviewsRating'] * 2)
        return min(base_score, 20)

    def _score_features(self, product: Dict[str, Any]) -> int:
        # Score based on description length and complexity
        return 15 if len(product['description']) > 200 else 10

    def _score_originality(self, product: Dict[str, Any]) -> int:
        # Score based on votes and comments
        base_score = 10
        if product['votesCount'] > 100:
            base_score += 5
        if product['commentsCount'] > 20:
            base_score += 5
        return min(base_score, 20)

    def _score_clarity(self, product: Dict[str, Any]) -> int:
        # Score based on tagline and description clarity
        return 15 if len(product['tagline']) > 20 else 10

    def _score_team(self, product: Dict[str, Any]) -> int:
        # Score based on makers count
        return 15 if len(product['makers']) > 1 else 10

    def _generate_pros(self, product: Dict[str, Any]) -> List[str]:
        pros = []
        if product['reviewsRating'] and product['reviewsRating'] >= 4:
            pros.append("High user satisfaction")
        if product['votesCount'] > 100:
            pros.append("Popular on Product Hunt")
        if len(product['makers']) > 1:
            pros.append("Experienced team")
        if product['pricingType'] == 'FREE':
            pros.append("Free to use")
        return pros

    def _generate_cons(self, product: Dict[str, Any]) -> List[str]:
        cons = []
        if product['reviewsRating'] and product['reviewsRating'] < 3:
            cons.append("Mixed user reviews")
        if product['votesCount'] < 50:
            cons.append("Limited community engagement")
        if product['pricingType'] == 'ENTERPRISE':
            cons.append("Enterprise pricing may be expensive")
        return cons

    def _get_verdict(self, product: Dict[str, Any]) -> str:
        score = self._calculate_score(product)
        if score >= 85:
            return "Must Try"
        elif score >= 70:
            return "Worth Watching"
        else:
            return "Needs Improvement"

    def _get_pricing_tier(self, pricing_type: str) -> str:
        return pricing_type.capitalize()

    def _get_integrations(self, product: Dict[str, Any]) -> List[str]:
        # This would need to be enhanced with actual integration detection
        return []

    def _get_target_audience(self, product: Dict[str, Any]) -> List[str]:
        # Analyze topics and description to determine target audience
        audience = []
        if any(topic['name'].lower() in ['startups', 'entrepreneurship'] for topic in product['topics']):
            audience.append('Founders')
        if any(topic['name'].lower() in ['developer tools', 'api'] for topic in product['topics']):
            audience.append('Developers')
        if any(topic['name'].lower() in ['enterprise', 'business'] for topic in product['topics']):
            audience.append('IT Managers')
        return audience or ['Founders', 'IT Managers', 'Developers']

    def _get_use_cases(self, product: Dict[str, Any]) -> List[str]:
        # Extract use cases from description
        return [topic['name'] for topic in product['topics']]

def save_products(products: List[Dict[str, Any]], filename: str = 'transformed-products.json'):
    with open(filename, 'w') as f:
        json.dump(products, f, indent=2)

def main():
    scraper = ProductHuntScraper()
    products = scraper.get_products()
    save_products(products)

if __name__ == '__main__':
    main() 