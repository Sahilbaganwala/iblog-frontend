import React from "react";
import { Routes, Route } from "react-router-dom";

// MAIN LAYOUT
import MainLayout from "./layout/MainLayout";

// PUBLIC PAGES
import Home from "./pages/Home/Home";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import Categories from "./pages/Categories/Categories";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import PrivacyPolicy from "./pages/Privacy/PrivacyPolicy";
import NotFound from "./pages/NotFound/NotFound";

// AUTH
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";

// USER PROFILE
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import CreateBlog from "./pages/Blogs/CreateBlogs";
import EditBlog from "./pages/Blogs/EditBlogs";

// ADMIN ROUTE PROTECTION

// ADMIN LAYOUT

// ADMIN PAGES
export default function App() {
  return (
    <Routes>

      {/* PUBLIC WEBSITE */}
      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/categories" element={<Categories />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />

      </Route>

      {/* ADMIN PANEL */}
     

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
