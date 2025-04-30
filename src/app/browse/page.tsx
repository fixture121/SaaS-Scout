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

export default function BrowsePage() {
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
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-24">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Browse Tools
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Discover and compare the best SaaS tools for your needs.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                !selectedCategory
                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Filter className="mr-2 h-4 w-4" />
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">No tools found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 