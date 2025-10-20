import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <section
      id="contact"
      className="pt-20 pb-10 bg-gradient-to-b from-white to-[#f3fff5] border-t border-green-100"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-start">
        
        {/* Left: Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-green-800 mb-3">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have a question or want to connect? Fill out the form below and we’ll get back to you soon.
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 rounded-lg bg-white border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 rounded-lg bg-white border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <textarea
              placeholder="Type your message..."
              rows="4"
              required
              className="w-full px-4 py-3 rounded-lg bg-white border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            ></textarea>

            <button
              type="submit"
              className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium shadow-md transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right: Contact Info */}
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-full bg-green-100">
              <Mail className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-green-800 font-medium">info@church.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-full bg-green-100">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-green-800 font-medium">+234 800 000 0000</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-full bg-green-100">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-green-800 font-medium">
                123 Church Avenue, Ogbomoso, Nigeria.
              </p>
              <a
                href="#"
                className="text-green-600 text-sm hover:underline font-medium"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="mt-16 border-t border-green-100 pt-6 text-center text-gray-600 text-sm">
        <p>
          © {new Date().getFullYear()} Church Name. All rights reserved. | Built with ❤️ by{" "}
          <a
            href="https://elijah.is-a.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 font-medium hover:underline hover:text-green-800 transition"
          >
            Ejay
          </a>
        </p>
      </div>
    </section>
  );
};

export default ContactUs;