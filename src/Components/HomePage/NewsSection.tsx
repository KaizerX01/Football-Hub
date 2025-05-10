"use client";

import { useNews } from "@/hooks/useNews";
import Link from "next/link";
import React from "react";

export function NewsSection() {
  const { data, isLoading, error } = useNews("football");
  const newsItems = data?.results?.slice(0, 3) || [];
  //console.log(data?.results);

  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-4 border border-slate-700/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Latest News</h2>
        <Link href="/news" className="text-blue-400 text-sm hover:underline">
          View all
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-slate-700/30 rounded-lg overflow-hidden animate-pulse"
            >
              <div className="h-40 bg-slate-600" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-slate-600 rounded w-1/3" />
                <div className="h-3 bg-slate-600 rounded w-2/3" />
                <div className="h-3 bg-slate-600 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newsItems.map((news: any) => (
            <div
              key={news.article_id}
              className="bg-slate-700/30 rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={news.image_url || "news.avif"}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                    {news.tag}
                  </span>
                  <span className="text-xs text-gray-400">{news.time}</span>
                </div>
                <h3 className="font-medium mb-2 line-clamp-2">{news.title}</h3>
                <div className="text-xs text-gray-400">{news.source}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link href={"/news"}>
        <button className="mt-4 w-full bg-slate-700/50 hover:bg-slate-700/80 text-center py-2 rounded-lg text-sm text-blue-300">
          See more news
        </button>
      </Link>
    </div>
  );
}
