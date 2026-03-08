import React, { useEffect, useState } from "react";
import userAxios from "../../utils/userAxios"; // Use userAxios for protected routes
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [short_description, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [currentImage, setCurrentImage] = useState(""); // URL from backend
  const [thumbnail, setThumbnail] = useState(null); // New file upload
  const [preview, setPreview] = useState(null); // Preview for new file

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [blogRes, catRes] = await Promise.all([
        userAxios.get(`/blogs/${id}`),
        userAxios.get("/categories"),
      ]);

      const blog = blogRes.data;
      setTitle(blog.title);
      // Handle populated category object OR raw ID string
      setCategoryId(blog.category?._id || blog.category_id?._id || blog.category_id || "");
      setShortDescription(blog.description || blog.short_description || "");
      setContent(blog.content);
      
      // Handle image path correctly
      if (blog.image) {
        const imgUrl = blog.image.startsWith("http") 
          ? blog.image 
          : `http://localhost:4000${blog.image}`;
        setCurrentImage(imgUrl);
      }

      setCategories(catRes.data || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      Swal.fire("Error", "Failed to load blog details", "error");
      navigate("/profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file)); // Create local preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category_id", category_id);
    formData.append("short_description", short_description);
    formData.append("content", content);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      // Assuming your backend uses PUT /blogs/:id or similar
      await userAxios.put(`/updateblog/${id}`, formData);

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Your blog has been updated successfully.',
        confirmButtonColor: '#EAB308',
      });

      navigate("/profile");
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      Swal.fire("Error", "Failed to update blog", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex justify-center items-center px-4 py-12">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-[2rem] p-8 md:p-12 shadow-2xl border border-white/50"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Edit <span className="text-yellow-500">Story</span>
          </h1>
          <p className="text-gray-500">Refine your content and make it shine.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Blog Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Category</label>
            <select
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all cursor-pointer"
              required
            >
              <option value="" disabled>Select Category</option>
              {categories.map((cat) => (
                <option value={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Short Summary</label>
            <input
              type="text"
              value={short_description}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all h-64 resize-none"
              required
            />
          </div>

          {/* Image Upload & Preview */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Featured Image</label>
            
            {/* Show Current or New Preview */}
            {(preview || currentImage) && (
              <div className="mb-4 relative w-full h-48 rounded-xl overflow-hidden shadow-sm border border-gray-200 group">
                <img 
                  src={preview || currentImage} 
                  alt="Blog Preview" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium text-sm">Current Thumbnail</span>
                </div>
              </div>
            )}

            <div className="relative group">
              <input
                type="file"
                id="edit-file-upload"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <label 
                htmlFor="edit-file-upload"
                className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 cursor-pointer group-hover:border-yellow-400 group-hover:bg-yellow-50 transition-all"
              >
                <div className="flex flex-col items-center justify-center">
                  <span className="text-xl mb-1">🔄</span>
                  <p className="text-sm text-gray-500 font-medium">
                    Click to change image
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="w-1/3 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={submitting}
              className="w-2/3 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-2xl shadow-lg shadow-yellow-200 hover:shadow-yellow-300 transition-all flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}