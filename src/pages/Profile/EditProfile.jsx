import React, { useState, useEffect } from "react";
import userAxios from "../../utils/userAxios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await userAxios.get("/profile");
      const data = res.data.user || res.data;

      setForm({
        name: data.name || "",
        email: data.email || "",
        dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
      });
    } catch (error) {
      console.error("PROFILE FETCH ERROR:", error);
      if (error.response?.status === 401) navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      await userAxios.put("/profile/update", form);
      setMessage({ type: "success", text: "Profile updated successfully!" });

      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...currentUser, ...form }));

      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      console.error("PROFILE UPDATE ERROR:", error);
      setMessage({ type: "error", text: "Update failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-lg border border-gray-100 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-bl-full -mr-8 -mt-8 z-0" />

        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
            Edit <span className="text-yellow-500">Profile</span>
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Update your personal details below
          </p>

          {message.text && (
            <div
              className={`text-center p-3 rounded-lg mb-6 text-sm font-semibold ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                {/* 👇 ADDED text-gray-900 here */}
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  // ❌ Remove onChange={handleChange} (Optional, but good practice)
                  disabled // 🔒 LOCKS THE INPUT
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-500 bg-gray-100 cursor-not-allowed focus:outline-none"
                  // 👆 CHANGED CLASSES: text-gray-500, bg-gray-100, cursor-not-allowed
                />
              </div>
              <p className="text-xs text-gray-400 mt-1 ml-1">
                Email cannot be changed.
              </p>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date of Birth
              </label>
              {/* 👇 ADDED text-gray-900 here */}
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 text-white py-3.5 rounded-xl font-bold hover:bg-yellow-600 transition shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isSubmitting ? "Updating..." : "Save Changes"}
              </button>

              <Link
                to="/profile"
                className="w-full bg-white text-gray-700 border border-gray-300 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
