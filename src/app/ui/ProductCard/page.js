'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import { Zap } from "lucide-react";

function ProductCard({ product, hoveredProduct, setHoveredProduct }) {
  // Check if product is defined and has the necessary properties
  if (!product || !product.id || !product.title || !product.price || !product.currentBid) {
    console.error("Product data is missing or invalid:", product);
    return <div>Invalid product data</div>;  // Return a fallback UI
  }

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: product.id * 0.1 }}
      className="relative"
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      <div className="relative group rounded-xl overflow-hidden h-full product-card bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-cyan-500/30">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={300}
            height={300}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full border border-cyan-500/30 text-xs text-cyan-300 flex items-center">
            <Zap size={12} className="mr-1 text-cyan-400" />
            {product.timeLeft}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1 text-cyan-300">{product.title}</h3>
          <p className="text-xs text-gray-400 mb-3 line-clamp-2">{product.description || "No description available"}</p>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs text-gray-500 mb-1">Buy Now</div>
              <div className="text-lg font-bold text-cyan-400">${product.price.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Current Bid</div>
              <div className="text-lg font-bold text-purple-400">
                <motion.span
                  key={`bid-${product.id}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block"
                >
                  ${product.currentBid.toFixed(2)}
                </motion.span>
              </div>
              <div className="text-xs text-gray-500">{product.bidders} bidders</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm font-medium transition-colors text-white">
              Buy Now
            </button>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors text-white">
              Place Bid
            </button>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">
            {product.seller.charAt(0)}
          </div>
          <span className="ml-1 text-xs text-gray-400">{product.seller}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
