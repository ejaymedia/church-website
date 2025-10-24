import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// Helper to calculate countdown
const getTimeRemaining = (targetDate) => {
  const total = Date.parse(targetDate) - Date.now();
  if (total <= 0) return null;

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
};

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
      <span className="text-sm text-green-700 font-medium">
        {now - eventTime < 3600000 ? "Happening now" : "Event ended"}
      </span>
    );
  }

  return (
    <div className="text-sm text-green-800 bg-green-50 px-3 py-1 rounded-full mt-2 md:mt-0">
      {timeLeft.days > 0 && <span>{timeLeft.days}d </span>}
      {timeLeft.hours > 0 && <span>{timeLeft.hours}h </span>}
      {timeLeft.minutes > 0 && <span>{timeLeft.minutes}m </span>}
      <span>{timeLeft.seconds}s</span>
    </div>
  );
};

const Programs = () => {
  const [activeCategory, setActiveCategory] = useState("weekly");
  const [programsData, setProgramsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch programs from Firestore
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "programs"));
        const fetched = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProgramsData(fetched);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

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
    <section className="bg-gradient-to-b from-white to-green-50 px-6 py-16 max-w-5xl mx-auto border-t border-green-200">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="uppercase text-green-700 text-sm tracking-wide">Upcoming</p>
        <h2 className="text-3xl md:text-4xl font-semibold mt-2 mb-4 text-green-900">
          Church Programs
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Stay connected and be part of our weekly, monthly, and yearly church
          programs designed for spiritual growth and fellowship.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 border text-sm rounded-full font-medium transition ${
                activeCategory === cat.value
                  ? "bg-green-600 text-white border-green-600 shadow-md"
                  : "border-green-300 text-green-800 hover:bg-green-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Programs List */}
      {loading ? (
        <p className="text-center text-gray-600 mt-8">Loading programs...</p>
      ) : filteredPrograms.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">
          No programs available for this category yet.
        </p>
      ) : (
        <div className="space-y-6">
          {filteredPrograms.map((program, i) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col md:flex-row items-center justify-between bg-white border border-green-100 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-6">
                <div className="text-center border border-green-200 rounded-md px-3 py-2 bg-green-50">
                  <p className="text-sm font-semibold text-green-700">
                    {program.day}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-900">
                    {program.title}
                  </h3>
                  <p className="text-green-700 text-sm">{program.location}</p>
                  <p className="text-gray-700 text-sm mt-2 max-w-lg">
                    {program.description}
                  </p>
                </div>
              </div>
              <Countdown date={program.date} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Programs;