import { Navigation } from "@components/navigation";
import { ContactForm } from "@components/contact-form";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[#192734]">
      <Navigation />

      {/* All content between navbar and footer */}
      <section className="-mt-6 w-full bg-[#192734]">
        <div className="mx-auto w-full max-w-7xl px-6 py-14">
          {/* Page title */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Get in touch with us
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/75">
              Have questions about upcoming sports events or ticket purchases?
              We’re here to help.
            </p>
          </div>

          {/* Main content */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[2fr_1fr]">
            {/* Contact form */}
            <div className="border border-white/10 bg-[#22303c] p-8">
              <h2 className="text-[15px] font-medium text-white/85">
                Contact us
              </h2>

              <ContactForm />
            </div>

            {/* Quick help */}
            <aside className="border border-white/10 bg-[#22303c] p-8">
              <h2 className="text-[15px] font-medium text-white/85">
                Quick help
              </h2>

              <div className="mt-4 space-y-3 text-sm text-white/75">
                <p className="flex items-center gap-2">
                  <FaPhoneAlt className="size-4 text-white/75" />
                  <span>(+385) 01 234 567</span>
                </p>
                <p className="flex items-center gap-2">
                  <FaEnvelope className="size-4 text-white/75" />
                  <span>tickettaka@support.com</span>
                </p>
              </div>

              <h3 className="mt-8 text-[15px] font-medium text-white/85">
                Follow us
              </h3>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  aria-label="Twitter"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <FaTwitter className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <FaFacebook className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <FaInstagram className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <FaLinkedin className="size-5" />
                </button>
              </div>
            </aside>
          </div>

          {/* Privacy note */}
          <div className="mt-12 text-center">
            <p className="text-sm text-white/70">
              We respect your privacy. Your information will only be used to
              respond to your inquiry.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
