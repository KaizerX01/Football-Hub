"use client";

import { useCompetitions } from "@/hooks/useCompetitions";
import { CompetitionCard } from "./CompetitionCard";
import toast from "react-hot-toast";
import { useEffect } from "react";

function CompetitionCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center">
        <div className="w-16 h-16 bg-white rounded-full"></div>
        <div className="ml-4 flex-1">
          <div className="h-5 bg-blue-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-blue-300 rounded w-1/2"></div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function CompetitionsGrid() {
  const { data, isLoading, error, refetch } = useCompetitions();

  useEffect(() => {
    if (error) {
      toast.error("Failed to load competitions. Please try again!");
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <CompetitionCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Oops, something went wrong.
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.isArray(data) &&
        data?.map((competition: any) => (
          <CompetitionCard key={competition.id} competition={competition} />
        ))}
    </div>
  );
}
