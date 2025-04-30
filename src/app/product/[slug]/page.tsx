import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Star } from 'lucide-react';
import transformedProducts from '@/data/transformed-products.json';
import { notFound } from 'next/navigation';
import { Product, Verdict } from '@/types';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = (transformedProducts as Product[]).find((p: Product) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const getVerdictColor = (verdict: Verdict) => {
    switch (verdict) {
      case 'Hidden Gem':
        return 'text-green-600 dark:text-green-400';
      case 'Might Blow Up':
        return 'text-blue-600 dark:text-blue-400';
      case 'Overhyped':
        return 'text-red-600 dark:text-red-400';
      case 'Worth Watching':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'Cash Grab':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-24">
          <Link
            href="/browse"
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all tools
          </Link>
        </div>

        <div className="mx-auto max-w-2xl pt-10 lg:max-w-none">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image */}
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src={product.image || '/images/placeholder.png'}
                alt={product.name}
                width={800}
                height={800}
                className="h-full w-full object-cover object-center"
                quality={100}
                priority
              />
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Star className="h-6 w-6 text-yellow-400" />
                    <span className="ml-2 text-3xl font-bold text-gray-900 dark:text-white">
                      {product.overallScore}/100
                    </span>
                  </div>
                  <span className={`text-lg font-semibold ${getVerdictColor(product.verdict)}`}>
                    {product.verdict}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6 text-base text-gray-700 dark:text-gray-300">
                  {product.description}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center">
                  <a
                    href={product.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex items-center">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Tags</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Details</h3>
                <div className="mt-4">
                  <ul className="list-disc space-y-2 pl-4 text-sm">
                    <li className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Launch Date:</span> {new Date(product.launchDate).toLocaleDateString()}
                    </li>
                    <li className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Source:</span> {product.source}
                    </li>
                    <li className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Pricing:</span> {product.pricing}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Score Breakdown</h3>
                <div className="mt-4 space-y-4">
                  {Object.entries(product.scores).map(([key, value]: [string, number]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {key}
                      </span>
                      <div className="flex items-center">
                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                          <div
                            className="h-2 bg-indigo-600 rounded-full dark:bg-indigo-500"
                            style={{ width: `${(value / 20) * 100}%` }}
                          />
                        </div>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          {value}/20
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Pros & Cons</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-green-600 dark:text-green-400">Pros</h4>
                    <ul className="mt-2 list-disc space-y-2 pl-4 text-sm text-gray-600 dark:text-gray-300">
                      {product.pros.map((pro: string) => (
                        <li key={pro}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-red-600 dark:text-red-400">Cons</h4>
                    <ul className="mt-2 list-disc space-y-2 pl-4 text-sm text-gray-600 dark:text-gray-300">
                      {product.cons.map((con: string) => (
                        <li key={con}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 