import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DonateModal from "./DonateModal";
import { fetchYouTubeLink } from "../firestoreService";

const Live = () => {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState(null);
  const navigate = useNavigate();

  // ✅ Convert any YouTube URL to an embeddable autoplay URL
  const convertToEmbedUrl = (url) => {
    if (!url) return null;
    try {
      const patterns = [
        /youtube\.com\/watch\?v=([\w-]+)/,   // normal video
        /youtu\.be\/([\w-]+)/,               // short link
        /youtube\.com\/embed\/([\w-]+)/,     // already embed
        /youtube\.com\/live\/([\w-]+)/,      // live link
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          // ✅ Add autoplay and modest branding
          return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&rel=0&modestbranding=1`;
        }
      }

      // fallback if none match
      return null;
    } catch (error) {
      console.error("Invalid YouTube URL:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadLink = async () => {
      try {
        const url = await fetchYouTubeLink();
        const embedUrl =
          convertToEmbedUrl(url) ||
          "https://www.youtube.com/embed/live_stream?channel=YOUR_DEFAULT_CHANNEL_ID&autoplay=1&mute=1&rel=0&modestbranding=1";
        setYoutubeUrl(embedUrl);
      } catch (error) {
        console.error("Error loading YouTube link:", error);
        setYoutubeUrl(
          "https://www.youtube.com/embed/live_stream?channel=YOUR_DEFAULT_CHANNEL_ID&autoplay=1&mute=1&rel=0&modestbranding=1"
        );
      }
    };
    loadLink();
  }, []);

  const scrollToTop = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
          <div
            onClick={scrollToTop}
            className="text-2xl font-semibold italic text-green-700 cursor-pointer"
          >
            Logo
          </div>
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

      {/* Main */}
      <main className="flex-grow flex flex-col justify-center items-center px-4 pt-28 pb-12 bg-gradient-to-b from-green-50 to-white">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6 text-center">
          Watch Our Live Sunday Service
        </h1>
        <p className="text-gray-600 text-center mb-8 max-w-2xl">
          Join us every Sunday for our live worship experience. Stay connected
          and be blessed.
        </p>

        <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-lg border border-green-100">
          {youtubeUrl ? (
            <iframe
              className="w-full h-full"
              src={youtubeUrl}
              title="Church Live Stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Loading live stream...
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-green-700 text-white text-center text-sm mt-8">
        © {new Date().getFullYear()} Church Name. All rights reserved. | Built with ❤️ by{" "}
        <a
          href="https://elijah.is-a.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-medium underline hover:text-green-900 transition"
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