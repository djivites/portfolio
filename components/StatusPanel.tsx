"use client";

import { motion } from "framer-motion";

type StatusPanelProps = {
  online: boolean;
};

export default function StatusPanel({ online }: StatusPanelProps) {
  return (
    <>
      {/* Status Panel (Top Left) */}
      <motion.aside
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute left-6 top-6 z-30 w-44 border border-cyan-500/20 bg-slate-950/60 p-4 font-display backdrop-blur-md"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-cyan-400/70">Status</span>
        <h2
          className={`mt-1 text-xl font-bold uppercase tracking-wider transition-all duration-500 ${
            online
              ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]"
              : "text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.7)]"
          }`}
        >
          {online ? "ONLINE" : "OFFLINE"}
        </h2>
        <div className="mt-3 flex gap-1">
          {Array.from({ length: 10 }, (_, index) => {
            const isLit = online || index < 3;
            const barColor = online
              ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
              : index < 3
              ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"
              : "bg-slate-800";
            return (
              <span
                key={index}
                className={`h-3.5 w-1.5 rounded-sm transition-all duration-500 ${barColor}`}
              />
            );
          })}
        </div>
      </motion.aside>

      {/* Power Panel (Top Right) */}
      <motion.aside
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        className="absolute right-6 top-6 z-30 w-44 border border-cyan-500/20 bg-slate-950/60 p-4 font-display backdrop-blur-md"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
        }}
      >
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-[0.25em] text-cyan-400/70">Power</span>
          <h2
            className={`mt-1 text-xl font-bold uppercase tracking-wider transition-all duration-500 ${
              online
                ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                : "text-rose-500/60"
            }`}
          >
            {online ? "100%" : "0%"}
          </h2>
          <div className="mt-3 flex justify-end gap-1">
            {Array.from({ length: 10 }, (_, index) => {
              const isLit = online;
              const barColor = online
                ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                : "bg-slate-800";
              return (
                <span
                  key={index}
                  className={`h-3.5 w-1.5 rounded-sm transition-all duration-500 ${barColor}`}
                />
              );
            })}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
