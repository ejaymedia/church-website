import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="bg-[#d9f7e6] py-16 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm mb-2 text-gray-700">Our story</p>
            <h2 className="text-3xl md:text-4xl mb-4 font-serif text-gray-900">
            A church built on faith and community
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
            Founded in 1985, we have been serving our community for decades. Our
            core beliefs center on love, grace, and transformative faith.
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
            className="rounded-2xl shadow-lg w-full max-w-4xl"
        />

      </motion.div>
    </section>
  );
};

export default AboutUs;