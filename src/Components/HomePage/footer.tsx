"use client";
import React, { ReactElement, useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { RegisterEmail } from "@/lib/SubscribedEmails";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await RegisterEmail(email);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Done! you will get the latest updates about our website!");
  };

  return (
    <footer className="w-full border-t bg-card mt-10">
      <div className="container py-10 ml-30">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="flex flex-col gap-4">
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
            <p className="text-sm text-muted-foreground">
              Your ultimate football destination with live scores, news, and
              stats.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Competitions */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Competitions</h3>
            <Link
              href="/Competitions/PL"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Premier League
            </Link>
            <Link
              href="/Competitions/PD"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              La Liga
            </Link>
            <Link
              href="/Competitions/BL1"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Bundesliga
            </Link>
            <Link
              href="/Competitions/SA"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Serie A
            </Link>
            <Link
              href="/Competitions/FL1"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Ligue 1
            </Link>
            <Link
              href="/Competitions/CL"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Champions League
            </Link>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Quick Links</h3>
            <Link
              href="/matches"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Matches
            </Link>
            <Link
              href="/news"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              News
            </Link>
            <Link
              href="/stats"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Stats
            </Link>
            <Link
              href="/teams"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Teams
            </Link>
          </div>

          {/* Help & Support */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Help & Support</h3>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact Us
            </Link>
            <Link
              href="/faq"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              FAQ
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
          {/* Subscribe */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Subscribe</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest football updates
            </p>
            <form className="mt-2 flex flex-col gap-2" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your email"
                className="rounded-md border bg-background px-3 py-2 text-sm"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} FootballHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
