"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedElement() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.5 }
      );
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen z-10 relative pointer-events-none p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: [0.25, 1, 0.5, 1], // Equivalent to Power4.out
        }}
        className="backdrop-blur-md bg-white/10 p-12 rounded-2xl border border-white/20 shadow-2xl"
      >
        <h1
          ref={textRef}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
        >
          ULTRA LUXURY
        </h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.8,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="mt-6 text-xl text-neutral-300 max-w-md text-center"
        >
          Experience cinematic motion and bespoke rendering techniques.
        </motion.p>
      </motion.div>
    </div>
  );
}
