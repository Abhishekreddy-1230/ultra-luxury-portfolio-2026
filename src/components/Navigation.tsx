"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 w-full p-8 z-[9000] mix-blend-difference pointer-events-none">
      <div className="flex justify-between items-center w-full pointer-events-auto text-white">
        <Link href="/" className="text-xl font-bold tracking-tighter" data-magnetic>
          STUDIO.
        </Link>
        <div className="flex gap-8 text-sm uppercase tracking-widest font-medium">
          <Link href="/work" className="hover:opacity-70 transition-opacity" data-magnetic>Work</Link>
          <Link href="/about" className="hover:opacity-70 transition-opacity" data-magnetic>About</Link>
          <Link href="/contact" className="hover:opacity-70 transition-opacity" data-magnetic>Contact</Link>
        </div>
      </div>
    </nav>
  );
}
