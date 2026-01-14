import { Navigation } from "@components/navigation";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-[#192734] pb-12">
      <Navigation />

      <div className="container mx-auto px-6 py-20">
        <LoginForm />
      </div>
    </main>
  );
}
