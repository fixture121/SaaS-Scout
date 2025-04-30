import json
import re
from datetime import datetime

def slugify(text):
    # Convert to lowercase and replace spaces with hyphens
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')

def format_product_hunt_data(product):
    return {
        "productName": product.get("name", ""),
        "slug": slugify(product.get("name", "")),
        "description": product.get("description", "") or product.get("shortDescription", ""),
        "websiteUrl": product.get("website", ""),
        "launchDate": product.get("launchDate", ""),
        "pricing": "See website for pricing",
        "source": "Product Hunt",
        "platformFoundOn": "Product Hunt",
        "category": product.get("category", "Other"),
        "tags": product.get("topics", []),
        "socialProof": {
            "twitterFollowers": None,
            "youtubeSubscribers": None,
            "githubStars": None,
            "redditUpvotes": None,
            "productHuntUpvotes": int(str(product.get("votes", "0")).strip())
        },
        "keyFeatures": [],
        "pros": [],
        "cons": [],
        "verdict": None,
        "notes": f"Found on Product Hunt with {product.get('votes', 0)} upvotes and {product.get('comments', 0)} comments",
        "dateScraped": datetime.now().isoformat(),
        "scores": {
            "overall": 0,
            "components": {
                "twitter": 0.0,
                "youtube": 0.0,
                "github": 0.0,
                "reddit": 0.0,
                "producthunt": float(str(product.get("votes", "0")).strip()) / 100  # Simple score based on votes
            }
        },
        "image": product.get("image", "")
    }

# Run the scraper to get fresh data
import subprocess
subprocess.run(["python", "test_scraper.py"], capture_output=True, text=True)

# Read Product Hunt data from the scraper output
with open('test_scraper.py', 'r') as f:
    scraper_code = f.read()

# Create a modified version of the scraper that prints JSON
with open('temp_scraper.py', 'w') as f:
    # Replace the print statements with JSON output
    modified_code = scraper_code.replace(
        'print(f"\\nTotal products fetched: {len(products)}")',
        'print(json.dumps(products))'
    ).replace(
        'if products:\n            print("\\nSample product:")\n            sample = products[0]\n            for key, value in sample.items():\n                print(f"{key}: {value}")',
        ''
    )
    f.write(modified_code)

# Run the modified scraper
result = subprocess.run(["python", "temp_scraper.py"], capture_output=True, text=True)
products_data = json.loads(result.stdout)

# Format all products
formatted_products = [format_product_hunt_data(product) for product in products_data]

# Write to products.json
with open('../src/data/products.json', 'w') as f:
    json.dump(formatted_products, f, indent=2)

# Clean up temporary file
import os
os.remove('temp_scraper.py') 