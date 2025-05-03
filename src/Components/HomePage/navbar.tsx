"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Bell, Search } from "lucide-react";
import { useLoggedInUser } from "@/lib/user";
import { SignOut } from "@/lib/authentification";
import toast from "react-hot-toast";

export default function Navbar() {
  const { isLoading, user } = useLoggedInUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only show UI after first client-side render to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldRenderAuthContent = mounted && !isLoading;

  // If not mounted yet, render a skeleton that matches the server-side render exactly
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-full bg-green-600 p-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15L9 12M12 15L15 12M12 15V9M7.8 7.8L7 7M16.2 7.8L17 7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold">FootballHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/Competitions"
              className="text-sm font-medium hover:text-primary"
            >
              Competitions
            </Link>
            <Link href="/teams" className="text-sm font-medium hover:text-primary">
              Teams
            </Link>
            <Link
              href="/matches"
              className="text-sm font-medium hover:text-primary"
            >
              Matches
            </Link>
            <Link href="/news" className="text-sm font-medium hover:text-primary">
              News
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary"
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="rounded-md p-2 hover:bg-accent">
              <Search size={20} />
            </button>
            <button className="rounded-md p-2 hover:bg-accent">
              <Bell size={20} />
            </button>
            <div className="h-6 w-px bg-border"></div>

            {/* Skeleton placeholders for auth UI */}
            <div className="flex items-center gap-3 min-w-32">
              <div className="h-8 w-16 rounded-md bg-muted animate-pulse"></div>
              <div className="h-9 w-20 rounded-md bg-primary/30 animate-pulse"></div>
            </div>
          </div>

          <button className="md:hidden rounded-md p-2 hover:bg-accent">
            <Menu size={20} />
          </button>
        </div>
      </header>
    );
  }

  // Full component with interactivity after hydration
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-full bg-green-600 p-1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 15L9 12M12 15L15 12M12 15V9M7.8 7.8L7 7M16.2 7.8L17 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xl font-bold">FootballHub</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/Competitions"
            className="text-sm font-medium hover:text-primary"
          >
            Competitions
          </Link>
          <Link
            href="/teams"
            className="text-sm font-medium hover:text-primary"
          >
            Teams
          </Link>
          <Link
            href="/matches"
            className="text-sm font-medium hover:text-primary"
          >
            Matches
          </Link>
          <Link href="/news" className="text-sm font-medium hover:text-primary">
            News
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className="rounded-md p-2 hover:bg-accent">
            <Search size={20} />
          </button>
          <button className="rounded-md p-2 hover:bg-accent">
            <Bell size={20} />
          </button>
          <div className="h-6 w-px bg-border"></div>

          {/* Auth state UI */}
          {!isLoading ? (
            !user ? (
              // Not logged in state
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium hover:text-primary"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              // Logged in state
              <>
                <Link
                  href="/my-teams"
                  className="text-sm font-medium text-muted-foreground hover:text-primary whitespace-nowrap"
                >
                  My Teams
                </Link>
                <Link
                  href="/profile"
                  className="text-sm font-medium hover:text-primary"
                >
                  Profile
                </Link>
                <button
                  onClick={async () => {
                    const error = await SignOut();
                    if (error) {
                      toast.error("Error");
                      return;
                    }
                    toast.success("You logged out successfully");
                    window.location.href = "/";
                  }}
                  className="w-full rounded-md bg-destructive px-4 py-2 text-center text-sm font-medium text-white hover:bg-destructive/90 cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            )
          ) : (
            // Loading state
            <div className="flex items-center gap-3 min-w-32">
              <div className="h-8 w-16 rounded-md bg-muted animate-pulse"></div>
              <div className="h-9 w-20 rounded-md bg-primary/30 animate-pulse"></div>
            </div>
          )}
        </div>

        <button
          className="md:hidden rounded-md p-2 hover:bg-accent"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden pb-4">
          <nav className="flex flex-col gap-4">
            <Link
              href="/leagues"
              className="text-sm font-medium hover:text-primary"
            >
              Leagues
            </Link>
            <Link
              href="/teams"
              className="text-sm font-medium hover:text-primary"
            >
              Teams
            </Link>
            <Link
              href="/matches"
              className="text-sm font-medium hover:text-primary"
            >
              Matches
            </Link>
            <Link
              href="/news"
              className="text-sm font-medium hover:text-primary"
            >
              News
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary"
            >
              Contact
            </Link>
            <div className="h-px w-full bg-border"></div>

            {/* Mobile auth state UI */}
            {!isLoading ? (
              !user ? (
                // Not logged in state
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium hover:text-primary"
                  >
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    className="w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                // Logged in state
                <>
                  <Link
                    href="/my-teams"
                    className="w-full rounded-md bg-muted px-4 py-2 text-center text-sm font-medium text-foreground hover:bg-muted/70 transition"
                  >
                    My Teams
                  </Link>
                  <Link
                    href="/profile"
                    className="text-sm font-medium hover:text-primary"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={async () => {
                      const error = await SignOut();
                      if (error) {
                        toast.error("Error");
                        return;
                      }
                      toast.success("You logged out successfully");
                      window.location.href = "/";
                    }}
                    className="w-full rounded-md bg-destructive px-4 py-2 text-center text-sm font-medium text-white hover:bg-destructive/90 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              )
            ) : (
              // Loading state
              <div className="flex flex-col gap-3">
                <div className="h-10 w-full rounded-md bg-muted animate-pulse"></div>
                <div className="h-10 w-full rounded-md bg-primary/30 animate-pulse"></div>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
