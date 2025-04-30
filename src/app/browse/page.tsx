'use client';

import { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import transformedProducts from '@/data/transformed-products.json';
import { Product, ProductCategory } from '@/types';

const categories: ProductCategory[] = [
  'Design',
  'Productivity',
  'Marketing',
  'AI',
  'Developer Tools',
  'Finance',
  'Customer Support',
  'Others',
];

export default function Browse() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = (transformedProducts as Product[]).filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            Browse SaaS Tools
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
            Explore our curated collection of SaaS tools
          </p>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for tools..."
              className="search-box w-full px-6 py-4 rounded-xl bg-white border border-gray-200 text-lg"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition-all duration-200">
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {transformedProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
} 