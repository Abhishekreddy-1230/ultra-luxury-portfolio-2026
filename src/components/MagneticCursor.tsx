"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      // Find closest interactive element
      const interactables = document.querySelectorAll(
        "a, button, input, textarea, [data-magnetic]"
      );

      let isMagnetic = false;
      let targetX = e.clientX;
      let targetY = e.clientY;
      let scale = 1;

      interactables.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Magnet radius
        const margin = 20;

        if (
          e.clientX > rect.left - margin &&
          e.clientX < rect.right + margin &&
          e.clientY > rect.top - margin &&
          e.clientY < rect.bottom + margin
        ) {
          isMagnetic = true;
          // Calculate center of element
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          // Pull effect - move cursor towards center based on distance
          const pullFactor = 0.6; // How strong the magnet is
          targetX = e.clientX + (centerX - e.clientX) * pullFactor;
          targetY = e.clientY + (centerY - e.clientY) * pullFactor;
          scale = 2; // Enlarge cursor
        }
      });

      // Animate the cursor position with a 0.2s lag for premium feel
      gsap.to(cursor, {
        x: targetX,
        y: targetY,
        scale: scale, xPercent: -50, yPercent: -50,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto"
      });

      if (isMagnetic) {
         gsap.to(cursor, {
            backgroundColor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            duration: 0.2
         });
      } else {
         gsap.to(cursor, {
            backgroundColor: "white",
            border: "none",
            duration: 0.2
         });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-opacity duration-300"
      style={{
        willChange: "transform",
      }}
    />
  );
}
