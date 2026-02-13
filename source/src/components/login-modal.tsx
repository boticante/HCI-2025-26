"use client";

import { useEffect, useRef } from "react";
import { LoginForm } from "@/components/login-form";

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
};

export function LoginModal({ open, onClose }: LoginModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    // Focus the dialog panel for accessibility.
    queueMicrotask(() => panelRef.current?.focus());

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center modal-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Sign in"
      onMouseDown={(e) => {
        if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-lg px-4 sm:px-6 modal-panel-animate"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-6 sm:top-3 sm:right-10 rounded-none p-1.5 text-white/70 hover:text-white focus:outline-none"
          aria-label="Close sign in dialog"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>

        <LoginForm />
      </div>
    </div>
  );
}
