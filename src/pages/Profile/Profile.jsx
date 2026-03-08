import React, { useEffect, useState } from "react";
import userAxios from "../../utils/userAxios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ==============================
// SKELETON LOADER COMPONENT
// ==============================
const ProfileSkeleton = () => (
  <div className="animate-pulse space-y-8">
    <div className="h-40 bg-gray-200 rounded-3xl w-full max-w-3xl mx-auto" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-80 bg-gray-200 rounded-2xl" />
      ))}
    </div>
  </div>
);

export default function Profile() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [profileRes, blogRes] = await Promise.all([
        userAxios.get("/profile"),
        userAxios.get("/profile/myBlogs"),
      ]);

      setUser(profileRes.data.user || profileRes.data);
      setBlogs(blogRes.data || []);
    } catch (error) {
      console.error("PROFILE LOAD ERROR:", error);
      if (error.response?.status === 401) navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await userAxios.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      alert("Failed to delete blog");
    }
  };

  // Helper for Safe Image URL
  const getImageUrl = (image) => {
    if (!image) return "https://placehold.co/600x400?text=No+Image";
    return image.startsWith("http") ? image : `http://localhost:4000${image}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <ProfileSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      
      {/* ==================================
          1. HEADER & PROFILE CARD
      ================================== */}
      <div className="bg-white border-b border-gray-200 pb-16 pt-24 px-4 rounded-b-[3rem] shadow-sm">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Avatar / Initials */}
          <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-6">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Hello, <span className="text-yellow-500">{user?.name}</span>!
          </h1>
          <p className="text-gray-500 text-lg mb-8">{user?.email}</p>

          <div className="flex justify-center gap-4">
            <Link
              to="/create-blog"
              className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition shadow-lg hover:-translate-y-1 transform duration-200"
            >
              + Create New Blog
            </Link>
            <Link
              to="/edit-profile"
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition hover:-translate-y-1 transform duration-200"
            >
              Edit Profile
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ==================================
          2. MY BLOGS SECTION
      ================================== */}
      <div className="max-w-7xl mx-auto px-5 mt-16">
        
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            My Published <span className="text-yellow-500">Blogs</span>
          </h2>
          <span className="bg-yellow-100 text-yellow-800 text-sm font-bold px-3 py-1 rounded-full">
            {blogs.length} Posts
          </span>
        </div>

        {/* Empty State */}
        {blogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300"
          >
            <p className="text-gray-400 text-xl font-medium mb-4">
              You haven't written any blogs yet.
            </p>
            <Link
              to="/create-blog"
              className="text-yellow-600 font-bold hover:underline"
            >
              Start writing your first post →
            </Link>
          </motion.div>
        ) : (
          
          /* Blog Grid */
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImageUrl(blog.image)}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                     <span className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full shadow-sm text-gray-700">
                        {/* Handle both field names for safety */}
                        {blog.category?.name || blog.category_id?.name || "Uncategorized"}
                     </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-1">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-6 h-10">
                    {blog.description || blog.short_description}
                  </p>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="text-yellow-600 font-semibold text-sm hover:underline"
                    >
                      Read Article
                    </Link>
                    <Link
                      to={`/edit-blog/${blog._id}`}
                      className="text-yellow-600 font-semibold text-sm hover:underline"
                    >
                      edit blog
                    </Link>

                    <div className="flex gap-3">
                      {/* Optional Edit Button */}
                      {/* <Link to={`/edit-blog/${blog._id}`} className="text-gray-400 hover:text-blue-500">
                          <svg ... edit icon ... />
                      </Link> */}
                      
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete Blog"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}