import React from "react";

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Terms of Service</h1>
      <div className="space-y-4 text-muted-foreground">
        <p>
          By using FootballHub, you agree to comply with these Terms of Service.
        </p>
        <p>
          FootballHub provides football data and notifications on an "as-is"
          basis. While we strive for accuracy, we do not guarantee the
          completeness or reliability of match information.
        </p>
        <p>
          Users are responsible for any actions taken on the platform. Abusive
          behavior, spamming, or misuse of the service may result in account
          suspension.
        </p>
        <p>
          We reserve the right to update these terms at any time. Continued use
          of the platform implies acceptance of the revised terms.
        </p>
      </div>
    </div>
  );
}
