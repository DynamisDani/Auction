'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";

const fonts = ["sans-serif", "serif", "monospace", "cursive", "fantasy", "Arial", "Georgia", "Verdana", "Tahoma", "Courier New"];

const themes = {
  neon: "bg-gray-900 text-cyan-300 border-cyan-500",
  aurora: "bg-gradient-to-r from-green-400 to-blue-500 text-white border-blue-500",
  rain: "bg-gradient-to-r from-blue-400 to-purple-600 text-white border-purple-500",
  earthy: "bg-gradient-to-r from-yellow-400 to-orange-600 text-gray-900 border-yellow-500",
  ocean: "bg-gradient-to-r from-cyan-500 to-blue-800 text-white border-cyan-700",
  sunset: "bg-gradient-to-r from-pink-500 to-red-600 text-white border-pink-500",
  forest: "bg-gradient-to-r from-green-600 to-teal-500 text-white border-green-700",
  midnight: "bg-gradient-to-r from-gray-800 to-black text-white border-gray-700",
  pastel: "bg-gradient-to-r from-pink-200 to-blue-200 text-gray-900 border-pink-300",
  fire: "bg-gradient-to-r from-red-600 to-orange-500 text-white border-red-700"
};

function Header({ searchQuery, setSearchQuery, mobileMenuOpen, setMobileMenuOpen }) {
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [selectedTheme, setSelectedTheme] = useState("neon");
  const [logoColor, setLogoColor] = useState("#00ffff");

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 backdrop-blur-md border-b py-4 transition-all duration-300 ${themes[selectedTheme]}`}
      style={{ fontFamily: selectedFont }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold"
        >
          <span style={{ color: logoColor }}>NEON</span>
          <span className="text-cyan-400">NEXUS</span>
        </motion.div>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-4">
            {["Home", "Marketplace", "Auctions", "Community"].map((item) => (
              <Link key={item} href="#" className="hover:opacity-80 transition-colors">{item}</Link>
            ))}
          </nav>

          <div className="relative">
            <input
              type="text"
              placeholder="Search the marketplace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 py-2 px-4 pl-10 bg-gray-900/50 border rounded-full focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>

          <div className="flex space-x-2">
            <ShoppingCart size={20} className="cursor-pointer" />
            <User size={20} className="cursor-pointer" />
          </div>
        </div>
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex justify-center space-x-4 mt-2">
        <div className="flex items-center">
          <label className="text-sm mr-2">Font:</label>
          <select
            className="p-2 border rounded bg-white text-gray-900"
            onChange={(e) => setSelectedFont(e.target.value)}
            value={selectedFont}
          >
            {fonts.map((font) => (
              <option key={font} value={font} className="text-gray-900">{font}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="text-sm mr-2">Theme:</label>
          <select
            className="p-2 border rounded bg-white text-gray-900"
            onChange={(e) => setSelectedTheme(e.target.value)}
            value={selectedTheme}
          >
            {Object.keys(themes).map((theme) => (
              <option key={theme} value={theme} className="text-gray-900">{theme}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="text-sm mr-2">Logo Color:</label>
          <input
            type="color"
            value={logoColor}
            onChange={(e) => setLogoColor(e.target.value)}
            className="p-1 border rounded"
          />
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
