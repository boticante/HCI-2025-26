"use client";

import { useState, useRef, useEffect } from "react";
import { sendContactEmail } from "@/app/actions/contact";
import { FaChevronDown } from "react-icons/fa";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const subjectRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "Event information",
    message: "",
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        subjectRef.current &&
        !subjectRef.current.contains(event.target as Node)
      ) {
        setIsSubjectOpen(false);
      }
    };

    if (isSubjectOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSubjectOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text: result.message || "Message sent successfully!",
        });
        setFormData({
          fullName: "",
          email: "",
          subject: "Event information",
          message: "",
        });
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      {message && (
        <div
          className={
            message.type === "success"
              ? "mt-3 text-sm text-emerald-300 text-center"
              : "mt-3 rounded border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 text-center"
          }
        >
          {message.text}
        </div>
      )}

      <label className="block">
        <span className="text-sm font-medium text-white/70">Full name</span>
        <input
          type="text"
          name="fullName"
          placeholder="Enter your name"
          required
          value={formData.fullName}
          onChange={handleInputChange}
          disabled={isLoading}
          className="mt-2 w-full rounded-none border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/25 disabled:opacity-50"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-white/70">Email address</span>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          value={formData.email}
          onChange={handleInputChange}
          disabled={isLoading}
          className="mt-2 w-full rounded-none border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/25 disabled:opacity-50"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-white/70">Subject</span>
        <div className="relative mt-2" ref={subjectRef}>
          <button
            type="button"
            onClick={() => setIsSubjectOpen(!isSubjectOpen)}
            disabled={isLoading}
            className="w-full flex items-center justify-between gap-2 rounded-none border border-white/15 bg-white/5 px-4 py-3 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/25 transition-colors disabled:opacity-50"
            aria-haspopup="listbox"
            aria-expanded={isSubjectOpen}
            aria-controls="contact-subject-list"
          >
            <span>{formData.subject}</span>
            <FaChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${
                isSubjectOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSubjectOpen && (
            <div
              className="absolute left-0 right-0 mt-2 w-full bg-[#15202b] border border-white/15 rounded-none shadow-2xl ring-1 ring-white/10 z-50 dropdown-animate"
              id="contact-subject-list"
              role="listbox"
            >
              <div className="py-1">
                {[
                  "Event information",
                  "Ticket purchase",
                  "Technical issue",
                  "Partnership / event listing",
                  "General inquiry",
                ].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setFormData((prev) => ({ ...prev, subject: option }));
                      setIsSubjectOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      formData.subject === option
                        ? "bg-white/10 text-white"
                        : "text-white/90 hover:bg-white/5"
                    }`}
                    role="option"
                    aria-selected={formData.subject === option}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-white/70">Message</span>
        <textarea
          name="message"
          rows={5}
          placeholder="Write your message here..."
          required
          value={formData.message}
          onChange={handleInputChange}
          disabled={isLoading}
          className="mt-2 w-full resize-y rounded-none border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/25 disabled:opacity-50"
        />
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-none bg-white/10 px-4 py-3 font-semibold text-white transition-colors hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
