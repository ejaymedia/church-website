import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import DonateModal from "./DonateModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleResources = () => setResourcesOpen(!resourcesOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="text-2xl font-semibold italic text-green-700">Logo</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-green-800 hover:text-green-600 transition">
                Home
              </a>
              <a href="#about" className="text-green-800 hover:text-green-600 transition">
                About
              </a>
              <a href="#programs" className="text-green-800 hover:text-green-600 transition">
                Programs
              </a>
              <a href="#departments" className="text-green-800 hover:text-green-600 transition">
                Departments
              </a>
              <a href="#contact" className="text-green-800 hover:text-green-600 transition">
                Contact Us
              </a>

              {/* Dropdown for Resources */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleResources}
                  className="flex items-center gap-1 text-green-800 hover:text-green-600 focus:outline-none"
                >
                  Resources{" "}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      resourcesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {resourcesOpen && (
                  <div className="absolute left-0 mt-2 flex flex-col bg-white border border-green-100 shadow-md rounded-md">
                    <a
                      href="#sermon"
                      className="px-4 py-2 text-green-700 hover:bg-green-50 transition"
                    >
                      Sermon
                    </a>
                    <a
                      href="#podcast"
                      className="px-4 py-2 text-green-700 hover:bg-green-50 transition"
                    >
                      Podcast
                    </a>
                    <a
                      href="#articles"
                      className="px-4 py-2 text-green-700 hover:bg-green-50 transition"
                    >
                      Articles
                    </a>
                  </div>
                )}
              </div>

              {/* Donate Button */}
              <button
                onClick={() => setShowDonate(true)}
                className="px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-800 transition"
              >
                Donate
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-green-700">
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4 space-y-2">
            <a href="#" className="block text-green-800 hover:text-green-600 transition">
              Home
            </a>
            <a href="#about" className="block text-green-800 hover:text-green-600 transition">
              About
            </a>
            <a href="#ministries" className="block text-green-800 hover:text-green-600 transition">
              Ministries
            </a>
            <a href="#events" className="block text-green-800 hover:text-green-600 transition">
              Events
            </a>
            <a href="#contact" className="block text-green-800 hover:text-green-600 transition">
              Contact Us
            </a>

            {/* Mobile Resources Dropdown */}
            <div>
              <button
                onClick={toggleResources}
                className="flex justify-between items-center w-full text-green-800 hover:text-green-600"
              >
                <span>Resources</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    resourcesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`pl-4 mt-1 space-y-1 transition-all duration-300 ease-in-out ${
                  resourcesOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <a
                  href="#sermon"
                  className="block text-green-700 hover:text-green-600 transition"
                >
                  Sermon
                </a>
                <a
                  href="#podcast"
                  className="block text-green-700 hover:text-green-600 transition"
                >
                  Podcast
                </a>
                <a
                  href="#articles"
                  className="block text-green-700 hover:text-green-600 transition"
                >
                  Articles
                </a>
              </div>
            </div>

            {/* Mobile Donate Button */}
            <button
              onClick={() => {
                setShowDonate(true);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 rounded-md bg-green-700 text-white text-center hover:bg-green-800 transition"
            >
              Donate
            </button>
          </div>
        </div>
      </nav>

      {/* Donate Modal */}
      <DonateModal isOpen={showDonate} onClose={() => setShowDonate(false)} />
    </>
  );
};

export default Navbar;
