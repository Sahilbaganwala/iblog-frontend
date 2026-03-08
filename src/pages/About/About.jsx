import React from "react";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-20">

      {/* Heading Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800"
          alt="About"
          className="w-full h-[350px] object-cover rounded-3xl shadow-md"
        />

        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            About <span className="text-yellow-500">iBlog</span>
          </h1>

          <p className="text-gray-700 mt-4 leading-relaxed">
            iBlog is your destination to explore trending stories, tech guides, travel
            experiences, lifestyle tips and more. We focus on delivering quality and engaging
            content to help our readers learn, explore and stay inspired.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            Whether you’re here to learn or explore something new — iBlog has something valuable for everyone.
          </p>
        </div>

      </div>

      {/* Testimonials */}
      <h2 className="text-3xl font-semibold text-center mt-20 mb-12">
        What Readers Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        <div className="bg-white rounded-3xl shadow-md p-8 text-center">
          <img
            src="https://i.pravatar.cc/150?img=12"
            className="w-20 h-20 mx-auto rounded-full mb-4"
          />
          <p className="text-gray-600 italic">
            "iBlog has become my daily source of knowledge. The blogs are incredibly detailed."
          </p>
          <p className="mt-4 font-semibold text-yellow-600">Amit Sharma</p>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-8 text-center">
          <img
            src="https://i.pravatar.cc/150?img=19"
            className="w-20 h-20 mx-auto rounded-full mb-4"
          />
          <p className="text-gray-600 italic">
            "Amazing content! I love the travel and lifestyle categories."
          </p>
          <p className="mt-4 font-semibold text-yellow-600">Priya Mehta</p>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-8 text-center">
          <img
            src="https://i.pravatar.cc/150?img=3"
            className="w-20 h-20 mx-auto rounded-full mb-4"
          />
          <p className="text-gray-600 italic">
            "High-quality articles and clean design. iBlog is my favorite blog platform."
          </p>
          <p className="mt-4 font-semibold text-yellow-600">Rohit Verma</p>
        </div>

      </div>

    </div>
  );
}
