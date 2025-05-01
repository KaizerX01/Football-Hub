"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function NewsSection() {
  const articles = [
    {
      id: 1,
      title: "Manchester City secure late win over Arsenal",
      summary:
        "In a thrilling match, Manchester City managed to edge past Arsenal with a late goal from Erling Haaland...",
      date: "April 18, 2025",
      link: "/news/manchester-city-arsenal",
    },
    {
      id: 2,
      title: "Liverpool maintain unbeaten run",
      summary:
        "Liverpool continue their unbeaten streak with a convincing win over Chelsea at Anfield...",
      date: "April 17, 2025",
      link: "/news/liverpool-chelsea",
    },
    {
      id: 3,
      title: "Tottenham climb to second place",
      summary:
        "Tottenham Hotspur jump to second place after a dominant display against Aston Villa...",
      date: "April 16, 2025",
      link: "/news/tottenham-villa",
    },
  ];

  return (
    <section className="w-full bg-background py-12">
      <div className="container">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Latest News</h2>
            <Link
              href="/news"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              View all <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                href={article.link}
                key={article.id}
                className="group rounded-lg border bg-card p-6 shadow-sm hover:bg-accent/20 transition-colors"
              >
                <h3 className="text-lg font-semibold group-hover:text-foreground transition-colors">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {article.summary}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {article.date}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
