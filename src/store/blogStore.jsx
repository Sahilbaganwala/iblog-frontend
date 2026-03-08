// frontend/src/store/blogStore.jsx

import { create } from "zustand";
import axios from "axios";

const API = "https://iblog-backend-m7e6.onrender.com";

export const useBlogStore = create((set) => ({

  blogs: [],
  singleBlog: null,
  loading: false,

  // =======================================
  // FETCH ALL BLOGS (PUBLIC)
  // GET /blogs
  // =======================================
  fetchBlogs: async () => {
    try {
      set({ loading: true });

      const res = await axios.get(`${API}/blogs`);

      const mappedBlogs = res.data.map((b) => ({
        _id: b._id,
        title: b.title,
        description: b.description || b.short_description,
        
        // 👇 FIX: Capture both possible field names from backend
        category: b.category || b.category_id, 
        category_id: b.category_id || b.category,

        author: b.author,
        image: b.image
          ? `${API}${b.image}`
          : "https://placehold.co/1200x800?text=No+Image",
        raw: b
      }));

      set({ blogs: mappedBlogs, loading: false });

    } catch (error) {
      console.error("BLOG FETCH ERROR:", error);
      set({ loading: false });
    }
  },

  // =======================================
  // FETCH SINGLE BLOG
  // GET /blogs/:id
  // =======================================
  fetchBlogById: async (id) => {
    try {
      set({ loading: true });

      const res = await axios.get(`${API}/blogs/${id}`);
      const b = res.data;

      const mapped = {
        _id: b._id,
        title: b.title,
        description: b.description,
        content: b.content || "",
        
        // 👇 FIX: Capture both
        category: b.category || b.category_id,
        category_id: b.category_id || b.category,

        author: b.author,
        image: b.image
          ? `${API}${b.image}`
          : "https://placehold.co/1200x800?text=No+Image",
        raw: b
      };

      set({ singleBlog: mapped, loading: false });
      return mapped;

    } catch (error) {
      console.error("FETCH BLOG ERROR:", error);
      set({ loading: false });
      return null;
    }
  },

  // =======================================
  // FETCH LOGGED-IN USER BLOGS
  // GET /profile/myBlogs
  // =======================================
  fetchMyBlogs: async () => {
    try {
      set({ loading: true });
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/profile/myBlogs`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const mapped = res.data.map((b) => ({
        _id: b._id,
        title: b.title,
        description: b.description,
        
        // 👇 FIX: Capture both
        category: b.category || b.category_id,
        category_id: b.category_id || b.category,

        author: b.author,
        image: b.image
          ? `${API}${b.image}`
          : "https://placehold.co/1200x800?text=No+Image",
        raw: b
      }));

      set({ blogs: mapped, loading: false });

    } catch (error) {
      console.error("FETCH MY BLOGS ERROR:", error);
      set({ loading: false });
    }
  },

}));