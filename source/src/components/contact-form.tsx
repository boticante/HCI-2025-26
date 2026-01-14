"use client";

import { useState } from "react";
import { sendContactEmail } from "@/app/actions/contact";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
        // Reset form
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
          className={`rounded border px-4 py-3 text-sm ${
            message.type === "success"
              ? "border-green-500/30 bg-green-500/10 text-green-400"
              : "border-red-500/30 bg-red-500/10 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <label className="block">
        <span className="text-sm font-medium text-white/70">Full name</span>
        <input
          type="text"
          name="fullName"
          placeholder="Your name"
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
        <select
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          disabled={isLoading}
          className="mt-2 w-full rounded-none border border-white/15 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/25 disabled:opacity-50"
        >
          <option className="bg-[#15202b]">Event information</option>
          <option className="bg-[#15202b]">Ticket purchase</option>
          <option className="bg-[#15202b]">Technical issue</option>
          <option className="bg-[#15202b]">Partnership / event listing</option>
          <option className="bg-[#15202b]">General inquiry</option>
        </select>
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
