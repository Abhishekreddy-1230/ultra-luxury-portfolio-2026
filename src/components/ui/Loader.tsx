"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Because Hero3D uses raw three.js without react-three/fiber's suspense,
    // the progress from @react-three/drei might not trigger properly or stays 0.
    // We add a fallback to ensure it eventually fades out.
    if (!active && progress === 100) {
      const timeout = setTimeout(() => setVisible(false), 800); // Slight delay for elegance
      return () => clearTimeout(timeout);
    }

    // Fallback since the page does not currently have any r3f Canvas elements with heavy loading
    const fallbackTimeout = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => clearTimeout(fallbackTimeout);
  }, [active, progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white pointer-events-none"
        >
          <div className="text-6xl font-light tracking-tighter tabular-nums">
            {Math.round(progress)}%
          </div>
          <div className="mt-4 w-48 h-[1px] bg-white/20 overflow-hidden relative">
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
