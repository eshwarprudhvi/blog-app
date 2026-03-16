import React from "react";
import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Error Code */}
      <h1 className="text-9xl font-extrabold text-gray-800">404</h1>

      {/* Message */}
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-700">
        Oops! Page not found
      </h2>
      <p className="mt-2 text-center text-gray-500 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Action Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
}
