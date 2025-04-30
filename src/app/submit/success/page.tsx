import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl pt-24 text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Thank You for Your Submission!
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            We've received your submission and will review it shortly. If the tool meets our criteria, we'll add it to our curated list.
          </p>
          <div className="mt-10">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 