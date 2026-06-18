"use client";

import { useDrag } from "@use-gesture/react";
import { motion } from "framer-motion";
import { Grip } from "lucide-react";

export type CableSide = "left" | "right";

type CableProps = {
  side: CableSide;
  color: "cyan" | "violet";
  anchor: { x: number; y: number };
  plug: { x: number; y: number };
  label: string;
  keywords: string[];
  disabled: boolean;
  onDrag: (
    side: CableSide,
    point: { x: number; y: number },
    isLast: boolean,
    clientPoint: { x: number; y: number }
  ) => void;
};

export default function Cable({
  side,
  color,
  anchor,
  plug,
  label,
  keywords,
  disabled,
  onDrag
}: CableProps) {
  const isLeft = side === "left";
  const stroke = color === "cyan" ? "#22d3ee" : "#c084fc";
  const glow = color === "cyan" ? "shadow-cyan" : "shadow-violet";
  const sparkColor = color === "cyan" ? "bg-cyan-200" : "bg-fuchsia-200";
  const sparkShadow =
    color === "cyan" ? "shadow-[0_0_16px_rgba(34,211,238,.95)]" : "shadow-[0_0_16px_rgba(217,70,239,.95)]";

  const bind = useDrag(({ xy: [x, y], down, last, event, movement: [mx, my] }) => {
    if (disabled) return;
    if (event) {
      // Prevent movement if the pointer hasn't actually moved (simple click/tap)
      if (down && mx === 0 && my === 0) return;

      const stage = (event.target as HTMLElement).closest("main");
      if (stage) {
        const rect = stage.getBoundingClientRect();
        const scrollX = window.scrollX || window.pageXOffset || 0;
        const scrollY = window.scrollY || window.pageYOffset || 0;

        // Extract raw clientX/clientY from mouse or touch event
        let clientX = x;
        let clientY = y;
        if (event) {
          const touchEvent = event as TouchEvent;
          const mouseEvent = event as MouseEvent;
          if (touchEvent.touches && touchEvent.touches.length > 0) {
            clientX = touchEvent.touches[0].clientX;
            clientY = touchEvent.touches[0].clientY;
          } else if (touchEvent.changedTouches && touchEvent.changedTouches.length > 0) {
            clientX = touchEvent.changedTouches[0].clientX;
            clientY = touchEvent.changedTouches[0].clientY;
          } else if (mouseEvent.clientX !== undefined) {
            clientX = mouseEvent.clientX;
            clientY = mouseEvent.clientY;
          }
        }

        onDrag(
          side,
          {
            x: x - (rect.left + scrollX),
            y: y - (rect.top + scrollY)
          },
          !!last,
          { x: clientX, y: clientY }
        );
      }
    }
  });
  const dragProps = bind() as Record<string, unknown>;
  delete dragProps.onAnimationStart;
  delete dragProps.onAnimationEnd;
  delete dragProps.onAnimationIteration;

  const curve = isLeft
    ? `M ${anchor.x} ${anchor.y} C ${anchor.x - 70} ${anchor.y + 50}, ${plug.x - 140} ${plug.y - 70}, ${plug.x} ${plug.y}`
    : `M ${anchor.x} ${anchor.y} C ${anchor.x + 70} ${anchor.y + 50}, ${plug.x + 140} ${plug.y - 70}, ${plug.x} ${plug.y}`;

  return (
    <>
      <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full">
        <defs>
          <filter id={`glow-${side}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d={curve}
          fill="none"
          stroke={stroke}
          strokeLinecap="round"
          strokeWidth="7"
          filter={`url(#glow-${side})`}
          initial={false}
          animate={{ pathLength: [0.88, 1, 0.92], opacity: [0.78, 1, 0.78] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        <path d={curve} fill="none" stroke="white" strokeLinecap="round" strokeWidth="1.5" opacity="0.65" />
      </svg>

      <div
        className={`absolute z-20 hidden w-48 -translate-y-1/2 ${isLeft ? "text-left" : "text-right"} md:block`}
        style={{
          left: isLeft ? Math.max(32, anchor.x - 340) : anchor.x + 150,
          top: anchor.y - 95
        }}
      >
        <p className={`font-display text-2xl font-bold ${color === "cyan" ? "text-cyan-300" : "text-fuchsia-300"}`}>
          {label}
        </p>
        <div className="mt-2 space-y-1 text-xs uppercase tracking-[0.18em] text-cyan-100/70">
          {keywords.map((keyword) => (
            <p key={keyword}>{keyword}</p>
          ))}
        </div>
      </div>

      <motion.button
        {...dragProps}
        aria-label={`Drag ${label} cable`}
        whileHover={!disabled ? { scale: 1.08 } : undefined}
        whileTap={!disabled ? { scale: 0.94 } : undefined}
        className={`absolute z-30 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 cursor-grab place-items-center rounded-full border bg-slate-950/90 backdrop-blur ${glow} ${
          color === "cyan" ? "border-cyan-200/60 text-cyan-200" : "border-fuchsia-200/60 text-fuchsia-200"
        } ${disabled ? "cursor-default" : "active:cursor-grabbing"}`}
        style={{ left: plug.x, top: plug.y, touchAction: "none" }}
      >
        <motion.span
          animate={{ scale: [1, 1.45, 1], opacity: [0.7, 0.2, 0.7] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="absolute h-28 w-28 rounded-full border border-current/25"
        />
        <span className="absolute h-14 w-14 rounded-full border border-current/50" />
        <Grip className="h-8 w-8" />
      </motion.button>

      {Array.from({ length: 9 }, (_, index) => {
        const direction = isLeft ? -1 : 1;
        const offset = 18 + index * 6;
        return (
          <motion.span
            key={index}
            className={`pointer-events-none absolute z-30 h-1.5 w-5 rounded-full ${sparkColor} ${sparkShadow}`}
            style={{ left: plug.x, top: plug.y }}
            animate={{
              x: [0, direction * (offset + (index % 3) * 12)],
              y: [0, -24 + (index % 5) * 12],
              opacity: [0, 1, 0],
              scale: [0.4, 1, 0.25],
              rotate: direction * (index * 18)
            }}
            transition={{
              duration: 0.9 + (index % 4) * 0.15,
              delay: index * 0.07,
              repeat: Infinity,
              repeatDelay: 0.5
            }}
          />
        );
      })}
    </>
  );
}
