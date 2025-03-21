'use client'
import { motion } from "framer-motion";

function LiveBiddingTerminal() {
  return (
    <section className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center justify-center mb-8 text-center"
      >
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-2">
          Live Bidding Terminal
        </h2>
        <p className="text-gray-400 max-w-md">Watch real-time transactions happening across the marketplace</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gray-900 border-2 border-cyan-500/30 rounded-xl p-4 font-mono text-sm"
      >
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <div className="text-cyan-500 text-xs">bid_terminal@neon_nexus:~</div>
        </div>
        <div className="h-32 overflow-y-auto space-y-1 terminal-text">
          <p className="text-green-500">
            {">"} <span className="text-cyan-300">User_CyberMage</span> placed bid on{" "}
            <span className="text-purple-400">Quantum Neural Implant</span>:{" "}
            <span className="text-yellow-300">$1,355.00</span>
          </p>
          <p className="text-green-500">
            {">"} <span className="text-cyan-300">NeonRider</span> placed bid on{" "}
            <span className="text-purple-400">Holographic Display Bracelet</span>:{" "}
            <span className="text-yellow-300">$525.75</span>
          </p>
          <p className="text-green-500">
            {">"} <span className="text-cyan-300">DigitalSpecter</span> purchased{" "}
            <span className="text-purple-400">Neon Rune Makeup Kit</span> for{" "}
            <span className="text-yellow-300">$89.99</span>
          </p>
        </div>
        <div className="flex items-center mt-2">
          <span className="text-cyan-500">{">"}</span>
          <div className="ml-2 flex-1 relative">
            <input
              type="text"
              placeholder="Enter bid command..."
              className="w-full bg-transparent border-b border-cyan-500/50 focus:outline-none focus:border-cyan-500 py-1 text-cyan-100 placeholder-cyan-700"
            />
            <motion.span
              className="absolute bottom-0 left-0 h-[1px] bg-cyan-500"
              initial={{ width: "0%" }}
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default LiveBiddingTerminal;
