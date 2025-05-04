import React from "react";
import { Calendar, Globe, User } from "lucide-react";

interface NewsCardProps {
  article: any;
}

export function NewsCard({ article }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  // Add a null check for keywords
  const keywords = article.keywords || [];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {article.image_url ? (
        <div className="h-48 overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="h-48 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600">No image available</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center mb-3">
          {article.source_icon ? (
            <img
              src={article.source_icon}
              alt={article.source_id}
              className="h-5 w-5 mr-2"
            />
          ) : (
            <Globe className="h-5 w-5 mr-2 text-gray-500" />
          )}
          <span className="text-sm text-gray-600">{article.source_id}</span>
        </div>
        <h2 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {keywords.length > 0 ? (
            keywords.slice(0, 3).map((keyword: any, index: number) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {keyword}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-xs">No keywords available</span>
          )}
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(article.pubDate)}</span>
          </div>
          {article.creator && (
            <div className="flex items-center">
              <User size={14} className="mr-1" />
              <span>{article.creator}</span>
            </div>
          )}
        </div>
      </div>
      <div className="px-5 py-3 bg-gray-50 border-t">
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          Read full article →
        </a>
      </div>
    </div>
  );
}
