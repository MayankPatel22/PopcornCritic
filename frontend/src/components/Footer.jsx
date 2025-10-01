import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 pt-5 pb-5 mt-10">
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
        <div>
          <img className="h-10 w-25" src={assets.logo} alt="" />
          <p className="text-gray-500 text-sm leading-relaxed mt-2">
            Dive into honest movie reviews, find hidden gems, and share your
            love for cinema with us! 🎬✨
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li className="hover:text-sky-700 transition-colors">
              <a href="/">Home</a>
            </li>
            <li className="hover:text-sky-700 transition-colors">
              <a href="/top-movies">Top Movies</a>
            </li>
            <li className="hover:text-sky-700 transition-colors">
              <a href="/genres">Genres</a>
            </li>
            <li className="hover:text-sky-700 transition-colors">
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-3">
            <a href="#" className="hover:text-sky-700">
              🐦 Twitter
            </a>
            <a href="#" className="hover:text-sky-700">
              📘 Facebook
            </a>
            <a href="#" className="hover:text-sky-700">
              📸 Instagram
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            ✉️ Email: support@popcorncritics.com
            <br />
            📍 Location: Mumbai, India
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-400 pt-5 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Popcorn Critics. All Rights Reserved.
        🍿🎬
      </div>
    </footer>
  );
};

export default Footer;
