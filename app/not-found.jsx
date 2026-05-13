import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold mt-4 text-gray-800 dark:text-white">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">The page you are looking for doesn't exist or has been moved.</p>
        <Link href="/" className="btn btn-primary mt-6">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}