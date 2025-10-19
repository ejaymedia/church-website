import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// helper to calculate countdown
const getTimeRemaining = (targetDate) => {
  const total = Date.parse(targetDate) - Date.now();
  if (total <= 0) return null;

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
};

const programsData = [
  // WEEKLY PROGRAMS
  {
    category: "weekly",
    date: "2025-10-26T09:00:00",
    day: "Sun 9:00 AM",
    title: "Sunday Service",
    location: "Main Auditorium",
    description: "Join us every Sunday for worship, word, and fellowship.",
  },
  {
    category: "weekly",
    date: "2025-10-22T18:00:00",
    day: "Wed 6:00 PM",
    title: "Bible Study",
    location: "Main Auditorium",
    description: "An in-depth study of God's word and open discussions.",
  },
  {
    category: "weekly",
    date: "2025-10-25T16:00:00",
    day: "Sat 4:00 PM",
    title: "Choir Rehearsal",
    location: "Music Room",
    description: "Choir members gather weekly for practice and preparation.",
  },

  // MONTHLY PROGRAMS
  {
    category: "monthly",
    date: "2025-11-01T08:00:00",
    day: "1st Sat 8:00 AM",
    title: "Workers' Meeting",
    location: "Conference Hall",
    description: "Monthly gathering for church workers and ministry leaders.",
  },
  {
    category: "monthly",
    date: "2025-10-25T22:00:00",
    day: "Last Fri 10:00 PM",
    title: "Night of Prayer",
    location: "Main Auditorium",
    description: "A monthly all-night prayer session seeking God's presence.",
  },

  // YEARLY PROGRAMS
  {
    category: "yearly",
    date: "2026-03-15T08:00:00",
    day: "Mar 15–17, 2026",
    title: "Annual Convention",
    location: "Church Grounds",
    description: "Our biggest yearly event with guest ministers, worship, and outreach.",
  },
  {
    category: "yearly",
    date: "2025-12-31T21:00:00",
    day: "Dec 31, 9:00 PM",
    title: "Crossover Service",
    location: "Main Auditorium",
    description: "Join us to thank God for the past year and cross into the new one with joy.",
  },
];

const Countdown = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(date));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(date));
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  if (!timeLeft) {
    const eventTime = Date.parse(date);
    const now = Date.now();
    return (
      <span className="text-sm text-gray-600">
        {now - eventTime < 3600000 ? "Happening now" : "Event ended"}
      </span>
    );
  }

  return (
    <div className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full mt-2 md:mt-0">
      {timeLeft.days > 0 && <span>{timeLeft.days}d </span>}
      {timeLeft.hours > 0 && <span>{timeLeft.hours}h </span>}
      {timeLeft.minutes > 0 && <span>{timeLeft.minutes}m </span>}
      <span>{timeLeft.seconds}s</span>
    </div>
  );
};

const Programs = () => {
  const [activeCategory, setActiveCategory] = useState("weekly");

  const filteredPrograms =
    activeCategory === "all"
      ? programsData
      : programsData.filter((program) => program.category === activeCategory);

  const categories = [
    { name: "Weekly Programs", value: "weekly" },
    { name: "Monthly Programs", value: "monthly" },
    { name: "Yearly Programs", value: "yearly" },
    { name: "View All", value: "all" },
  ];

  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="uppercase text-gray-500 text-sm tracking-wide">Upcoming</p>
        <h2 className="text-3xl md:text-4xl font-semibold mt-2 mb-4">
          Church Programs
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay connected and be part of our weekly, monthly, and yearly church
          programs designed for spiritual growth and fellowship.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 border text-sm rounded-full transition ${
                activeCategory === cat.value
                  ? "bg-gray-800 text-white border-gray-800"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Programs List */}
      <div className="space-y-6">
        {filteredPrograms.map((program, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col md:flex-row items-center justify-between border-t pt-6"
          >
            <div className="flex items-center gap-6">
              <div className="text-center border rounded-md px-3 py-2">
                <p className="text-sm font-semibold text-gray-600">{program.day}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{program.title}</h3>
                <p className="text-gray-500 text-sm">{program.location}</p>
                <p className="text-gray-600 text-sm mt-2 max-w-lg">
                  {program.description}
                </p>
              </div>
            </div>
            <Countdown date={program.date} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Programs;