import React, { useState, useEffect } from "react";
import { X, Copy } from "lucide-react";
import { fetchBankDetails } from "../firestoreService"; // adjust the path if needed

const DonateModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    amount: "",
    email: "",
    description: "",
  });

  const [bankDetails, setBankDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedAcc, setCopiedAcc] = useState(null);

  // Fetch bank details dynamically from Firestore
  useEffect(() => {
    const getDetails = async () => {
      const data = await fetchBankDetails();
      setBankDetails(data);
      setLoading(false);
    };
    getDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.email || !formData.description) {
      alert("Please fill in all fields before proceeding.");
      return;
    }
    alert("Thank you for your donation!");
  };

  const copyToClipboard = (accountNumber) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAcc(accountNumber);
    setTimeout(() => setCopiedAcc(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="grid md:grid-cols-2">
          {/* Left: Donation Form */}
          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-green-800">
                Make a Donation
              </h2>
              <button onClick={onClose} className="text-gray-500 hover:text-red-600">
                <X size={22} />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Amount Input */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Enter Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="₦ Amount"
                  required
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                />
              </div>

              {/* Description Dropdown */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Description
                </label>
                <div className="relative">
                  <select
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full appearance-none px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition cursor-pointer"
                  >
                    <option value="">Select Donation Type</option>
                    <option value="building">🏗️ Building Project</option>
                    <option value="mission">🌍 Mission Offerings</option>
                    <option value="tithe">💰 Tithe, Offerings & Seeds</option>
                    <option value="care">🤝 Care Ministry</option>
                  </select>

                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-700 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-6 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition"
                >
                  Pay Now
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-2 rounded-full border border-red-400 text-red-500 hover:bg-red-50 transition"
                >
                  Close
                </button>
              </div>
            </form>
          </div>

          {/* Right: Bank Info Section */}
          <div className="bg-green-50 p-6 sm:p-8 md:p-10 border-t md:border-t-0 md:border-l border-green-100 text-sm">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              Bank Transfer Details
            </h3>

            {loading ? (
              <p className="text-gray-500">Loading bank details...</p>
            ) : bankDetails ? (
              <ul className="space-y-4 text-gray-800">
                {Object.entries(bankDetails).map(([key, info]) => (
                  <li key={key}>
                    <strong className="capitalize">
                      {key === "tithe"
                        ? "Tithe, Offerings & Seeds"
                        : key === "mission"
                        ? "Mission Offerings"
                        : key === "building"
                        ? "Building Project"
                        : key === "care"
                        ? "Care Ministry"
                        : key}
                    </strong>
                    <br />
                    Account Name: {info?.accountName || "N/A"} <br />
                    Account Number:{" "}
                    <span className="inline-flex items-center gap-2">
                      {info?.accountNumber || "N/A"}
                      {info?.accountNumber && (
                        <button
                          onClick={() => copyToClipboard(info.accountNumber)}
                          type="button"
                          className="text-green-700 hover:text-green-900 transition"
                        >
                          <Copy size={16} />
                        </button>
                      )}
                      {copiedAcc === info?.accountNumber && (
                        <span className="text-xs text-green-600">Copied!</span>
                      )}
                    </span>
                    <br />
                    Bank: {info?.bank || "N/A"}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-500">Failed to load bank details.</p>
            )}

            <p className="text-xs text-gray-600 mt-6 leading-relaxed">
              Kindly email the Finance Ministry (finance@church.org) with details
              of any transfer/deposit made. <br />
              May God bless you as you give.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;