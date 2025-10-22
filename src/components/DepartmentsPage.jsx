import React from "react";
import { Link } from "react-router-dom";

const departments = [
  { title: "Royal Media", desc: "We keep records of sermons and events in Church..." },
  { title: "Royal Ambassador (RA)", desc: "Group of males aged 9–24 who respond to the Lord’s command..." },
  { title: "Girls Auxiliary (GA)", desc: "Helps girls grow in their spiritual development..." },
  { title: "Interpreters Unit", desc: "Handles interpretation of sermons and church materials..." },
  { title: "Teenagers Section", desc: "Guides teens in academics, faith, and leadership..." },
  { title: "Children Section", desc: "Caters for over 200 children under trained teachers..." },
  { title: "Freshers’ Unit", desc: "Welcomes new students into the church family..." },
  { title: "Visitation Unit", desc: "Visits and encourages the sick, aged, and needy..." },
  { title: "Cleaning Unit", desc: "Responsible for cleaning the church every Saturday..." },
  { title: "Ushering Department", desc: "Ensures order and hospitality during worship services..." },
  { title: "Prayer Unit", desc: "Intercedes for members, church leaders, and community..." },
  { title: "Press and Publicity", desc: "Handles announcements, design, and church publications..." },
  { title: "Decorating Unit", desc: "Beautifies the church using creativity and decor..." },
  { title: "Lydia Auxiliary", desc: "Supports young women in ministry and personal growth..." },
  { title: "Pulpit Ministry", desc: "Trains members to preach and teach effectively..." },
  { title: "Library Unit", desc: "Provides educational resources and promotes reading..." },
  { title: "Sunday School", desc: "Teaches the Word of God and biblical understanding..." },
  { title: "Reading Club", desc: "Encourages spiritual and leadership growth through reading..." },
  { title: "Choir Unit", desc: "Leads worship and trains members in musical excellence..." },
  { title: "Youth Department", desc: "Organizes productive programs for youths..." },
  { title: "Mission & Evangelism", desc: "Spreads the gospel and organizes outreach programs..." },
  { title: "Education Department", desc: "Oversees Bible teaching and discipleship training..." },
  { title: "Men Missionary Union", desc: "Equips men for godly living and leadership..." },
  { title: "Women Missionary Union", desc: "Promotes Christian missions and women’s discipleship..." },
];

const DepartmentsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-semibold italic text-green-700">Logo</div>
          <Link
            to="/church-website/"
            className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
          >
            Back Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-10">
          Units in Church
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-green-100 hover:border-green-400 transition transform hover:scale-[1.02]"
            >
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                {dept.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {dept.desc}
              </p>
            </div>
          ))}
        </div>

        {/* How to Join Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-green-800 mb-6">
            How to Join
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-gray-700">
            <div>
              <p className="font-bold text-green-700 mb-1">STEP 1:</p>
              <p>Must be Born Again</p>
            </div>
            <div>
              <p className="font-bold text-green-700 mb-1">STEP 2:</p>
              <p>Be a committed member of the Church</p>
            </div>
            <div>
              <p className="font-bold text-green-700 mb-1">STEP 3:</p>
              <p>Must desire to work with God in a department</p>
            </div>
            <div>
              <p className="font-bold text-green-700 mb-1">STEP 4:</p>
              <p>Enroll for BBG Discipleship Programme</p>
            </div>
            <div>
              <p className="font-bold text-green-700 mb-1">STEP 5:</p>
              <p>Contact the leaders in chosen department</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-green-700 text-white text-center text-sm mt-8">
        © {new Date().getFullYear()} All Rights Reserved | Built with ❤️ by{" "}
          <a
            href="https://elijah.is-a.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium text-decoration: underline hover:text-green-900 transition"
          >
            Ejay
          </a>
      </footer>
    </div>
  );
};

export default DepartmentsPage;