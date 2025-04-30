import os
import asyncio
from dotenv import load_dotenv
from product_hunt_scraper import ProductHuntScraper

async def main():
    # Load environment variables
    load_dotenv()
    
    # Initialize and run scraper
    try:
        scraper = ProductHuntScraper()
        products = await scraper.get_products()
        
        # Print summary
        print(json.dumps(products))
        
    except ValueError as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    asyncio.run(main()) 