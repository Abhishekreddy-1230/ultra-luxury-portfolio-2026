"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

const links = [
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

function MagneticLink({ children, href }: { children: React.ReactNode; href: string }) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = linkRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.4);
      yTo(y * 0.4);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href={href}
      className="relative px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors hover:text-white/70"
    >
      {children}
    </a>
  );
}

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6 backdrop-blur-md bg-black/10 border-b border-white/5">
      <div className="text-xl font-bold tracking-tighter uppercase">
        Studio<span className="font-light opacity-50">Lux</span>
      </div>
      <nav className="flex gap-6">
        {links.map((link) => (
          <MagneticLink key={link.name} href={link.href}>
            {link.name}
          </MagneticLink>
        ))}
      </nav>
    </header>
  );
}
