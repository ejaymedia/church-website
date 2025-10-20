import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";

const PastorSection = () => {
  const socialLinks = [
    {
      icon: <Facebook size={20} />,
      color: "bg-blue-600 hover:bg-blue-700",
      link: "#",
    },
    {
      icon: <Instagram size={20} />,
      color: "bg-pink-600 hover:bg-pink-700",
      link: "#",
    },
    {
      icon: <Twitter size={20} />,
      color: "bg-sky-500 hover:bg-sky-600",
      link: "#",
    },
    {
      icon: <MessageCircle size={20} />,
      color: "bg-green-500 hover:bg-green-600",
      link: "https://wa.me/2340000000000",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#f3fff5] overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Pastor Image */}
        <motion.div
          className="flex-shrink-0 relative group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=60"
            alt="Pastor John Doe"
            className="w-72 h-72 object-cover rounded-2xl shadow-xl border-4 border-green-100"
          />
          {/* Soft green gradient overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-green-700/20 via-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </motion.div>

        {/* Pastor Info */}
        <div className="text-center md:text-left max-w-xl">
          <h2 className="text-3xl font-bold text-green-800 mb-3">Meet Our Pastor</h2>
          <h3 className="text-xl font-semibold text-green-600 mb-4">Pastor John Doe</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Pastor John Doe is a dynamic leader with a passion for teaching the Word of God 
            and guiding people to live purpose-driven lives. Under his leadership, our church 
            has grown spiritually and continues to impact the community through love, service, 
            and faith.
          </p>

          {/* Social Links */}
          <motion.div
            className="flex justify-center md:justify-start space-x-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {socialLinks.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
                className={`p-3 ${item.color} rounded-full text-white transition-transform transform hover:scale-110 shadow-md`}
              >
                {item.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default PastorSection;