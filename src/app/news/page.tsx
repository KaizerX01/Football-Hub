"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useNews } from "@/hooks/useNews";
import { SearchBar } from "@/Components/News/SearchBar";
import { NewsList } from "@/Components/News/NewsList";

export default function NewsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("q") || "football";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { data, isLoading, error } = useNews(searchQuery);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      else params.delete("q");
      router.replace(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery, router]);

  const filteredNews = data?.results || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-800 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Football News</h1>
          <p className="text-blue-100">
            Latest updates from the world of football
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-lg shadow-md bg-white p-4 animate-pulse"
              >
                <div className="h-4 w-3/4 bg-gray-300 rounded mb-2" />
                <div className="h-3 w-full bg-gray-200 rounded mb-1" />
                <div className="h-3 w-5/6 bg-gray-200 rounded mb-4" />
                <div className="h-40 w-full bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md shadow">
            <p className="font-semibold">Failed to load news.</p>
            <p className="text-sm">
              Please try again later or check your connection.
            </p>
          </div>
        )}

        {!isLoading && !error && <NewsList news={filteredNews} />}
      </main>
    </div>
  );
}
