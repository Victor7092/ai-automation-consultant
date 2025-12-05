import React from 'react';
import { motion } from 'framer-motion';

const ShimmerBlock = ({ className }: { className: string }) => (
  <div className={`relative overflow-hidden bg-slate-200 rounded ${className}`}>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      initial={{ x: '-100%' }}
      animate={{ x: '100%' }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 p-6">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 mb-8">
        <ShimmerBlock className="h-8 w-1/3" />
        <ShimmerBlock className="h-24 w-full rounded-xl" />
      </div>

      {/* Solution Skeleton */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <ShimmerBlock className="h-6 w-1/4" />
        <ShimmerBlock className="h-16 w-full" />
      </div>

      {/* Workflow Skeleton */}
      <div className="flex flex-col items-center space-y-2 mt-8">
        {[1, 2, 3].map((_, i) => (
          <React.Fragment key={i}>
            <div className="w-full bg-white p-5 rounded-xl shadow-sm border border-slate-100 relative">
              <div className="flex justify-between mb-3">
                <ShimmerBlock className="h-5 w-24" />
                <ShimmerBlock className="h-5 w-24" />
              </div>
              <ShimmerBlock className="h-10 w-full" />
            </div>
            {i < 2 && (
               <div className="h-8 w-0.5 bg-slate-200 my-1" />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-8 text-center text-slate-500 text-sm font-medium animate-pulse">
        AI Architect is analyzing your process...
      </div>
    </div>
  );
};