"use client";

import { motion } from "framer-motion";

type EnergyBurstProps = {
  active: boolean;
  point: { x: number; y: number };
};

const sparksCount = 45;
const sparks = Array.from({ length: sparksCount }, (_, index) => {
  // Distribute angles evenly with some randomness
  const angle = (Math.PI * 2 * index) / sparksCount + (Math.random() * 0.3 - 0.15);
  // Spread distance out further (up to 400px)
  const distance = 140 + (index % 8) * 35 + Math.random() * 30;
  // Varied sizes for rich particle texture
  let size = "h-1.5 w-6";
  if (index % 3 === 0) size = "h-2 w-10";
  else if (index % 5 === 0) size = "h-2.5 w-12";
  else if (index % 2 === 0) size = "h-1 w-4";

  // Cycle through high-energy colors with small, highly-optimized glow shadows
  let color = "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.75)]";
  if (index % 4 === 0) {
    color = "bg-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.75)]";
  } else if (index % 4 === 1) {
    color = "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.75)]";
  } else if (index % 4 === 2) {
    color = "bg-white shadow-[0_0_10px_rgba(255,255,255,0.85)]";
  }

  return {
    id: index,
    angle,
    distance,
    size,
    delay: (index % 6) * 0.02 + Math.random() * 0.05,
    color,
  };
});

export default function EnergyBurst({ active, point }: EnergyBurstProps) {
  if (!active) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      {/* 1. Core White Explosion Flash (Radial Gradient replacing blur + shadow) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.05 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.05, 2.5, 4.5, 6.0] }}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="absolute h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
        style={{
          left: point.x,
          top: point.y,
          background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 25%, rgba(255,255,255,0) 70%)"
        }}
      />

      {/* 2. Secondary Expanding Cyan/Blue Energy Pulse (Radial Gradient replacing blur + shadow) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: [0, 0.95, 0.5, 0], scale: [0.1, 3.2, 5.0, 7.5] }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.05 }}
        className="absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
        style={{
          left: point.x,
          top: point.y,
          background: "radial-gradient(circle, rgba(34,211,238,0.95) 0%, rgba(34,211,238,0.4) 40%, rgba(34,211,238,0) 70%)"
        }}
      />

      {/* 3. Massive Purple/Fuchsia Outer Aura (Radial Gradient replacing blur + shadow) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: [0, 1, 0.8, 0], scale: [0.1, 6.0, 11.0, 15.0] }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
        style={{
          left: point.x,
          top: point.y,
          background: "radial-gradient(circle, rgba(217,70,239,0.8) 0%, rgba(168,85,247,0.35) 45%, rgba(6,182,212,0) 70%)"
        }}
      />

      {/* 4. Hyper-expanding glowing ring 1 (Lighter optimized style) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.1, borderWidth: "8px" }}
        animate={{ opacity: [0, 1, 0], scale: [0.1, 4.5, 8.5], borderWidth: ["8px", "2px", "0px"] }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/40 will-change-transform"
        style={{ left: point.x, top: point.y }}
      />

      {/* 5. Hyper-expanding glowing ring 2 (Lighter optimized style) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.05, borderWidth: "10px" }}
        animate={{ opacity: [0, 0.8, 0], scale: [0.05, 3.8, 7.8], borderWidth: ["10px", "1px", "0px"] }}
        transition={{ duration: 1.3, ease: "easeOut", delay: 0.1 }}
        className="absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-400/30 will-change-transform"
        style={{ left: point.x, top: point.y }}
      />

      {/* 6. Sparks radiating outwards (With hardware acceleration prompt) */}
      {sparks.map((spark) => (
        <motion.span
          key={spark.id}
          initial={{ opacity: 1, x: point.x, y: point.y, scale: 1.8, rotate: (spark.angle * 180) / Math.PI }}
          animate={{
            opacity: [1, 1, 0],
            x: point.x + Math.cos(spark.angle) * spark.distance,
            y: point.y + Math.sin(spark.angle) * spark.distance,
            scale: [1.8, 1.2, 0.1]
          }}
          transition={{ duration: 1.1, delay: spark.delay, ease: "easeOut" }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform ${spark.size} ${spark.color}`}
          style={{ originX: 0 }}
        />
      ))}
    </div>
  );
}
