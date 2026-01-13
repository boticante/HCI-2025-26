import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-6">
        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-x-12 mb-8">
          <div className="flex h-full flex-col">
            <div>
              <h4 className="text-white mb-3">Contact Us</h4>
              <div className="flex flex-col gap-2 text-slate-300 text-sm">
                <span>Ul. Ruđera Boškovića 32, 21000</span>
                <span>Split, Croatia</span>

                <div className="mt-2 flex items-center gap-2">
                  <FaPhoneAlt className="size-4 text-slate-300" />
                  <span>(+385) 021 234 567</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="size-4 text-slate-300" />
                  <span>tickettaka@support.com</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <FaFacebook className="size-4" />
              </button>
              <button className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <FaTwitter className="size-4" />
              </button>
              <button className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <FaLinkedin className="size-4" />
              </button>
              <button className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <FaInstagram className="size-4" />
              </button>
            </div>
          </div>

          <div className="justify-self-end text-right">
            <h4 className="text-white mb-3">Sitemap</h4>
            <div className="flex flex-col gap-2 text-slate-300 text-sm">
              <Link className="hover:text-white transition-colors" href="/">
                Home
              </Link>
              <Link className="hover:text-white transition-colors" href="/events">
                Events
              </Link>
              <Link className="hover:text-white transition-colors" href="/about">
                About Us
              </Link>
              <Link className="hover:text-white transition-colors" href="/contact">
                Contact
              </Link>
              <Link className="hover:text-white transition-colors" href="/reviews">
                Reviews
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden mb-8">
          <div className="text-center mb-6">
          </div>

          <div className="grid grid-cols-1 gap-x-8 mb-6">
            <div>
              <h4 className="text-white mb-3">Sitemap</h4>
              <div className="flex flex-col gap-2 text-slate-300 text-sm">
                <Link className="hover:text-white transition-colors" href="/">
                  Home
                </Link>
                <Link className="hover:text-white transition-colors" href="/events">
                  Events
                </Link>
                <Link className="hover:text-white transition-colors" href="/about">
                  About Us
                </Link>
                <Link className="hover:text-white transition-colors" href="/contact">
                  Contact
                </Link>
                <Link className="hover:text-white transition-colors" href="/reviews">
                  Reviews
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h4 className="text-white mb-3">Contact Us</h4>
            <div className="flex flex-col gap-2 text-slate-300 text-sm">
              <span>Ul. Ruđera Boškovića 32, 21000</span>
              <span>Split, Croatia</span>

              <div className="mt-2 flex items-center justify-center gap-2">
                <FaPhoneAlt className="size-4 text-slate-300" />
                <span>(+385) 021 234 567</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FaEnvelope className="size-4 text-slate-300" />
                <span>tickettaka@support.com</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3 justify-center">
            <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
              <FaFacebook className="size-5" />
            </button>
            <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
              <FaTwitter className="size-5" />
            </button>
            <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
              <FaLinkedin className="size-5" />
            </button>
            <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
              <FaInstagram className="size-5" />
            </button>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-center text-sm text-slate-400">
          <p>&copy; 2026 Ticket-taka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}