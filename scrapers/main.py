import asyncio
import os
from datetime import datetime
from dotenv import load_dotenv
from product_hunt_scraper import ProductHuntScraper
from sync_frontend import sync_frontend

async def main():
    # Load environment variables
    load_dotenv()
    
    # Initialize Product Hunt scraper
    scraper = ProductHuntScraper()
    
    # Run scraper
    await scraper.scrape()
    
    print(f"\nScraping completed at {datetime.now().isoformat()}")
    
    # Sync data with frontend
    print("\nSyncing data with frontend...")
    sync_frontend()

if __name__ == "__main__":
    asyncio.run(main()) 