import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const departments = [
  {
    name: "Choir Department",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=60",
    description:
      "Leads worship and creates a powerful atmosphere of praise through music.",
  },
  {
    name: "Ushering Department",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=60",
    description:
      "Welcomes members warmly and ensures order during services.",
  },
  {
    name: "Prayer Department",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=60",
    description:
      "Intercedes for the church, congregation, and community needs.",
  },
  {
    name: "Media Department",
    image:
      "https://images.unsplash.com/photo-1526662092594-e98c1e356d6a?auto=format&fit=crop&w=800&q=60",
    description:
      "Handles visuals, sound, and recordings to enhance the worship experience.",
  },
  {
    name: "Evangelism Department",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=60",
    description:
      "Spreads the gospel and reaches out to communities with compassion.",
  },
];

const Departments = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-gray-50 relative">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
          Our Departments
        </h2>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg opacity-50 hover:opacity-100 transition-opacity duration-300 z-10"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth px-3"
          >
            {departments.map((dept, index) => (
              <div
                key={index}
                className="w-[250px] flex-none bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {dept.name}
                  </h3>

                  {/* Description: centered, wraps, won't force width */}
                  <p className="text-gray-600 text-sm leading-snug mt-2 break-words text-center">
                    {dept.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg opacity-50 hover:opacity-100 transition-opacity duration-300 z-10"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="text-center mt-8">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
            View More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Departments;
