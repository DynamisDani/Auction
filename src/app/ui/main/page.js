'use client'
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hexagon } from "lucide-react";
import Header from "../Header/page";
import ProductCard from "../ProductCard/page";
import CategoryFilter from "../CategoryFilter/page";
import LiveBiddingTerminal from "../LiveBiddingTerminal/page";
import Footer from "../Footer/page";

const ThemeSelector = ({ theme, changeTheme }) => {
  const themes = [
    "cyberpunk", "light", "dark", "vibrant", "grey", "orange",
    "retro", "forest", "ocean", "sunset", "neon", "rainbow",
    "aurora", "pastel-dream", "fire", "glitch"
  ];

  return (
    <div className="flex space-x-4 mb-4 flex-wrap">
      {themes.map((t) => (
        <button
          key={t}
          className={`px-4 py-2 rounded ${
            theme === t ? "bg-cyan-500 text-white" : "bg-gray-700 text-cyan-500"
          }`}
          onClick={() => changeTheme(t)}
        >
          {t.charAt(0).toUpperCase() + t.slice(1).replace('-', ' ')}
        </button>
      ))}
    </div>
  );
};

export default function CyberpunkMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [theme, setTheme] = useState("cyberpunk");
  const [scrollY, setScrollY] = useState(0);

  const changeTheme = useCallback((newTheme) => {
    setTheme(newTheme);
    document.documentElement.classList.remove(
      "theme-cyberpunk", "theme-light", "theme-dark", "theme-vibrant",
      "theme-grey", "theme-orange", "theme-retro", "theme-forest",
      "theme-ocean", "theme-sunset", "theme-neon", "theme-rainbow",
      "theme-aurora", "theme-pastel-dream", "theme-fire", "theme-glitch"
    );
    document.documentElement.classList.add(`theme-${newTheme}`);
  }, []);

  useEffect(() => {
    changeTheme(theme);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [changeTheme, theme]);

  const products = [
    {
      id: 1,
      title: "Quantum Neural Implant",
      description: "Boost your cognitive abilities with this next-gen neural interface",
      price: 1299.99,
      currentBid: 1350.0,
      bidders: 7,
      timeLeft: "2h 15m",
      image: "/placeholder.svg?height=300&width=300",
      seller: "NeuroCorp",
      category: "Electronics",
    },
    {
      id: 2,
      title: "Holographic Display Bracelet",
      description: "Project AR interfaces from your wrist with this sleek device",
      price: 499.99,
      currentBid: 520.5,
      bidders: 12,
      timeLeft: "4h 30m",
      image: "/placeholder.svg?height=300&width=300",
      seller: "HoloTech",
      category: "Electronics",
    },
    {
      id: 3,
      title: "Enchanted Cybernetic Jacket",
      description: "Temperature-regulating jacket with embedded LED matrix",
      price: 899.99,
      currentBid: 950.0,
      bidders: 5,
      timeLeft: "1d 3h",
      image: "/placeholder.svg?height=300&width=300",
      seller: "NeoThreads",
      category: "Fashion",
    },
    {
      id: 4,
      title: "Arcane Computing Module",
      description: "Quantum computing power in a mystical crystal housing",
      price: 2499.99,
      currentBid: 2600.0,
      bidders: 9,
      timeLeft: "6h 45m",
      image: "/placeholder.svg?height=300&width=300",
      seller: "QuantumMage",
      category: "Electronics",
    },
    {
      id: 5,
      title: "Neon Rune Makeup Kit",
      description: "UV-reactive makeup for the ultimate cyberpunk aesthetic",
      price: 89.99,
      currentBid: 95.5,
      bidders: 15,
      timeLeft: "5h 20m",
      image: "/placeholder.svg?height=300&width=300",
      seller: "NeonGlow",
      category: "Beauty",
    },
    {
      id: 6,
      title: "Levitating Smart Speaker",
      description: "Floating speaker with immersive 3D sound projection",
      price: 349.99,
      currentBid: 380.0,
      bidders: 11,
      timeLeft: "2d 7h",
      image: "/placeholder.svg?height=300&width=300",
      seller: "SonicFloat",
      category: "Home & Kitchen",
    },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const interval = setInterval(() => {
        const randomProductIndex = Math.floor(Math.random() * products.length);
        const randomBidIncrease = (Math.random() * 10 + 1).toFixed(2);
        console.log(
          `New bid on ${products[randomProductIndex].title}: $${Number.parseFloat(products[randomProductIndex].currentBid) + Number.parseFloat(randomBidIncrease)}`
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [products]);

  const categories = ["All", "Electronics", "Fashion", "Beauty", "Toys", "Home & Kitchen"];

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-cyan-50 overflow-hidden transition-colors duration-500">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black/50 to-blue-900/50 opacity-50 animate-gradient-xy"></div>
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 text-cyan-500/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 0.1,
              }}
            >
              <Hexagon size={64} />
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 40 - 20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-full w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
              style={{
                left: `${(i + 1) * 10}%`,
                opacity: 0.2,
              }}
              animate={{
                scaleY: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-mesh"></div>
      </div>
      <div className="relative z-10">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <main className="container mx-auto px-4 py-8">
          <section className="mb-12">
            <ThemeSelector theme={theme} changeTheme={changeTheme} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center mb-8 text-center"
            >
              <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-2">
                Featured Items
              </h2>
              <p className="text-gray-400 max-w-md">
                Discover the most exclusive digital artifacts from across the grid
              </p>
            </motion.div>
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    hoveredProduct={hoveredProduct}
                    setHoveredProduct={setHoveredProduct}
                  />
                ))}
              </AnimatePresence>
            </div>
          </section>
          <LiveBiddingTerminal />
        </main>
        <Footer />
      </div>
      <style jsx global>{`
        @keyframes gradient-xy {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
          background-size: 400% 400%;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .theme-light .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, #f0f9ff, #e0f2fe, #bae6fd);
        }
        .theme-cyberpunk .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, #500724, #2d00f7, #20015f);
        }
        .theme-dark .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, #0f172a, #1e1b4b, #312e81);
        }
        .theme-vibrant .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, #ff7e5f, #feb47b, #86a8e7, #91eae4);
        }
        .theme-grey .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, #f0f0f0, #dcdcdc, #bababa);
        }
        .theme-orange .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, #ffa500, #ff8c00, #ff751a);
        }
        .theme-retro .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, #ffcc99, #ff99cc, #cc99ff);
        }
        .theme-forest .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, #228b22, #32cd32, #20b2aa);
        }
        .theme-ocean .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, #00ffff, #1e90ff, #0000ff);
        }
        .theme-sunset .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, #ff4500, #ffa500, #ffd700);
        }
        .theme-neon .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, #39ff14, #ff00ff, #1e90ff);
        }
        .theme-rainbow .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #ee82ee);
          animation: rainbow-animation 5s infinite;
        }
        @keyframes rainbow-animation {
          0%, 100% {
            filter: hue-rotate(0deg);
          }
          50% {
            filter: hue-rotate(360deg);
          }
        }
        .theme-aurora .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, #00ff7f, #00ffff, #007fff, #4b0082);
          animation: aurora-animation 10s infinite;
        }
        @keyframes aurora-animation {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.5);
          }
        }
        .theme-pastel-dream .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, #ffb3ba, #ffdfba, #ffffba, #baffc9, #bae1ff);
          animation: pastel-animation 10s infinite;
        }
        @keyframes pastel-animation {
          0%, 100% {
            filter: hue-rotate(0deg);
          }
          50% {
            filter: hue-rotate(360deg);
          }
        }
        .theme-fire .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, #ff4500, #ffa500, #ffd700);
          animation: fire-animation 3s infinite;
        }
        @keyframes fire-animation {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.5);
          }
        }
        .theme-glitch .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, #ff00ff, #00ffff, #00ff00, #ffff00, #ff0000);
          animation: glitch-animation 0.5s infinite;
        }
        @keyframes glitch-animation {
          0%, 100% {
            transform: translate(0);
          }
          25% {
            transform: translate(5px, 5px);
          }
          50% {
            transform: translate(-5px, -5px);
          }
          75% {
            transform: translate(5px, -5px);
          }
        }
        .theme-light .mix-blend-screen {
          mix-blend-mode: multiply;
        }
        .product-card {
          transition: all 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 10px 30px rgba(0, 255, 255, 0.2);
        }
        .product-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #00ffff, #ff00ff);
          z-index: -1;
          filter: blur(10px);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .product-card:hover::before {
          opacity: 1;
        }
        .bg-mesh {
          background-image: repeating-conic-gradient(
            from 0deg,
            #1a1a1a 0% 25%,
            #222222 0% 50%,
            #1a1a1a 0% 75%,
            #222222 0% 100%
          );
          background-size: 20px 20px;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
