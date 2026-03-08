import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {

  // ===============================
  // Image URL Handler
  // ===============================
  const getImageUrl = () => {
    if (!blog?.image) {
      return "https://placehold.co/600x400?text=No+Image";
    }

    // Cloudinary or external URL
    if (blog.image.startsWith("http")) {
      return blog.image;
    }

    // Local backend image
    return `http://localhost:4000/${blog.image}`;
  };

  const imgSrc = getImageUrl();

  // ===============================
  // Category Handler (Backend Safe)
  // ===============================
const categoryName = 
  blog?.category?.name ||      // Check the NEW field first
  blog?.category_id?.name ||   // Check the OLD field (backup)
  "Uncategorized";


  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">

      {/* ===============================
          Image Section
      =============================== */}
      <div className="h-48 bg-gray-100 overflow-hidden">
        <img
          src={imgSrc}
          alt={blog?.title || "Blog Image"}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://placehold.co/600x400?text=Image+Error";
          }}
        />
      </div>

      {/* ===============================
          Content Section
      =============================== */}
      <div className="p-5">

        {/* Category Badge */}
        <span className="text-xs bg-yellow-100 text-yellow-700 inline-block px-3 py-1 rounded-full mb-2 capitalize">
          {categoryName}
        </span>

        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 line-clamp-1 mt-1">
          {blog?.title || "Untitled Blog"}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {blog?.description || "No description provided."}
        </p>

        {/* Read More */}
        <Link
          to={`/blogs/${blog?._id}`}
          className="text-yellow-500 font-medium mt-3 inline-block hover:underline"
        >
          Read More →
        </Link>

      </div>

    </div>
  );
}
