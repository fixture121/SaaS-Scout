'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Star, ArrowUpRight } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group relative p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 product-card-border">
        <div className="relative">
          <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
            <Image
              src={product.image || '/images/placeholder.png'}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {product.shortDescription || product.description}
            </p>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">{product.userCount || 0}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">{product.overallScore || 0}</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-500">{product.category}</span>
              <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-pink-500 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard; 