import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FlutterWaveButton } from "flutterwave-react-v3";
import {
  fetchSermons,
  fetchFreeEbooks,
  fetchPremiumEbooks,
} from "../firestoreService";

const Resources = () => {
  const navigate = useNavigate();
  const [selectedEbook, setSelectedEbook] = useState(null);
  const [sermons, setSermons] = useState([]);
  const [viewMoreUrl, setViewMoreUrl] = useState("#");
  const [freeEbooks, setFreeEbooks] = useState([]);
  const [premiumEbooks, setPremiumEbooks] = useState([]);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const sermonData = await fetchSermons();
        const free = await fetchFreeEbooks();
        const premium = await fetchPremiumEbooks();

        setSermons(sermonData?.sermons || []);
        setViewMoreUrl(sermonData?.viewMoreUrl || "#");
        setFreeEbooks(free || []);
        setPremiumEbooks(premium || []);
      } catch (error) {
        console.error("Error loading resources:", error);
        setSermons([]);
        setFreeEbooks([]);
        setPremiumEbooks([]);
      }
    };
    loadData();
  }, []);

  const handleGoHome = () => {
    navigate("/");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const openPaymentModal = (ebook) => {
    setSelectedEbook(ebook);
    setCustomerEmail(""); // Reset email input
  };
  const closePaymentModal = () => setSelectedEbook(null);

  const getYouTubeVideoId = (url) => {
    if (!url || typeof url !== "string") return null;
    try {
      const patterns = [/youtu\.be\/([^?]+)/, /v=([^&]+)/, /embed\/([^?]+)/];
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) return match[1];
      }
      return null;
    } catch (err) {
      console.error("Error parsing YouTube ID:", err);
      return null;
    }
  };

  const getYouTubeThumbnail = (url, customThumb) => {
    if (customThumb) return customThumb;
    const videoId = getYouTubeVideoId(url);
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : "https://via.placeholder.com/480x360?text=No+Thumbnail";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col text-sm md:text-base overflow-x-hidden">
      {/* Header */}
      <header className="bg-white shadow-md py-4 sticky top-0 z-40 w-full">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <button
            onClick={handleGoHome}
            className="text-xl sm:text-2xl font-semibold italic text-green-700"
          >
            Logo
          </button>
          <button
            onClick={handleGoHome}
            className="px-3 sm:px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition text-xs sm:text-sm"
          >
            Back Home
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-48 sm:h-64 md:h-80 bg-green-900 text-white flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}heroimages/hero3.jpg`}
            alt="Resources Banner"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 text-center px-3 sm:px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            Resources
          </h1>
          <p className="text-green-100 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
            Explore sermons and ebooks to grow in faith and understanding.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-3 py-6 md:py-10 w-full">
        {/* Sermons */}
        <section id="sermons" className="mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-800 mb-2 border-l-4 border-green-600 pl-2">
            Sermons
          </h2>
          <p className="text-gray-700 mb-3 text-xs sm:text-sm">
            Watch inspiring sermons that strengthen your faith and deepen your
            walk with God.
          </p>

          {sermons.length > 0 ? (
            <>
              <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-100">
                {sermons.map((sermon, index) => (
                  <div
                    key={index}
                    className="flex-none w-48 sm:w-60 bg-white rounded-md shadow-sm overflow-hidden border border-green-100 hover:shadow-md transition"
                  >
                    <a
                      href={sermon.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={getYouTubeThumbnail(
                          sermon.youtubeLink,
                          sermon.thumbnail
                        )}
                        alt={sermon.title}
                        className="w-full h-28 sm:h-32 object-cover"
                      />
                    </a>
                    <div className="p-2 text-center">
                      <h3 className="text-xs sm:text-sm font-semibold text-green-800 mb-1 truncate">
                        {sermon.title}
                      </h3>
                      <a
                        href={sermon.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-700 text-xs hover:underline"
                      >
                        Watch on YouTube
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <a
                  href={viewMoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-green-700 text-white text-xs sm:text-sm rounded-md hover:bg-green-800 transition"
                >
                  View More
                </a>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center mt-4 text-sm">
              No sermons available yet.
            </p>
          )}
        </section>

        {/* Ebooks */}
        <section id="ebooks">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-800 mb-3 border-l-4 border-green-600 pl-2">
            Ebooks
          </h2>

          {/* Free Ebooks */}
          <div className="mb-8">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-green-700 mb-2">
              Free Ebooks
            </h3>
            {freeEbooks.length > 0 ? (
              <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-100">
                {freeEbooks.map((ebook, index) => (
                  <div
                    key={index}
                    className="flex-none w-36 sm:w-44 bg-white rounded-md shadow-sm border border-green-100 hover:shadow-md transition text-center"
                  >
                    <img
                      src={ebook.imageLink}
                      alt={ebook.title}
                      className="w-full h-32 sm:h-36 object-cover"
                    />
                    <div className="p-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-green-800 mb-1 truncate">
                        {ebook.title}
                      </h4>
                      <a
                        href={
                          ebook.downloadLink.startsWith("http")
                            ? ebook.downloadLink
                            : `https://${ebook.downloadLink}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-2 py-1 bg-green-700 text-white text-xs rounded-md hover:bg-green-800 transition"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center text-sm">
                No free ebooks available yet.
              </p>
            )}
          </div>

          {/* Premium Ebooks */}
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-green-700 mb-2">
              Premium Ebooks
            </h3>
            {premiumEbooks.length > 0 ? (
              <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-100">
                {premiumEbooks.map((ebook, index) => (
                  <div
                    key={index}
                    className="flex-none w-36 sm:w-44 bg-white rounded-md shadow-sm border border-green-100 hover:shadow-md transition text-center"
                  >
                    <img
                      src={ebook.imageLink}
                      alt={ebook.title}
                      className="w-full h-32 sm:h-36 object-cover"
                    />
                    <div className="p-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-green-800 mb-1 truncate">
                        {ebook.title}
                      </h4>
                      <p className="text-green-700 font-medium text-xs sm:text-sm mb-1">
                        ₦{ebook.price}
                      </p>
                      <button
                        onClick={() => openPaymentModal(ebook)}
                        className="inline-block px-2 py-1 bg-green-700 text-white text-xs rounded-md hover:bg-green-800 transition"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center text-sm">
                No premium ebooks available yet.
              </p>
            )}
          </div>
        </section>
      </main>

      {/* Payment Modal */}
      {selectedEbook && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-3">
          <div className="bg-white rounded-md shadow-lg max-w-sm w-full p-4 text-center relative">
            <h3 className="text-green-800 text-lg font-semibold mb-2">
              Purchase Ebook
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              You’re about to purchase{" "}
              <span className="font-medium">{selectedEbook.title}</span> for{" "}
              <span className="text-green-700 font-semibold">
                ₦{selectedEbook.price}
              </span>
              .
            </p>

            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter your email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
              className="w-full border border-green-300 rounded-md px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            {/* Flutterwave Payment Button */}
            <FlutterWaveButton
              className={`w-full py-2 rounded-md text-sm transition ${
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              text="Pay Now"
              currency="NGN"
              amount={selectedEbook.price}
              public_key={import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY}
              tx_ref={Date.now()}
              payment_options="card,ussd,banktransfer"
              customer={{
                email: customerEmail,
              }}
              customizations={{
                title: "Ebook Purchase",
                description: selectedEbook.title,
              }}
              callback={(response) => {
                const status = response?.status?.toLowerCase();
                if (status === "successful" || status === "completed" || status === "success") {
                  const downloadUrl = selectedEbook.downloadLink.startsWith("http")
                    ? selectedEbook.downloadLink
                    : `https://${selectedEbook.downloadLink}`;
                  window.open(downloadUrl, "_blank");
                } else {
                  alert("Payment not completed. Please try again.");
                  console.log("Flutterwave response:", response);
                }
              }}
              onClose={() => console.log("Payment modal closed")}
              disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)}
            />

            <button
              onClick={closePaymentModal}
              className="mt-2 text-xs text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-6 bg-green-700 text-white text-center text-xs sm:text-sm mt-8">
        © {new Date().getFullYear()} Church Name. All rights reserved. | Built
        with ❤️ by{" "}
        <a
          href="https://elijah.is-a.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-medium underline hover:text-green-900 transition"
        >
          Ejay
        </a>
      </footer>
    </div>
  );
};

export default Resources;