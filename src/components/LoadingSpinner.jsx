import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Creating Your Perfect Itinerary</h2>
      <p className="text-gray-600 text-center max-w-md">
        We're analyzing your preferences and crafting a personalized travel experience just for you...
      </p>
    </div>
  );
};

export default LoadingSpinner;