import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-b from-background to-accent/20">
      <div className="container relative py-20 md:py-32">
        <div className="flex flex-col items-start gap-4 md:w-2/3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Your Ultimate <span className="text-green-500">Football</span>{" "}
            Destination
          </h1>
          <p className="text-xl text-muted-foreground">
            Live scores, news, stats, and everything you need to stay connected
            to the beautiful game.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/matches"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Live Matches
            </Link>
            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Subscribe for Updates <ChevronRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block w-1/3 h-full">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Football stadium at night"
              className="object-cover object-center w-full h-full rounded-l-lg opacity-70"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
