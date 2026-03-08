import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom"; // 👈 Added Link here
import axiosClient from "../../utils/axiosClient";
import BlogCard from "../../components/BlogCard";

// =============================
// SKELETON LOADER
// =============================
const CategorySkeleton = () => (
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="bg-white rounded-3xl h-96 shadow-sm border border-gray-100 animate-pulse">
        <div className="h-48 bg-gray-200 rounded-t-3xl" />
        <div className="p-6 space-y-4">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>
      </div>
    ))}
  </div>
);

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize active category from URL or default to "all"
  const initialCategory = searchParams.get("name") || "all";
  const [active, setActive] = useState(initialCategory);

  // Animations
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fetchData = async () => {
    try {
      const [catRes, blogRes] = await Promise.all([
        axiosClient.get("/admin/categories"),
        axiosClient.get("/admin/blogs"),
      ]);

      setCategories(catRes.data.data || catRes.data || []);
      
      const mappedBlogs = (blogRes.data.data || blogRes.data || []).map(b => ({
        ...b,
        categoryName: b.category?.name || b.category_id?.name || "Uncategorized"
      }));

      setBlogs(mappedBlogs);

    } catch (err) {
      console.error("Error fetching category data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Sync state when URL changes (e.g. back button)
  useEffect(() => {
    const categoryFromUrl = searchParams.get("name") || "all";
    setActive(categoryFromUrl);
  }, [searchParams]);

  const handleCategoryChange = (categoryName) => {
    setActive(categoryName);
    setSearchParams(categoryName === "all" ? {} : { name: categoryName });
  };

  const filteredBlogs =
    active === "all"
      ? blogs
      : blogs.filter((b) => 
          b.categoryName.toLowerCase() === active.toLowerCase()
        );

  return (
    <div className="w-full bg-gray-50 min-h-screen pt-10 pb-20">
      
      {/* =============================
          NEW: BACK TO HOME BUTTON
      ============================= */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-yellow-600 font-medium transition-colors group"
        >
          <span className="bg-white p-2 rounded-full border border-gray-200 group-hover:border-yellow-500 shadow-sm transition-all group-hover:-translate-x-1">
            <i className="ri-arrow-left-line text-lg"></i>
          </span>
          Back to Home
        </Link>
      </div>

      {/* HEADER */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 px-4"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Browse by <span className="text-yellow-500">Category</span>
        </h1>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Explore our curated collections. Filter stories by the topics that matter most to you.
        </p>
      </motion.div>

      {/* STICKY CATEGORY BAR */}
      <div className="sticky top-0 z-40 bg-gray-50/95 backdrop-blur-sm py-4 mb-10 border-b border-gray-200/50 shadow-sm">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-3 px-4 max-w-7xl mx-auto"
        >
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
              active === "all"
                ? "bg-yellow-500 text-white shadow-md scale-105"
                : "bg-white text-gray-600 border border-gray-200 hover:border-yellow-400 hover:text-yellow-600"
            }`}
          >
            All Posts
          </button>

          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryChange(cat.name)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm capitalize transition-all duration-300 ${
                active === cat.name
                  ? "bg-yellow-500 text-white shadow-md scale-105"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-yellow-400 hover:text-yellow-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>
      </div>

      {/* BLOGS GRID */}
      <div className="max-w-7xl mx-auto px-5 min-h-[400px]">
        {loading ? (
          <CategorySkeleton />
        ) : filteredBlogs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300 mx-auto max-w-2xl"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-3xl">
              📂
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No blogs found in <span className="text-yellow-600 capitalize">"{active}"</span>
            </h3>
            <p className="text-gray-500">
              Try selecting a different category or check back later!
            </p>
            <button 
              onClick={() => handleCategoryChange("all")}
              className="mt-6 text-yellow-600 font-bold hover:underline"
            >
              View all blogs →
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredBlogs.map((blog) => (
                <motion.div
                  layout
                  key={blog._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <BlogCard blog={blog} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}