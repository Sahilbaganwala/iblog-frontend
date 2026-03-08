import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center pt-20 pb-10">

      <h1 className="text-7xl font-bold text-gray-900">404</h1>
      <p className="text-gray-600 mt-4">Page not found.</p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-yellow-500 text-white rounded-full shadow hover:bg-yellow-600"
      >
        Go Home
      </Link>

    </div>
  );
}
