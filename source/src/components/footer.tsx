import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { SiX } from "react-icons/si";
import Link from "next/link";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="bg-[#15202b] text-white py-12">
      <div className="container mx-auto px-6">
        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-x-12 items-start mb-8">
          <div className="flex h-full flex-col">
            <div>
              <h4 className="text-white mb-3">Contact us</h4>
              <div className="flex flex-col gap-2 text-white/75 text-sm">
                <div className="mt-2 flex items-center gap-2">
                  <FaPhoneAlt className="size-4 text-white/75" />
                  <span>(+385) 01 234 567</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="size-4 text-white/75" />
                  <span>tickettaka@support.com</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <SiX className="size-4" />
              </button>
              <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <FaFacebook className="size-4" />
              </button>
              <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <FaInstagram className="size-4" />
              </button>
              <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <FaLinkedin className="size-4" />
              </button>
              <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <FaYoutube className="size-4" />
              </button>
              <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <FaTiktok className="size-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-start">
            <button
              onClick={scrollToTop}
              className="hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="Scroll to top"
            >
              <img
                src="/images/logo.png"
                alt="Ticket-taka logo"
                className="h-14 w-auto mb-3"
                loading="lazy"
                decoding="async"
              />
            </button>
          </div>

          <div className="justify-self-end text-right">
            <h4 className="text-white mb-3">Sitemap</h4>
            <div className="flex flex-col gap-2 text-white/75 text-sm">
              <Link className="hover:text-white transition-colors" href="/">
                Home
              </Link>
              <Link className="hover:text-white transition-colors" href="/events">
                Events
              </Link>
              <Link className="hover:text-white transition-colors" href="/reviews">
                Reviews
              </Link>
              <Link className="hover:text-white transition-colors" href="/about">
                About Us
              </Link>
              <Link className="hover:text-white transition-colors" href="/contact">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden mb-8">
          <div className="text-center mb-6">
          </div>

          <div className="grid grid-cols-1 gap-x-8 mb-6">
            <div className="text-center">
              <h4 className="text-white mb-3">Sitemap</h4>
              <div className="flex flex-col gap-2 text-white/75 text-sm">
                <Link className="hover:text-white transition-colors" href="/">
                  Home
                </Link>
                <Link className="hover:text-white transition-colors" href="/events">
                  Events
                </Link>
                <Link className="hover:text-white transition-colors" href="/reviews">
                  Reviews
                </Link>
                <Link className="hover:text-white transition-colors" href="/about">
                  About Us
                </Link>
                <Link className="hover:text-white transition-colors" href="/contact">
                  Contact
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h4 className="text-white mb-3">Contact Us</h4>
            <div className="flex flex-col gap-2 text-white/75 text-sm">
              <div className="mt-2 flex items-center justify-center gap-2">
                <FaPhoneAlt className="size-4 text-white/75" />
                <span>(+385) 01 234 567</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FaEnvelope className="size-4 text-white/75" />
                <span>tickettaka@support.com</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3 justify-center">
            <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <SiX className="size-5" />
            </button>
            <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <FaFacebook className="size-5" />
            </button>
            <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <FaInstagram className="size-5" />
            </button>
            <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <FaLinkedin className="size-5" />
            </button>
            <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <FaYoutube className="size-5" />
            </button>
            <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <FaTiktok className="size-5" />
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-sm text-white/60">
          <p>&copy; 2026 Ticket-taka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}