import { Card, CardContent } from "@/Components/ui/card";
import React from "react";

export default function FAQ() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold">What is FootballHub?</h2>
            <p className="mt-2 text-muted-foreground">
              FootballHub is your go-to app for tracking your favorite teams,
              matches, and football news in real time.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold">
              How do I add a favorite team?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Simply go to the "Teams" page, find your team, and click the star
              icon to add it to your favorites.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold">
              Can I receive notifications for upcoming matches?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Yes! Enable notifications from your profile settings to get
              reminders before your favorite teams play.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
