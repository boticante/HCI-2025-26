"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { LoginModal } from "@/components/login-modal";

interface LoginModalContextType {
  openLogin: () => void;
  closeLogin: () => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(
  undefined,
);

export function LoginModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openLogin = () => setIsOpen(true);
  const closeLogin = () => setIsOpen(false);

  return (
    <LoginModalContext.Provider value={{ openLogin, closeLogin }}>
      {children}
      <LoginModal open={isOpen} onClose={closeLogin} />
    </LoginModalContext.Provider>
  );
}

export function useLoginModal() {
  const ctx = useContext(LoginModalContext);
  if (!ctx) {
    throw new Error("useLoginModal must be used within a LoginModalProvider");
  }
  return ctx;
}
