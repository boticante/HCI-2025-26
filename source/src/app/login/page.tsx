import { Navigation } from "@components/navigation";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navigation />

      <div className="container mx-auto px-6 py-20">
        <LoginForm />
      </div>
    </main>
  );
}
