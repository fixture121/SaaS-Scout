from abc import ABC, abstractmethod
from datetime import datetime
from typing import Dict, List, Optional, Any
import json
import os
from pathlib import Path

class BaseScraper(ABC):
    def __init__(self):
        self.data_dir = Path("data")
        self.data_dir.mkdir(exist_ok=True)
        self.products_file = self.data_dir / "scraped_products.json"
        self.products: List[Dict[str, Any]] = self._load_existing_products()

    def _load_existing_products(self) -> List[Dict]:
        if self.products_file.exists():
            with open(self.products_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        return []

    def _save_products(self):
        with open(self.products_file, 'w', encoding='utf-8') as f:
            json.dump(self.products, f, indent=2, ensure_ascii=False)

    def _generate_slug(self, product_name: str) -> str:
        return product_name.lower().replace(' ', '-').replace('/', '-')

    def _create_product_entry(
        self,
        productName: str,
        description: str,
        websiteUrl: str,
        launchDate: str,
        pricing: str,
        source: str,
        platformFoundOn: str,
        category: str,
        tags: List[str],
        socialProof: Dict[str, Any],
        notes: str
    ) -> Dict[str, Any]:
        """Create a standardized product entry"""
        return {
            'id': f"{platformFoundOn.lower()}-{productName.lower().replace(' ', '-')}",
            'name': productName,
            'description': description,
            'shortDescription': description[:200] + '...' if len(description) > 200 else description,
            'url': websiteUrl,
            'image': None,  # To be populated by specific scrapers
            'category': category,
            'tags': tags,
            'pricing': pricing,
            'launchDate': launchDate,
            'source': source,
            'platformFoundOn': platformFoundOn,
            'socialProof': socialProof,
            'notes': notes,
            'lastUpdated': datetime.now().isoformat(),
            'scores': {
                'design': 0,
                'value': 0,
                'features': 0,
                'originality': 0,
                'clarity': 0,
                'team': 0
            }
        }

    def add_product(self, product: Dict[str, Any]) -> None:
        """Add a product to the list of products"""
        self.products.append(product)
        self._save_products()

    def get_products(self) -> List[Dict[str, Any]]:
        """Get all products"""
        return self.products

    def clear_products(self) -> None:
        """Clear the list of products"""
        self.products = []
        self._save_products()

    @abstractmethod
    async def scrape(self) -> None:
        """Scrape products from the source"""
        pass 