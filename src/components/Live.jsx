import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DonateModal from "./DonateModal";

const Live = () => {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToTop = () => {
    if (window.location.pathname !== "/church-website/") {
      navigate("/church-website/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
          {/* Logo */}
          <div
            onClick={scrollToTop}
            className="text-2xl font-semibold italic text-green-700 cursor-pointer"
          >
            Logo
          </div>

          {/* Right side links */}
          <div className="flex items-center space-x-4">
            <button
              onClick={scrollToTop}
              className="text-green-800 hover:text-green-600 transition"
            >
              Home
            </button>
            <button
              onClick={() => setIsDonateOpen(true)}
              className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
            >
              Donate
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center px-4 pt-28 pb-12 bg-gradient-to-b from-green-50 to-white">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6 text-center">
          Watch Our Live Sunday Service
        </h1>
        <p className="text-gray-600 text-center mb-8 max-w-2xl">
          Join us every Sunday for our live worship experience. Stay connected
          and be blessed as we fellowship together online.
        </p>

        {/* Embedded YouTube Live */}
        <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-lg border border-green-100">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID"
            title="Church Live Stream"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-green-700 text-white text-center text-sm">
        © {new Date().getFullYear()} All Rights Reserved | Built with ❤️ by{" "}
        <a
          href="https://elijah.is-a.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline hover:text-green-900 transition"
        >
          Ejay
        </a>
      </footer>

      {/* Donation Modal */}
      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
    </div>
  );
};

export default Live;