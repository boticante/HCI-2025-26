import { Navigation } from "@components/navigation";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navigation />

      <section className="-mt-6 w-full min-h-screen bg-[#192734]" />
      <section className="w-full min-h-screen bg-[#22303c]" />
      <section className="w-full min-h-screen bg-[#192734]" />
    </main>
  );
}