import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import userClient from "../../utils/userAxios";
import BlogCard from "../../components/BlogCard";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // ✅ 1. Update items per page to 20
  const perPage = 20;

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ 2. Scroll to top whenever the page changes (Simulates opening a new page)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await userClient.get("/blogs");

      // Map backend fields into frontend format
      const mapped = (res.data || []).map((b) => ({
        ...b,
        description: b.short_description || b.description, // Handle both cases
        image: b.image,
      }));

      setBlogs(mapped);
      setPage(1);
    } catch (err) {
      console.error("FETCH BLOGS ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(blogs.length / perPage));
  const currentBlogs = blogs.slice((page - 1) * perPage, page * perPage);

  // ✅ 3. Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger effect for cards
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-5">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
          All <span className="text-yellow-500">Blogs</span>
        </h1>

        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No blogs found.</p>
          </div>
        ) : (
          // ✅ 4. Wrap Grid with Motion and use 'key={page}' to trigger restart on page change
          <motion.div
            key={page} // Crucial: Re-runs animation when page changes
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {currentBlogs.map((blog) => (
              <motion.div key={blog._id} variants={cardVariants}>
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* PAGINATION CONTROLS */}
        {blogs.length > perPage && (
          <div className="flex justify-center mt-14 space-x-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-5 py-2 rounded-lg border font-semibold transition ${
                page === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-yellow-100"
              }`}
            >
              Prev
            </button>

            {/* Pagination Numbers */}
            {[...Array(totalPages)].map((_, idx) => {
              // Logic to show limited page numbers if there are too many pages
              // Simple version: Show all if under 10 pages, otherwise logic can be added
              return (
                <button
                  key={idx}
                  onClick={() => setPage(idx + 1)}
                  className={`px-5 py-2 rounded-lg border font-semibold transition ${
                    page === idx + 1
                      ? "bg-yellow-500 text-white border-yellow-500"
                      : "bg-white text-gray-700 hover:bg-yellow-100"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-5 py-2 rounded-lg border font-semibold transition ${
                page === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-yellow-100"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}