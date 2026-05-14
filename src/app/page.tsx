"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Loader from "@/components/ui/Loader";
import Header from "@/components/ui/Header";
import Hero3D from "@/components/Hero3D";
import BentoGrid from "@/components/ui/BentoGrid";

export default function Home() {
  const heroWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (heroWrapperRef.current) {
        gsap.to(heroWrapperRef.current, {
          scale: 0.8,
          opacity: 0.3,
          y: "20%",
          ease: "none",
          scrollTrigger: {
            trigger: "#work", // Trigger when bento grid comes into view
            start: "top bottom", // when top of #work hits bottom of viewport
            end: "top center", // when top of #work hits center of viewport
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <Loader />
      <main className="relative min-h-screen text-white selection:bg-white selection:text-black font-sans" style={{ isolation: 'isolate' }}>
        <Header />

        {/* Fixed Background Hero wrapper that scales/moves on scroll */}
        <div ref={heroWrapperRef} className="fixed inset-0 pointer-events-none -z-10 origin-top">
          <Hero3D />
        </div>

        {/* Hero Content Section */}
        <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 text-center pointer-events-none">
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter mix-blend-difference mb-6">
            Digital <span className="font-serif italic font-medium">Luxury</span>
          </h1>
          <p className="text-lg md:text-xl font-light text-white/70 max-w-xl mx-auto mix-blend-difference">
            We craft immersive, high-performance web experiences that blur the line between code and art.
          </p>
        </section>

        {/* Work / Bento Section */}
        <BentoGrid />

        {/* Footer spacer */}
        <section className="h-[50vh] flex items-center justify-center border-t border-white/5 mt-32">
          <p className="text-sm font-medium tracking-widest uppercase text-white/30">
            Studio Lux © 2026
          </p>
        </section>
      </main>
    </SmoothScroll>
  );
}
