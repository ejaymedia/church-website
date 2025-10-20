import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-b from-white to-green-50 py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm mb-2 text-green-700 uppercase tracking-wide">
          Our Story
        </p>

        <h2 className="text-3xl md:text-4xl mb-4 font-serif text-green-900">
          A Church Built on Faith and Community
        </h2>

        {/* Divider line */}
        <div className="w-20 h-1 bg-green-600 mx-auto mb-6 rounded-full"></div>

        <p className="text-gray-700 leading-relaxed mb-6">
          Founded in 1985, we have been serving our community for decades.
          Our core beliefs center on love, grace, and transformative faith.
          We continue to grow together in spirit, purpose, and unity.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-12 flex justify-center"
      >
        <img
          src={`${import.meta.env.BASE_URL}about/about-image.jpg`}
          alt="About our church"
          className="rounded-2xl shadow-[0_8px_30px_rgba(0,128,0,0.15)] w-full max-w-4xl"
        />
      </motion.div>
    </section>
  );
};

export default AboutUs;