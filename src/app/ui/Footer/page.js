'use client'
import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t border-cyan-900/50 backdrop-blur-md bg-black/40 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-cyan-300 mb-4">
              NEON<span className="text-cyan-400">NEXUS</span>
            </h3>
            <p className="text-gray-400 text-sm">
              The future of digital marketplace, where technology meets magic in a cyberpunk realm.
            </p>
          </div>
          <div>
            <h3 className="text-md font-bold text-cyan-300 mb-4">Marketplace</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">
                  Featured Items
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-bold text-cyan-300 mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">
                  My Bids
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">
                  Watchlist
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-bold text-cyan-300 mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">
                  Discord Community
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-cyan-900/30 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} NeonNexus Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
