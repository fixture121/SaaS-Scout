import asyncio
from dotenv import load_dotenv
from .product_hunt_scraper import ProductHuntScraper

async def main():
    load_dotenv()
    scraper = ProductHuntScraper()
    products = scraper.get_products()
    print(f"Found {len(products)} products:")
    for product in products:
        print(f"- {product.get('name', 'Unnamed')}: {product.get('shortDescription', 'No description')}")

if __name__ == "__main__":
    asyncio.run(main()) 