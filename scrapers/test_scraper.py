import os
import asyncio
import json
from dotenv import load_dotenv
from product_hunt_scraper import ProductHuntScraper

async def main():
    # Load environment variables
    load_dotenv()
    
    # Initialize and run scraper
    try:
        scraper = ProductHuntScraper()
        products = await scraper.get_products()
        
        # Convert products to our format
        formatted_products = []
        for product in products:
            formatted_product = {
                "productName": product["name"],
                "slug": product["name"].lower().replace(" ", "-"),
                "description": product["description"] or product["shortDescription"],
                "websiteUrl": product["website"],
                "launchDate": product["launchDate"],
                "pricing": "See website for pricing",
                "source": "Product Hunt",
                "platformFoundOn": "Product Hunt",
                "category": product["category"],
                "tags": product["topics"],
                "socialProof": {
                    "twitterFollowers": None,
                    "youtubeSubscribers": None,
                    "githubStars": None,
                    "redditUpvotes": None,
                    "productHuntUpvotes": product["votes"]
                },
                "keyFeatures": [],
                "pros": [],
                "cons": [],
                "verdict": None,
                "notes": f"Found on Product Hunt with {product['votes']} upvotes and {product['comments']} comments",
                "dateScraped": "2025-04-29T19:34:39.462795",
                "scores": {
                    "overall": 0,
                    "components": {
                        "twitter": 0.0,
                        "youtube": 0.0,
                        "github": 0.0,
                        "reddit": 0.0,
                        "producthunt": float(product["votes"]) / 100
                    }
                },
                "image": product["image"]
            }
            formatted_products.append(formatted_product)
        
        # Write to products.json
        with open('../src/data/products.json', 'w') as f:
            json.dump(formatted_products, f, indent=2)
            
        print(f"Successfully wrote {len(formatted_products)} products to products.json")
        
    except ValueError as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    asyncio.run(main()) 