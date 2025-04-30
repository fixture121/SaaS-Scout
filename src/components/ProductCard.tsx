'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Users, MessageSquare, ThumbsUp } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800">
        <div className="aspect-square relative">
          <Image
            src={product.image || '/images/placeholder.png'}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{product.name}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {product.shortDescription || product.description}
          </p>
          
          {/* Stats Row */}
          <div className="flex items-center gap-4 mb-4">
            {product.userCount !== undefined && (
              <div className="flex items-center text-sm">
                <Users className="w-4 h-4 text-gray-500 mr-1" />
                <span>{product.userCount.toLocaleString()}</span>
              </div>
            )}
            {product.productHuntVotes !== undefined && (
              <div className="flex items-center text-sm">
                <ThumbsUp className="w-4 h-4 text-gray-500 mr-1" />
                <span>{product.productHuntVotes.toLocaleString()}</span>
              </div>
            )}
            {product.productHuntComments !== undefined && (
              <div className="flex items-center text-sm">
                <MessageSquare className="w-4 h-4 text-gray-500 mr-1" />
                <span>{product.productHuntComments.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Score and Category */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{product.overallScore}/100</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{product.category}</div>
          </div>

          {/* Target Audience */}
          {product.targetAudience && product.targetAudience.length > 0 && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                {product.targetAudience.map((audience) => (
                  <span
                    key={audience}
                    className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {audience}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
} 