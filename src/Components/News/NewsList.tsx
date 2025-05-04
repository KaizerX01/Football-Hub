import React from "react";
import { NewsCard } from "./NewsCard";

interface NewsListProps {
  news: any[];
}
export function NewsList({ news }: NewsListProps) {
  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">
          No news articles found. Try a different search.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((article) => (
        <NewsCard key={article.article_id} article={article} />
      ))}
    </div>
  );
}
