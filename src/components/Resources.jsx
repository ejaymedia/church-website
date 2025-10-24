import React from "react";
import { useNavigate } from "react-router-dom";

const Resources = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/church-website/");
    // Smoothly scroll to top after small delay for route change
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={handleGoHome}
            className="text-2xl font-semibold italic text-green-700 focus:outline-none"
          >
            Logo
          </button>

          {/* Back Home Button */}
          <button
            onClick={handleGoHome}
            className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
          >
            Back Home
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-64 md:h-80 bg-green-900 text-white flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}heroimages/hero3.jpg`}
            alt="Resources Banner"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Resources</h1>
          <p className="text-green-100 max-w-2xl mx-auto text-sm md:text-base">
            Explore sermons, articles, and ebooks to grow in faith and understanding.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-4 py-12">
        {/* Sermons Section */}
        <section id="sermon" className="mb-20">
          <h2 className="text-3xl font-semibold text-green-800 mb-4 border-l-4 border-green-600 pl-3">
            Sermons
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl">
            Listen to inspiring sermons from our pastors and guest ministers that strengthen your faith and deepen your walk with God.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md border border-green-100 text-center text-gray-600">
            Sermon videos or audio links will appear here.
          </div>
        </section>

        {/* Articles Section */}
        <section id="articles" className="mb-20">
          <h2 className="text-3xl font-semibold text-green-800 mb-4 border-l-4 border-green-600 pl-3">
            Articles
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl">
            Read uplifting articles that encourage growth, reflection, and a deeper understanding of God’s word.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md border border-green-100 text-center text-gray-600">
            Articles will be listed here.
          </div>
        </section>

        {/* Ebooks Section */}
        <section id="ebooks" className="mb-20">
          <h2 className="text-3xl font-semibold text-green-800 mb-4 border-l-4 border-green-600 pl-3">
            Ebooks
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl">
            Download free ebooks and study materials to help you grow spiritually and gain deeper insight into the Word of God.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md border border-green-100 text-center text-gray-600">
            Ebooks will be available for download here.
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-green-700 text-white text-center text-sm mt-8">
        © {new Date().getFullYear()} Church Name. All rights reserved. | Built with ❤️ by{" "}
          <a
            href="https://elijah.is-a.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium text-decoration: underline hover:text-green-900 transition"
          >
            Ejay
          </a>
      </footer>
    </div>
  );
};

export default Resources;