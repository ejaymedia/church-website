import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const images = [
  `${import.meta.env.BASE_URL}heroimages/hero1.jpg`,
  `${import.meta.env.BASE_URL}heroimages/hero2.jpg`,
  `${import.meta.env.BASE_URL}heroimages/hero3.jpg`,
  `${import.meta.env.BASE_URL}heroimages/hero4.jpg`,
  `${import.meta.env.BASE_URL}heroimages/hero5.jpg`,
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to contact section
  const handleJoinUsClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // if not on home page, navigate first
      navigate("/church-website/");
      setTimeout(() => {
        const section = document.getElementById("contact");
        section?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background slideshow */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${
            index === current ? "opacity-100 scale-110" : "opacity-0 scale-100"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            transition: "opacity 2s ease-in-out, transform 10s ease-in-out",
          }}
        ></div>
      ))}

      {/* Green-tinted overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 via-black/50 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight">
          <Typewriter
            words={[
              "Faith that moves mountains",
              "Faith that transforms lives",
              "Faith that brings hope",
              "Faith that inspires change",
              "Faith that unites hearts",
            ]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>

        <p className="max-w-2xl mx-auto mb-8 text-sm md:text-lg text-green-50">
          We are a community of believers dedicated to sharing hope and love.
          Our mission is to serve God and our neighbors with compassion and purpose.
        </p>

        <div className="flex space-x-4">
          <button
            onClick={handleJoinUsClick}
            className="bg-white text-green-800 px-6 py-2 rounded-full font-medium hover:bg-green-100 border border-green-200 transition"
          >
            Join us
          </button>

          <button
            onClick={() => navigate("/live")}
            className="bg-green-700 text-white px-6 py-2 rounded-full font-medium hover:bg-green-800 transition"
          >
            Watch live
          </button>
        </div>
      </div>

      {/* Soft fade at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-green-900/70 to-transparent"></div>
    </section>
  );
};

export default Hero;