import json
import os
import shutil
from pathlib import Path

def calculate_score(value: int | None, max_value: int, points: int = 10) -> float:
    """Calculate score from a social proof value"""
    if value is None or value == 0:
        return 0.0
    return min(value / max_value * points, points)

def sync_frontend():
    """Sync scraped data with the frontend"""
    # Source and destination paths
    source_file = Path("data/scraped_products.json")
    dest_dir = Path("../src/data")
    dest_file = dest_dir / "products.json"
    
    # Ensure the destination directory exists
    dest_dir.mkdir(parents=True, exist_ok=True)
    
    if not source_file.exists():
        print("No scraped data found. Run the scraper first.")
        return
    
    try:
        # Read the scraped data
        with open(source_file, 'r', encoding='utf-8') as f:
            products = json.load(f)
        
        # Add scores to products
        for product in products:
            # Calculate overall score based on social proof
            social_proof = product.get('socialProof', {})
            score_components = {
                'twitter': calculate_score(social_proof.get('twitterFollowers'), 10000),  # Max 10 points for 10k followers
                'youtube': calculate_score(social_proof.get('youtubeSubscribers'), 10000),  # Max 10 points for 10k subscribers
                'github': calculate_score(social_proof.get('githubStars'), 1000),  # Max 10 points for 1k stars
                'reddit': calculate_score(social_proof.get('redditUpvotes'), 1000),  # Max 10 points for 1k upvotes
                'producthunt': calculate_score(social_proof.get('productHuntUpvotes'), 1000),  # Max 10 points for 1k upvotes
            }
            
            # Calculate overall score (average of all components)
            non_zero_scores = [score for score in score_components.values() if score > 0]
            overall_score = sum(non_zero_scores) / len(non_zero_scores) if non_zero_scores else 0
            
            # Add scores to product data
            product['scores'] = {
                'overall': round(overall_score, 1),
                'components': {k: round(v, 1) for k, v in score_components.items()}
            }
        
        # Sort products by overall score
        products.sort(key=lambda x: x['scores']['overall'], reverse=True)
        
        # Save to frontend data directory
        with open(dest_file, 'w', encoding='utf-8') as f:
            json.dump(products, f, indent=2, ensure_ascii=False)
        
        print(f"Successfully synced {len(products)} products to frontend")
        print(f"Data saved to: {dest_file}")
        
    except Exception as e:
        print(f"Error syncing data: {str(e)}")

if __name__ == "__main__":
    sync_frontend() 