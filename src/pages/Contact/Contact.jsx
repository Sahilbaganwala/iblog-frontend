import React from "react";
import { motion } from "framer-motion";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      
      <div className="max-w-6xl w-full">
        
        {/* ======================
            Header Section
        ====================== */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Get in <span className="text-yellow-500">Touch</span>
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Have a question about our blog? Want to collaborate? 
            Drop us a message and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* ======================
            Main Content Card
        ====================== */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="bg-white rounded-[2rem] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 border border-gray-100"
        >

          {/* -------------------------
              LEFT: Contact Info 
          ------------------------- */}
          <motion.div 
            variants={fadeUp}
            className="lg:col-span-2 bg-gradient-to-br from-yellow-500 to-orange-600 p-10 text-white flex flex-col justify-between relative overflow-hidden"
          >
            {/* Decorative Circle */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-black/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-yellow-100 mb-10 leading-relaxed">
                Fill up the form and our team will get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                
                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <span>+91 1111 2222 3333</span>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <span>gholibaganwala@gmail.com</span>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <span>123 Blogger Street, Tech City, India</span>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-12">
              <h4 className="font-semibold mb-4">Follow us</h4>
              <div className="flex space-x-4">
                {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                   <div key={social} className="w-8 h-8 bg-white/20 hover:bg-white hover:text-orange-600 transition-colors cursor-pointer rounded-full flex items-center justify-center backdrop-blur-sm">
                     {/* Simplified Dot for icon placeholder */}
                     <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                   </div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* -------------------------
              RIGHT: Contact Form 
          ------------------------- */}
          <motion.div 
            variants={fadeUp}
            className="lg:col-span-3 p-10 bg-white"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Send us a message</h2>
            
            <form className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    placeholder="John" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-200 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all outline-none"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Doe" 
                    className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all outline-none"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <select className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all outline-none text-gray-600">
                  <option>General Inquiry</option>
                  <option>Bug Report</option>
                  <option>Collaboration</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea 
                  rows="4" 
                  placeholder="Write your thoughts here..." 
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-200 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all outline-none resize-none"
                ></textarea>
              </div>

              {/* Button */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-200"
                >
                  Send Message
                </motion.button>
              </div>

            </form>
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
}