import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleResources = () => setResourcesOpen(!resourcesOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#D9F6ED] shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-semibold italic">Logo</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600">
              Home
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600">
              About
            </a>
            <a href="#events" className="text-gray-700 hover:text-blue-600">
              Events
            </a>

            {/* Dropdown for Resources */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 focus:outline-none">
                Resources <ChevronDown size={16} />
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded-md">
                <a
                  href="#sermon"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Sermon
                </a>
                <a
                  href="#podcast"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Podcast
                </a>
                <a
                  href="#articles"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Articles
                </a>
              </div>
            </div>

            <a href="#ministries" className="text-gray-700 hover:text-blue-600">
              Ministries
            </a>

            <a href="#contact" className="text-gray-700 hover:text-blue-600">
              Contact Us
            </a>

            <a
              href="#donation"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Give
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Animated) */}
      <div
        className={`md:hidden bg-[#D9F6ED] overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-2">
          <a href="#home" className="block text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="#about" className="block text-gray-700 hover:text-blue-600">
            About
          </a>
          <a
            href="#ministries"
            className="block text-gray-700 hover:text-blue-600"
          >
            Ministries
          </a>

          {/* Mobile Resources Dropdown */}
          <div>
            <button
              onClick={toggleResources}
              className="flex justify-between items-center w-full text-gray-700 hover:text-blue-600"
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
                className="block text-gray-700 hover:text-blue-600"
              >
                Sermon
              </a>
              <a
                href="#podcast"
                className="block text-gray-700 hover:text-blue-600"
              >
                Podcast
              </a>
              <a
                href="#articles"
                className="block text-gray-700 hover:text-blue-600"
              >
                Articles
              </a>
            </div>
          </div>

          <a href="#events" className="block text-gray-700 hover:text-blue-600">
            Events
          </a>

          <a href="#contact" className="block text-gray-700 hover:text-blue-600">
            Contact Us
          </a>

          <a
            href="#donation"
            className="block px-4 py-2 rounded-md bg-blue-600 text-white text-center hover:bg-blue-700 transition"
          >
            Give
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;