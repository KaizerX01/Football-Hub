import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <div className="space-y-4 text-muted-foreground">
        <p>
          FootballHub values your privacy. We collect only the necessary data to
          provide you with personalized football content.
        </p>
        <p>
          We may collect information such as your email, favorite teams, and
          match preferences. This information is never sold to third parties.
        </p>
        <p>
          You can delete your account and all associated data at any time via
          the Profile settings.
        </p>
        <p>
          By using FootballHub, you consent to our data practices described
          here.
        </p>
      </div>
    </div>
  );
}
