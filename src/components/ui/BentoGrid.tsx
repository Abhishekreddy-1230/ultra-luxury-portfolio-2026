"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const gridItems = [
  { id: 1, title: "Creative Strategy", size: "md:col-span-2 md:row-span-2", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, title: "WebGL Development", size: "md:col-span-1 md:row-span-1", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" },
  { id: 3, title: "Motion Design", size: "md:col-span-1 md:row-span-1", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" },
  { id: 4, title: "Brand Identity", size: "md:col-span-2 md:row-span-1", img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop" },
];

function BentoItem({ item }: { item: typeof gridItems[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -10; // Max tilt 10deg
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
      style={{ perspective: 1000 }}
      className={`relative rounded-3xl overflow-hidden group cursor-pointer border border-white/10 bg-white/5 ${item.size} h-64 md:h-auto`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-50 group-hover:opacity-70"
        style={{ backgroundImage: `url(${item.img})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8">
        <h3 className="text-2xl font-medium tracking-tight text-white">{item.title}</h3>
      </div>
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <section id="work" className="relative z-10 w-full max-w-7xl mx-auto px-8 py-32">
      <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-16">
        Selected <span className="font-serif italic">Works</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-6">
        {gridItems.map((item) => (
          <BentoItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
