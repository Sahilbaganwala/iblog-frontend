import React from "react";
import { motion } from "framer-motion";

// Animation Variant
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-gradient-to-b from-white via-gray-50 to-white py-24">

      {/* ======================
          HEADER SECTION
      ====================== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 px-4"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Privacy <span className="text-yellow-500">Policy</span>
        </h1>

        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Learn how we collect, use, and protect your personal information while
          providing a secure blogging experience.
        </p>
      </motion.div>

      {/* ======================
          CONTENT CARD
      ====================== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-4xl mx-auto px-4"
      >
        <div className="relative bg-white rounded-3xl shadow-2xl 
                        border border-gray-100 overflow-hidden
                        transition hover:shadow-3xl">

          {/* Gradient Top Bar */}
          <div className="h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500" />

          <div className="p-10 space-y-10">

            <PolicySection
              title="1. Introduction"
              content={
                <>
                  At <span className="font-semibold text-yellow-600">iBlog</span>,
                  we respect your privacy and are committed to protecting your
                  personal data while you use our platform.
                </>
              }
            />

            <PolicySection
              title="2. Information We Collect"
              list={[
                "Name and email address during registration or contact.",
                "Device and browser information for analytics.",
                "Comments and feedback you submit."
              ]}
            />

            <PolicySection
              title="3. How We Use Your Information"
              list={[
                "Improve platform performance and experience.",
                "Respond to inquiries and support requests.",
                "Send service-related notifications."
              ]}
            />

            <PolicySection
              title="4. Data Security"
              content="We implement secure technologies, encryption methods, and access controls to protect your data from unauthorized access."
            />

            <PolicySection
              title="5. Your Rights"
              content="You may request access, correction, or deletion of your personal data at any time by contacting our support team."
            />

            <PolicySection
              title="6. Policy Updates"
              content="We may update this Privacy Policy occasionally. All changes will be published on this page."
            />

            {/* Footer */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.5 }}
              className="pt-6 border-t border-gray-200 text-center"
            >
              <p className="text-gray-500 text-sm">
                Last Updated:{" "}
                <span className="font-medium text-gray-800">
                  January 2025
                </span>
              </p>
            </motion.div>

          </div>
        </div>
      </motion.div>

    </div>
  );
}

/* ======================
    Reusable Section
====================== */

function PolicySection({ title, content, list }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.5 }}
      className="space-y-3"
    >
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
        {title}
      </h2>

      {content && (
        <p className="text-gray-700 leading-relaxed">
          {content}
        </p>
      )}

      {list && (
        <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
