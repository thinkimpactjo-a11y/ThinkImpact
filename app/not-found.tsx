import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-md p-8 text-center">
        {/* Large 404 */}
        <div className="from-primary to-primary/50 mb-4 bg-gradient-to-r bg-clip-text text-9xl font-black text-transparent">
          404
        </div>

        {/* Text */}
        <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
          Page Not Found
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          The page you are looking for might have been removed or never existed.
        </p>

        {/* Button */}
        <Button asChild variant="outline" className="w-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <Link href="/" className="flex items-center justify-center gap-2">
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </Button>
      </div>
    </main>
  );
}
