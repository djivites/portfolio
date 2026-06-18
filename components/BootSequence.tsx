"use client";

import { motion } from "framer-motion";

const bootLines = [
  "Loading Profile...",
  "Loading Projects...",
  "Loading Skills...",
  "Loading Research...",
  "Loading Achievements..."
];

type BootSequenceProps = {
  active: boolean;
  onComplete: () => void;
};

export default function BootSequence({ active, onComplete }: BootSequenceProps) {
  if (!active) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="hud-corners absolute bottom-6 left-1/2 z-40 w-[min(92vw,520px)] -translate-x-1/2 border border-cyan-300/30 bg-slate-950/70 p-5 shadow-cyan backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="font-display text-sm uppercase tracking-[0.35em] text-cyan-200">JIVITES OS</p>
        <motion.span
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,.9)]"
        />
      </div>
      <div className="space-y-2 font-mono text-sm text-cyan-100">
        {bootLines.map((line, index) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.45, duration: 0.35 }}
            onAnimationComplete={() => {
              if (index === bootLines.length - 1) {
                window.setTimeout(onComplete, 650);
              }
            }}
            className="flex items-center gap-3"
          >
            <span className="text-emerald-300">&gt;</span>
            {line}
          </motion.p>
        ))}
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.7, ease: "easeInOut" }}
        className="mt-5 h-1 origin-left rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 shadow-cyan"
      />
    </motion.div>
  );
}
