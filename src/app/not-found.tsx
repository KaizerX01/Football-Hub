import { Button } from "@/Components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Page Not Found
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Sorry, the page you’re looking for doesn’t exist. It may have been moved
        or deleted.
      </p>
      <Link href="/">
        <Button className="text-base px-6 py-2 cursor-pointer hover:shadow-lg transition-shadow duration-200">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
