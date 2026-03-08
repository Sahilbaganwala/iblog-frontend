import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import userClient from "../../utils/userAxios";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [authorDetails, setAuthorDetails] = useState(null); // Store manually fetched author
  const [related, setRelated] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 3;

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogDetails();
    fetchCategories();
  }, [id]);

  // --- 1. Fetch Categories for Lookup ---
  const fetchCategories = async () => {
    try {
      const res = await userClient.get("/categories");
      setCategories(res.data.data || res.data || []);
    } catch (err) { console.log("Error fetching categories"); }
  };

  // --- 2. Fetch Blog & Trigger Related Actions ---
  const fetchBlogDetails = async () => {
    try {
      const res = await userClient.get(`/blogs/${id}`);
      const blogData = res.data;
      setBlog(blogData);

      // FIX: Robust Category ID extraction
      const catId = blogData.category_id?._id || blogData.category_id || blogData.category;
      if (catId) {
        const cleanCatId = typeof catId === 'object' ? catId._id : catId;
        fetchRelated(cleanCatId, blogData._id);
      }

      // FIX: If user_id is just a string, fetch the author manually
      const userId = blogData.user_id?._id || blogData.user_id;
      if (userId && typeof userId === 'string') {
          fetchAuthor(userId);
      } else if (typeof blogData.user_id === 'object') {
          setAuthorDetails(blogData.user_id); // Backend sent it correctly
      }

    } catch (err) {
      console.error("BLOG DETAILS ERROR:", err);
    }
  };

  // --- 3. Manual Author Fetch (Frontend Patch) ---
  const fetchAuthor = async (userId) => {
      // If the ID matches the current logged-in user, we already know the name!
      if (currentUser && (currentUser.id === userId || currentUser._id === userId)) {
          setAuthorDetails(currentUser);
          return;
      }
      
      try {
          // Try to fetch specific user details if your backend supports this endpoint
          const res = await userClient.get(`/users/${userId}`);
          setAuthorDetails(res.data);
      } catch (err) {
          console.log("Could not fetch specific author details");
      }
  };

  const fetchRelated = async (categoryId, currentId) => {
    try {
      const res = await userClient.get(`/blogs/category/${categoryId}`);
      const blogsList = Array.isArray(res.data) ? res.data : (res.data.data || []);
      const filtered = blogsList.filter((b) => b._id !== currentId);
      setRelated(filtered);
      setPage(1);
    } catch (err) {
      console.error("RELATED BLOGS ERROR:", err);
    }
  };

  // --- LOOKUP FUNCTIONS ---
  const getCategoryName = () => {
    if (!blog) return "";
    if (blog.category_id?.name) return blog.category_id.name;
    const catId = blog.category_id?._id || blog.category_id || blog.category;
    const found = categories.find(c => c._id === catId || c.id === catId);
    return found ? found.name : "General";
  };

  const getAuthorName = () => {
    // Priority 1: We found the author via manual fetch or logged-in user check
    if (authorDetails?.username) return authorDetails.username;
    
    // Priority 2: Backend sent it correctly in the blog object
    if (blog?.user_id?.username) return blog.user_id.username;

    // Priority 3: Fallback
    return "Unknown Author";
  };

  // --- RENDER ---
  if (!blog) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white space-y-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading story...</p>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(related.length / perPage));
  const currentRelated = related.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      
      {/* HEADER CONTENT */}
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-16 flex-grow w-full">
        
        <div className="flex justify-center md:justify-start">
          <Link 
            to={`/blogs?name=${getCategoryName()}`}
            className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-5 hover:bg-yellow-200 transition"
          >
            {getCategoryName()}
          </Link>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6 text-center md:text-left">
          {blog.title}
        </h1>

        {/* AUTHOR SECTION */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-10 border-b border-gray-100 pb-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
             {/* Show Avatar if available, else Icon */}
             {authorDetails?.profilePic ? (
                 <img src={`http://localhost:4000${authorDetails.profilePic}`} alt="Author" className="w-full h-full object-cover"/>
             ) : (
                 <i className="ri-user-smile-line text-2xl text-gray-400"></i>
             )}
          </div>
          <div>
            <p className="font-bold text-gray-900 text-base">
              {getAuthorName()}
            </p>
            <p className="text-gray-500 text-xs">
                {new Date(blog.createdAt || Date.now()).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Blog Image */}
        <div className="w-full overflow-hidden rounded-2xl shadow-lg mb-12">
          <img
            src={
              blog.image
                ? `http://localhost:4000${blog.image}`
                : `https://picsum.photos/seed/${blog._id}/1200/600`
            }
            alt={blog.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none text-gray-800 leading-8 whitespace-pre-wrap">
          {blog.content}
        </article>

        <div className="mt-16 pt-8 border-t border-gray-100 flex gap-4">
          <Link to="/blogs" className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition">
            <i className="ri-arrow-left-line"></i> Back to Blogs
          </Link>
          
          {/* Edit Button Logic */}
          {currentUser && (
              (typeof blog.user_id === 'string' && blog.user_id === currentUser.id) || 
              (blog.user_id?._id === currentUser.id)
            ) && (
            <Link to={`/edit-blog/${blog._id}`} className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-md">
              <i className="ri-edit-line"></i> Edit Post
            </Link>
          )}
        </div>
      </div>

      {/* RELATED POSTS SECTION */}
      <div className="bg-gray-50 py-20 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              More in <span className="text-yellow-600 underline decoration-yellow-400 decoration-4 underline-offset-4">{getCategoryName()}</span>
            </h2>
            
            {related.length > perPage && (
                <div className="flex gap-2">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-yellow-50 disabled:opacity-50 transition"><i className="ri-arrow-left-s-line"></i></button>
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-yellow-50 disabled:opacity-50 transition"><i className="ri-arrow-right-s-line"></i></button>
                </div>
            )}
          </div>

          {related.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-300">
                <i className="ri-article-line text-4xl mb-3 block text-gray-300"></i>
                <p className="text-gray-500">
                  No other articles found in <span className="font-semibold">{getCategoryName()}</span>.
                </p>
                <Link to="/blogs" className="text-yellow-600 font-semibold text-sm mt-2 inline-block">View all blogs</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentRelated.map((item) => (
                <Link key={item._id} to={`/blogs/${item._id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                  <div className="h-52 overflow-hidden relative">
                    <img src={item.image ? `http://localhost:4000${item.image}` : `https://picsum.photos/seed/${item._id}/800/600`} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors mb-3 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-3 flex-grow mb-4">{item.description || item.content?.substring(0, 100) + "..."}</p>
                    <div className="text-yellow-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Read Article <i className="ri-arrow-right-line"></i></div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}