"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import React from "react";

interface RevealTextProps {
  text: string;
  delay?: number;
  className?: string;
  element?: React.ElementType;
}

export default function RevealText({
  text,
  delay = 0,
  className = "",
  element: Element = "div"
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Split text into lines (simplistic splitting by <br/> or naturally by CSS later)
    // For this bespoke effect, we'll wrap the whole text in a hidden overflow container
    // and slide an inner container up.

    const lines = containerRef.current.querySelectorAll('.reveal-line-inner');

    gsap.fromTo(
      lines,
      {
        y: "100%",
        rotate: 5,
        opacity: 0
      },
      {
        y: "0%",
        rotate: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: delay,
      }
    );
  }, [delay]);

  // Handle multi-line text by splitting on newline if provided
  const lines = text.split('\n');

  return (
    <Element className={className} ref={containerRef}>
      {lines.map((line, index) => (
        <div
          key={index}
          className="overflow-hidden inline-block w-full leading-tight py-1"
        >
          <span className="reveal-line-inner inline-block w-full origin-left transform-gpu">
            {line}
          </span>
        </div>
      ))}
    </Element>
  );
}
