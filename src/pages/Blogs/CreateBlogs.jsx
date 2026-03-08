import React, { useEffect, useState } from "react";
import userAxios from "../../utils/userAxios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function CreateBlogs() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [short_description, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await userAxios.get("/categories");
      setCategories(res.data || []);
    } catch (err) {
      console.error("CATEGORY LOAD ERROR:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category_id", category_id);
    formData.append("short_description", short_description);
    formData.append("content", content);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      await userAxios.post("/blogs", formData);
      
      Swal.fire({
        icon: 'success',
        title: 'Published!',
        text: 'Your blog is now live.',
        confirmButtonColor: '#EAB308',
      });

      navigate("/profile");
    } catch (error) {
      console.error("BLOG CREATE ERROR:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to create blog.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex justify-center items-center px-4 py-12">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/50"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Create <span className="text-yellow-500">Post</span>
          </h1>
          <p className="text-gray-500">Share your knowledge with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Title</label>
            <input
              type="text"
              placeholder="Enter a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all font-medium"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Category</label>
            <div className="relative">
              <select
                value={category_id}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                required
              >
                <option value="" disabled className="text-gray-400">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id} className="text-gray-900">{cat.name}</option>
                ))}
              </select>
              {/* Custom Arrow */}
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Short Description</label>
            <input
              type="text"
              placeholder="Brief summary (max 150 chars)"
              value={short_description}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Content</label>
            <textarea
              placeholder="Write your story here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all h-60 resize-none"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Thumbnail</label>
            <div className="relative group">
              <input
                type="file"
                id="file-upload"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="hidden"
                accept="image/*"
              />
              <label 
                htmlFor="file-upload"
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                  thumbnail 
                    ? "border-green-400 bg-green-50" 
                    : "border-gray-300 bg-gray-50 group-hover:border-yellow-400 group-hover:bg-yellow-50"
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                  <span className="text-2xl mb-2">{thumbnail ? "✅" : "🖼️"}</span>
                  <p className="text-sm text-gray-600 font-medium">
                    {thumbnail ? thumbnail.name : "Click to upload image"}
                  </p>
                  {!thumbnail && <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF</p>}
                </div>
              </label>
            </div>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publishing...
              </>
            ) : (
              "Publish Blog"
            )}
          </motion.button>

        </form>
      </motion.div>
    </div>
  );
}