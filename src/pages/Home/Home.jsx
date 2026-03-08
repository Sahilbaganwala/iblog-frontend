import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useBlogStore } from "../../store/blogStore"; // Adjust path if needed
import BlogCard from "../../components/BlogCard";     // Adjust path if needed

// ============================
// Skeleton Loader Component
// ============================
const BlogSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      <div className="p-5 space-y-3">
        <div className="w-24 h-4 bg-gray-200 rounded" />
        <div className="w-full h-5 bg-gray-300 rounded" />
        <div className="w-3/4 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default function Home() {
  const { blogs, fetchBlogs, loading } = useBlogStore();

  // 👇 Pagination State
  const [page, setPage] = useState(1);
  const perPage = 6; // Number of blogs per page

  const categories = [
    { name: "technology", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200" },
    { name: "travel", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200" },
    { name: "lifestyle", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200" },
    { name: "food", img: "https://img.freepik.com/free-photo/top-view-table-full-food_23-2149209253.jpg?w=1200&q=80" },
    { name: "education", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200" },
    { name: "fitness", img: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1200" },
  ];

  // ============================
  // FETCH BLOGS (ONCE)
  // ============================
  useEffect(() => {
    fetchBlogs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  // 👇 Logic for Pagination
  const totalPages = Math.max(1, Math.ceil(safeBlogs.length / perPage));
  const currentBlogs = safeBlogs
    .filter((b) => b && b._id)
    .slice((page - 1) * perPage, page * perPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    // Optional: Scroll to top of section
    // document.getElementById("latest-blogs")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white">

      {/* ============================
          HERO SECTION
      ============================ */}
      <section
        className="relative w-full h-[540px] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1800&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* HERO CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-white px-6 max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
            className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
          >
            Discover stories that inspire <br />
            <span className="text-yellow-400 drop-shadow-lg">
              Welcome to iBlog
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-lg text-gray-200 leading-relaxed tracking-wide max-w-2xl mx-auto"
          >
            Explore articles across technology, travel, lifestyle, food,
            education, and fitness.
          </motion.p>

       <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-6"
          >
            {/* ============================
                CREATE BLOG (Primary Button)
            ============================ */}
            <Link
              to="/create-blog"
              className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold text-lg shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              <span>Create Blog</span>
              {/* Plus Icon that rotates on hover */}
              <svg 
                className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </Link>

            {/* ============================
                EXPLORE BLOGS (Secondary Button)
            ============================ */}
            <Link
              to="/blogs"
              className="group px-8 py-3.5 rounded-full backdrop-blur-md bg-white/10 border border-white/30 text-white font-semibold text-lg hover:bg-white/20 hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 shadow-lg text-center flex items-center justify-center gap-2"
            >
              <span>Explore Blogs</span>
              {/* Arrow Icon that slides right on hover */}
              <svg 
                className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ============================
          GRADIENT DIVIDER
      ============================ */}
      <div className="h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400" />

      <div className="max-w-7xl mx-auto px-5">

        {/* ============================
            CATEGORIES
        ============================ */}
      <section className="pt-20 pb-16 overflow-hidden">
          {/* Animated Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-4xl font-extrabold text-gray-900 mb-14"
          >
            Explore Categories
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 place-items-center">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                // 👇 Scroll entrance animations with staggered delays
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                // 👇 Smooth hover pop
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative group cursor-pointer"
              >
                <Link
                  to={`/categories?name=${cat.name}`}
                  className="block w-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-yellow-500/30 border border-gray-100 transition-all duration-300 bg-white"
                >
                  <div className="relative h-44 overflow-hidden">
                    {/* Slower, smoother image zoom */}
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    
                    {/* ✨ Upgraded Overlay: Gradient + slight blur */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                      {/* Text slides up from the bottom on hover */}
                      <span className="text-white font-bold text-xl capitalize tracking-wider translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        View {cat.name}
                      </span>
                    </div>
                  </div>

                  {/* Title changes color on hover */}
                  <div className="p-4 text-center text-lg font-bold capitalize text-gray-800 group-hover:text-yellow-600 transition-colors duration-300">
                    {cat.name}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================
            LATEST BLOGS (PAGINATED)
        ============================ */}
        <section id="latest-blogs" className="pt-8 pb-24">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Latest <span className="text-yellow-500">Blog Posts</span>
            </h2>

            <Link
              to="/blogs"
              className="text-sm font-semibold text-gray-600 hover:text-yellow-500 transition"
            >
              View all →
            </Link>
          </div>

          {/* Skeleton Loader */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => (
                <BlogSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && currentBlogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 font-medium">
                No blogs available.
              </p>
            </div>
          )}

          {/* Blog Cards */}
          {!loading && currentBlogs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {currentBlogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  whileHover={{ y: -5 }}
                >
                  {/* Make sure passing the correct props to BlogCard */}
                  <BlogCard blog={blog} />
                </motion.div>
              ))}
            </div>
          )}

          {/* 👇 PAGINATION CONTROLS */}
          {!loading && safeBlogs.length > perPage && (
            <div className="flex justify-center mt-14 space-x-3">
              {/* Prev Button */}
              <button
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className={`px-5 py-2 rounded-lg border font-semibold transition ${
                  page === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-yellow-100"
                }`}
              >
                Prev
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`px-5 py-2 rounded-lg border font-semibold transition ${
                    page === idx + 1
                      ? "bg-yellow-500 text-white border-yellow-500"
                      : "bg-white text-gray-700 hover:bg-yellow-100"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
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
        </section>
      </div>
    </div>
  );
}