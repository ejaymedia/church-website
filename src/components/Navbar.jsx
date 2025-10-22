import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DonateModal from "./DonateModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  // Smooth navigation to resource sections
  const handleResourceClick = (section) => {
    navigate("/church-website/resources", { state: { section } });
    setResourcesOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/church-website/" className="text-2xl font-semibold italic text-green-700">
              Logo
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/church-website/" className="text-green-800 hover:text-green-600 transition">
                Home
              </Link>
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
                    className={`transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {resourcesOpen && (
                  <div className="absolute left-0 mt-2 w-40 flex flex-col bg-white border border-green-100 shadow-lg rounded-md overflow-hidden">
                    <button
                      onClick={() => handleResourceClick("sermon")}
                      className="px-4 py-2 text-left text-green-700 hover:bg-green-50 transition"
                    >
                      Sermons
                    </button>
                    <button
                      onClick={() => handleResourceClick("podcast")}
                      className="px-4 py-2 text-left text-green-700 hover:bg-green-50 transition"
                    >
                      Podcast
                    </button>
                    <button
                      onClick={() => handleResourceClick("articles")}
                      className="px-4 py-2 text-left text-green-700 hover:bg-green-50 transition"
                    >
                      Articles
                    </button>
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
          className={`md:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out border-t border-green-100 ${
            isOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-4 space-y-3">
            <Link
              to="/church-website/"
              onClick={() => setIsOpen(false)}
              className="block text-green-800 hover:text-green-600 transition font-medium"
            >
              Home
            </Link>
            <a href="#about" className="block text-green-800 hover:text-green-600 transition font-medium">
              About
            </a>
            <a href="#programs" className="block text-green-800 hover:text-green-600 transition font-medium">
              Programs
            </a>
            <a href="#departments" className="block text-green-800 hover:text-green-600 transition font-medium">
              Departments
            </a>
            <a href="#contact" className="block text-green-800 hover:text-green-600 transition font-medium">
              Contact Us
            </a>

            {/* Mobile Resources Dropdown */}
            <div>
              <button
                onClick={toggleResources}
                className="flex justify-between items-center w-full text-green-800 hover:text-green-600 font-medium"
              >
                <span>Resources</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`pl-4 mt-2 space-y-2 transition-all duration-300 ease-in-out ${
                  resourcesOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <button
                  onClick={() => handleResourceClick("sermon")}
                  className="block text-green-700 hover:text-green-600 transition w-full text-left"
                >
                  Sermons
                </button>
                <button
                  onClick={() => handleResourceClick("podcast")}
                  className="block text-green-700 hover:text-green-600 transition w-full text-left"
                >
                  Podcast
                </button>
                <button
                  onClick={() => handleResourceClick("articles")}
                  className="block text-green-700 hover:text-green-600 transition w-full text-left"
                >
                  Articles
                </button>
              </div>
            </div>

            {/* Mobile Donate Button */}
            <button
              onClick={() => {
                setShowDonate(true);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 rounded-md bg-green-700 text-white text-center font-medium hover:bg-green-800 transition mt-2"
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