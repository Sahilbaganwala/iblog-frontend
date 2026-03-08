import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-950 text-gray-400 pt-20 pb-8 mt-20 border-t border-gray-800 relative overflow-hidden">
      
      {/* Optional: Decorative blurred glow in the background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">

        {/* Brand & Newsletter Section (Span 5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <Link to="/" className="inline-block">
            <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 tracking-wide">
              iBlog.
            </h3>
          </Link>
          <p className="text-sm leading-relaxed max-w-sm text-gray-400">
            Your daily source of amazing blogs on technology, travel, lifestyle, 
            food, and more. Join our community of thinkers.
          </p>
          
          {/* Newsletter Input */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full sm:w-auto px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500 text-sm transition-colors"
            />
            <button className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg text-sm transition-all transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>

        {/* Navigation Links (Span 2 cols) */}
        <div className="md:col-span-3 md:ml-auto">
          <h4 className="text-lg font-semibold text-white mb-6 relative inline-block">
            Quick Links
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-yellow-500 rounded-full"></span>
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "Explore Blogs", path: "/blogs" },
              { name: "About Us", path: "/about" }, // Assuming you might have this
              { name: "Contact", path: "/contact" },
            ].map((link, index) => (
              <li key={index}>
                <Link 
                  to={link.path} 
                  className="hover:text-yellow-400 transition-all duration-300 block hover:translate-x-2"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Social (Span 4 cols) */}
        <div className="md:col-span-4">
          <h4 className="text-lg font-semibold text-white mb-6 relative inline-block">
            Connect & Legal
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-yellow-500 rounded-full"></span>
          </h4>
          
          <ul className="space-y-3 text-sm mb-8">
            <li><Link to="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-yellow-400 transition-colors">Terms of Service</Link></li>
          </ul>

          {/* Social Icons Row */}
          <div className="flex items-center gap-4">
            <SocialIcon 
              href="https://www.linkedin.com/in/sahil-poonia-057068341/" 
              icon="ri-linkedin-fill" 
            />
            <SocialIcon 
              href="https://gitlab.com/sahilpunia18112004" 
              icon="ri-gitlab-fill" 
            />
            <SocialIcon 
              href="https://www.instagram.com/isxhil____/" 
              icon="ri-instagram-fill" 
            />
            <SocialIcon 
              href="#" 
              icon="ri-twitter-x-fill" 
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2025 <span className="text-yellow-500 font-medium">iBlog</span>. All Rights Reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span>Made with ❤️ by Sahil</span>
        </div>
      </div>
    </footer>
  );
}

// Helper Component for Social Icons to keep code clean
function SocialIcon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 text-gray-400 hover:bg-yellow-500 hover:text-black transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-yellow-500/20"
    >
      <i className={`${icon} text-lg`}></i>
    </a>
  );
}