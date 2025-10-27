import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import DonateModal from "./DonateModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("resources")) {
      setActive("resources");
    } else {
      setActive("home");
    }
  }, [location.pathname]);

  // Scroll to section if on home page, otherwise go home first
  const handleSectionClick = (section) => {
    if (location.pathname !== "/") {
      navigate("/"); // go home first
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setActive(section);
    setIsOpen(false);
  };

  const scrollToTop = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActive("home");
    setIsOpen(false);
  };

  const goToResources = () => {
    navigate("/resources");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActive("resources");
    setIsOpen(false);
  };

  const navItemStyle = (id) =>
    `relative text-left text-green-800 hover:text-green-600 transition pb-1 inline-block w-fit ${
      active === id
        ? "after:content-[''] after:absolute after:left-0 after:right-0 after:mx-auto after:bottom-0 after:h-[2px] after:bg-green-700 after:rounded-full after:w-11 sm:after:w-2/3 md:after:w-3/4"
        : ""
    }`;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="text-2xl font-semibold italic text-green-700"
            >
              Logo
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={scrollToTop} className={navItemStyle("home")}>
                Home
              </button>
              <button
                onClick={() => handleSectionClick("about")}
                className={navItemStyle("about")}
              >
                About
              </button>
              <button
                onClick={() => handleSectionClick("programs")}
                className={navItemStyle("programs")}
              >
                Programs
              </button>
              <button
                onClick={() => handleSectionClick("departments")}
                className={navItemStyle("departments")}
              >
                Departments
              </button>
              <button
                onClick={() => handleSectionClick("contact")}
                className={navItemStyle("contact")}
              >
                Contact Us
              </button>
              <button onClick={goToResources} className={navItemStyle("resources")}>
                Resources
              </button>
              <button
                onClick={() => setShowDonate(true)}
                className="px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-800 transition"
              >
                Donate
              </button>
            </div>

            {/* Mobile Toggle Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-green-700">
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out border-t border-green-100 ${
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col px-6 py-4 space-y-4 text-left">
            <button onClick={scrollToTop} className={navItemStyle("home")}>
              Home
            </button>
            <button
              onClick={() => handleSectionClick("about")}
              className={navItemStyle("about")}
            >
              About
            </button>
            <button
              onClick={() => handleSectionClick("programs")}
              className={navItemStyle("programs")}
            >
              Programs
            </button>
            <button
              onClick={() => handleSectionClick("departments")}
              className={navItemStyle("departments")}
            >
              Departments
            </button>
            <button
              onClick={() => handleSectionClick("contact")}
              className={navItemStyle("contact")}
            >
              Contact Us
            </button>
            <button onClick={goToResources} className={navItemStyle("resources")}>
              Resources
            </button>
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