import AnimatedElement from "@/components/AnimatedElement";
import SceneWrapper from "@/components/SceneWrapper";

export const metadata = {
  title: "Ultra Luxury Portfolio 2026",
  description: "Cinematic performance-driven experience",
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white selection:bg-white/30">
      <SceneWrapper />
      <AnimatedElement />
    </main>
  );
}
