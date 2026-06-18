"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BrainCircuit, CircuitBoard, MousePointer2, Sparkles, Zap } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Cable from "./Cable";
import EnergyBurst from "./EnergyBurst";
import StatusPanel from "./StatusPanel";

type Point = { x: number; y: number };

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

const particles = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: 6 + ((index * 17) % 88),
  top: 10 + ((index * 23) % 78),
  size: 2 + (index % 3),
  delay: (index % 9) * 0.18,
  color: index % 3 === 0 ? "bg-fuchsia-300" : "bg-cyan-300"
}));

export default function Hero() {
  const router = useRouter();
  const stageRef = useRef<HTMLDivElement>(null);
  const reactorRef = useRef<HTMLDivElement>(null);

  // Coordinates in stageRef space
  const [logicPortPos, setLogicPortPos] = useState<Point>({ x: 160, y: 360 });
  const [aiCorePos, setAiCorePos] = useState<Point>({ x: 640, y: 360 });
  const [leftHandPos, setLeftHandPos] = useState<Point>({ x: 460, y: 400 });
  const [plug, setPlug] = useState<Point>({ x: 460, y: 400 });

  const [connected, setConnected] = useState(false);
  const [booting, setBooting] = useState(false);
  const [portfolioRevealed, setPortfolioRevealed] = useState(false);
  const [phase, setPhase] = useState(0); // 0: Offline, 1: Dragging, 2: Powering Up (Snap), 3: System Online, 4: Portfolio Revealed
  const [shake, setShake] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [positionsLoaded, setPositionsLoaded] = useState(false);

  // Update element coordinates relative to stage
  const updatePositions = useCallback(() => {
    const stageRect = stageRef.current?.getBoundingClientRect();
    if (!stageRect) return;

    const logicPortEl = document.getElementById("logic-port-anchor");
    const aiCoreEl = document.getElementById("ai-core-anchor");

    let lX = stageRect.width * 0.16;
    let lY = stageRect.height * 0.5;
    let aX = stageRect.width * 0.5;
    let aY = stageRect.height * 0.45;
    let hX = lX + 110;
    let hY = lY + 60;

    if (logicPortEl) {
      const rect = logicPortEl.getBoundingClientRect();
      lX = rect.left + rect.width / 2 - stageRect.left;
      lY = rect.top + rect.height / 2 - stageRect.top;
    }
    if (aiCoreEl) {
      const rect = aiCoreEl.getBoundingClientRect();
      aX = rect.left + rect.width / 2 - stageRect.left;
      aY = rect.top + rect.height / 2 - stageRect.top;
    }

    // Cable plug rest position (hanging out from the Logic Port on the left)
    hX = lX + 110;
    hY = lY + 60;

    setLogicPortPos({ x: lX, y: lY });
    setAiCorePos({ x: aX, y: aY });
    setLeftHandPos({ x: hX, y: hY });
  }, []);

  const handleImageLoad = useCallback(() => {
    updatePositions();
    setPositionsLoaded(true);
  }, [updatePositions]);

  // Sync positions on mount, resize, and layout load
  useEffect(() => {
    updatePositions();
    setPositionsLoaded(true);
    window.addEventListener("resize", updatePositions);
    const timer = setTimeout(() => {
      updatePositions();
      setPositionsLoaded(true);
    }, 400);
    return () => {
      window.removeEventListener("resize", updatePositions);
      clearTimeout(timer);
    };
  }, [updatePositions]);


  // When offline, reset the plug coordinate to the character's hand
  useEffect(() => {
    if (!connected) {
      setPlug(leftHandPos);
    }
  }, [connected, leftHandPos]);

  const triggerConnection = useCallback(() => {
    // Snap plug to the AI core chest target
    setPlug(aiCorePos);
    setPhase(2); // Snapped & Powering Up state (Flashes white & triggers blast)
    setConnected(true); // Status goes ONLINE instantly!
    setShake(true); // Trigger screen shake

    // Reset shake after animation completes
    setTimeout(() => {
      setShake(false);
    }, 800);

    // Transition to the loading screen after 600ms (to let the mega blast shine)
    setTimeout(() => {
      setLoadingScreen(true);

      const duration = 2000;
      const intervalTime = 20;
      const totalSteps = duration / intervalTime;
      const step = 100 / totalSteps;

      let progress = 0;
      const timer = setInterval(() => {
        progress += step;
        if (progress >= 100) {
          progress = 100;
          clearInterval(timer);
          // Small delay before page route
          setTimeout(() => {
            router.push("/home");
          }, 150);
        }
        setLoadingProgress(Math.min(100, Math.floor(progress)));
      }, intervalTime);
    }, 600);
  }, [aiCorePos, router]);

  const handleDrag = useCallback(
    (_side: "left" | "right", point: Point, isLast?: boolean, clientPoint?: Point) => {
      if (connected || phase >= 2) return;

      // Update pointer visual coordinate during drag
      setPlug(point);
      setPhase(1); // Connecting state

      // If drag is ended, calculate absolute client coordinates distance to reactor
      if (isLast && clientPoint && reactorRef.current) {
        const rect = reactorRef.current.getBoundingClientRect();
        const reactorCenterX = rect.left + rect.width / 2;
        const reactorCenterY = rect.top + rect.height / 2;

        const dx = clientPoint.x - reactorCenterX;
        const dy = clientPoint.y - reactorCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 50) {
          triggerConnection();
        } else {
          // Reset plug position back to the hand rest position
          setPlug(leftHandPos);
          setPhase(0);
        }
      }
    },
    [triggerConnection, connected, phase, leftHandPos]
  );

  return (
    <motion.main
      ref={stageRef}
      animate={shake ? {
        x: [0, -16, 16, -14, 14, -10, 10, -6, 6, -3, 3, 0],
        y: [0, 12, -12, 10, -10, 7, -7, 4, -4, 2, -2, 0]
      } : {}}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative min-h-screen overflow-hidden bg-[#020510] text-cyan-50 flex flex-col justify-between px-6 py-6"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(14,165,233,.22),transparent_30%),radial-gradient(circle_at_73%_42%,rgba(147,51,234,.16),transparent_35%),linear-gradient(180deg,#020510_0%,#050e1b_55%,#020510_100%)]" />

      {/* Full-screen purple ripple effect after snap/connection */}
      {connected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.22, 0.6, 0.28] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_45%,rgba(217,70,239,.4),transparent_35%),radial-gradient(circle_at_75%_45%,rgba(168,85,247,.25),transparent_40%),linear-gradient(100deg,transparent,rgba(168,85,247,.16),transparent)] animate-pulse"
        />
      )}

      <div className="city-grid absolute inset-0 opacity-70" />
      <div className="scanline pointer-events-none absolute inset-0 z-50 opacity-15" />

      {/* Background stars/particles */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className={`absolute rounded-full ${particle.color}`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.15, 0.85, 0.15],
              scale: [0.75, 1.25, 0.75]
            }}
            transition={{
              duration: 3 + (particle.id % 6) * 0.4,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Network circuit lines */}
      <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-35">
        {Array.from({ length: 14 }, (_, index) => {
          const x = 8 + ((index * 19) % 88);
          const y = 15 + ((index * 29) % 66);
          const x2 = 8 + (((index + 3) * 19) % 88);
          const y2 = 15 + (((index + 5) * 29) % 66);
          return (
            <g key={index}>
              <motion.line
                x1={`${x}%`}
                y1={`${y}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke={index % 2 ? "#a855f7" : "#06b6d4"}
                strokeOpacity="0.22"
                animate={{ strokeOpacity: [0.1, 0.45, 0.1] }}
                transition={{ duration: 2.5 + index * 0.15, repeat: Infinity }}
              />
              <circle cx={`${x}%`} cy={`${y}%`} r="1.5" fill={index % 2 ? "#c084fc" : "#22d3ee"} />
            </g>
          );
        })}
      </svg>

      {/* Top status bar panels */}
      <StatusPanel online={connected} />

      {/* Main interactive screen */}
      <section className="relative z-10 mx-auto flex flex-1 flex-col items-center justify-between w-full max-w-[1440px] pt-16">

        {/* Title Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 mt-2 text-center"
        >
          <h1 className="font-display text-5xl font-black text-white drop-shadow-[0_0_24px_rgba(34,211,238,.75)] sm:text-6xl md:text-7xl lg:text-8xl">
            JIVITES.AI
          </h1>
          <div className="mt-2 flex items-center justify-center gap-4 font-display text-sm uppercase tracking-[0.55em] sm:text-lg">
            <span className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${connected ? "bg-cyan-400 animate-pulse shadow-[0_0_8px_cyan]" : "bg-rose-500 shadow-[0_0_8px_red]"}`} />
            <span className={connected ? "text-cyan-300 font-bold" : "text-rose-400 font-bold"}>
              {connected ? "SYSTEM ONLINE" : "SYSTEM OFFLINE"}
            </span>
            <span className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${connected ? "bg-cyan-400 animate-pulse shadow-[0_0_8px_cyan]" : "bg-rose-500 shadow-[0_0_8px_red]"}`} />
          </div>
          <p className="mx-auto mt-3 max-w-xl text-balance text-sm text-cyan-100/70 sm:text-base">
            Connect the wire to the arc reactor to initialize the AI system
          </p>
        </motion.div>

        {/* 3-Column Interface Area */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 my-4 flex-1">

          {/* Left Column: Logic Port Drag Source & Skill Panel */}
          <div className="hidden lg:flex flex-col gap-6 w-72 text-left z-20">

            {/* Logic Port box */}
            <div
              id="logic-port-anchor"
              className="relative flex flex-col items-center justify-center p-6 rounded-xl border border-cyan-500/20 bg-slate-950/50 backdrop-blur-md shadow-cyan"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)",
              }}
            >
              <div className="relative grid h-44 w-44 place-items-center rounded-full border border-cyan-400/20 text-cyan-300">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  className="absolute h-36 w-36 rounded-full border border-dashed border-cyan-400/35"
                />
                <motion.span
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute h-28 w-28 rounded-full border border-cyan-400/15"
                />
                <span className="relative z-10 h-14 w-14 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-300/30 shadow-[0_0_24px_rgba(34,211,238,0.45)]">
                  <Zap className="h-6 w-6 text-cyan-200" />
                </span>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">Logic Port</h3>
                <p className="mt-0.5 text-[9px] font-mono uppercase tracking-[0.2em] text-cyan-400/60">Drag Source</p>
              </div>
            </div>

            {/* Logic Source Skill List */}
            <div
              className="flex flex-col p-5 rounded-xl border border-cyan-500/10 bg-slate-950/40 backdrop-blur-sm text-left"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)",
              }}
            >
              <span className="text-[9px] uppercase tracking-[0.25em] text-cyan-400/50">System Input</span>
              <h4 className="mt-0.5 font-display text-xs font-bold uppercase tracking-[0.15em] text-cyan-300 border-b border-cyan-500/15 pb-2 mb-3">Logic Source</h4>
              <div className="space-y-3 font-display text-xs tracking-[0.18em] text-cyan-200/80">
                <div className="flex items-center gap-3 hover:text-cyan-300 transition-colors">
                  <span className="text-cyan-400/60 font-mono text-[10px]">&lt;/&gt;</span>
                  <span>Engineering</span>
                </div>
                <div className="flex items-center gap-3 hover:text-cyan-300 transition-colors">
                  <span className="text-cyan-400/60 font-mono text-[10px]">◇</span>
                  <span>Coding</span>
                </div>
                <div className="flex items-center gap-3 hover:text-cyan-300 transition-colors">
                  <span className="text-cyan-400/60 font-mono text-[10px]">⬡</span>
                  <span>Structure</span>
                </div>
                <div className="flex items-center gap-3 hover:text-cyan-300 transition-colors">
                  <span className="text-cyan-400/60 font-mono text-[10px]">⚡</span>
                  <span>Problem Solving</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Avatar Image & Target Chest Core */}
          <div className="relative flex-1 flex flex-col items-center justify-center min-h-[420px] w-full">

            {/* Ambient halo ring */}
            <motion.div
              animate={connected ? { scale: [1, 1.14, 1], opacity: [0.65, 0.95, 0.65] } : { opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: connected ? 1.4 : 3.8, repeat: Infinity }}
              className={`pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(62vw,540px)] w-[min(62vw,540px)] -translate-x-1/2 -translate-y-1/2 rounded-full border bg-[radial-gradient(circle,rgba(34,211,238,0.22),rgba(168,85,247,0.12)_42%,transparent_70%)] blur-md transition-colors duration-700 ${connected ? "border-fuchsia-500/20" : "border-cyan-500/10"
                }`}
            />

            {/* Character avatar frame */}
            <div className="relative w-full max-w-[calc(78vh*2/3)] aspect-[2/3] max-h-[78vh] min-h-[520px] min-w-[346px] z-10 flex items-center justify-center">
              <Image
                src="/images/avatar.png?v=2"
                alt="Stylized Jivites AI avatar"
                fill
                priority
                unoptimized
                className="select-none object-cover"
                onLoad={handleImageLoad}
              />

              {/* Target AI Core on character chest (Invisible drop zone during drag, glowing aura on connection) */}
              <div
                ref={reactorRef}
                id="ai-core-anchor"
                className="absolute left-[17.65%] top-[38.4%] -translate-x-1/2 -translate-y-1/2 h-24 w-24 z-20 pointer-events-none"
              >
                {/* Glowing aura overlay when connected */}
                {connected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0.75, 1, 0.75], scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 blur-xl opacity-75 shadow-[0_0_80px_rgba(217,70,239,0.95),0_0_120px_rgba(168,85,247,0.6)]"
                  />
                )}
                {/* Pulsing indicator when dragging (to show it's a target, but subtle and not floating) */}
                {phase === 1 && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border border-cyan-400/40 bg-cyan-400/5 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Column: AI Core Drop Target & Core Modules */}
          <div className="hidden lg:flex flex-col gap-6 w-72 text-right z-20">

            {/* AI Core detail panel */}
            <div
              className="flex flex-col p-6 rounded-xl border border-fuchsia-500/20 bg-slate-950/50 backdrop-blur-md shadow-violet text-right"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)",
              }}
            >
              <div className="flex justify-end mb-2">
                <span className="h-1.5 w-12 rounded-full bg-gradient-to-l from-fuchsia-500 to-transparent animate-pulse" />
              </div>
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-300">AI Core</h3>
              <p className="mt-0.5 text-[9px] font-mono uppercase tracking-[0.2em] text-fuchsia-400/60">Drop Target</p>
              <p className="mt-3 text-xs leading-relaxed text-slate-300/80">
                Connect the wire to the arc reactor to activate the core and initialize the Jivites system.
              </p>
            </div>

            {/* AI Core Capabilities */}
            <div
              className="flex flex-col p-5 rounded-xl border border-fuchsia-500/10 bg-slate-950/40 backdrop-blur-sm text-right"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)",
              }}
            >
              <span className="text-[9px] uppercase tracking-[0.25em] text-fuchsia-400/50">Core Modules</span>
              <h4 className="mt-0.5 font-display text-xs font-bold uppercase tracking-[0.15em] text-fuchsia-300 border-b border-fuchsia-500/15 pb-2 mb-3">Core Targets</h4>
              <div className="space-y-3 font-display text-xs tracking-[0.18em] text-fuchsia-200/80">
                <div className="flex items-center justify-end gap-3 hover:text-fuchsia-300 transition-colors">
                  <span>AI</span>
                  <span className="text-fuchsia-400/60 font-mono text-[10px]">🧠</span>
                </div>
                <div className="flex items-center justify-end gap-3 hover:text-fuchsia-300 transition-colors">
                  <span>Creativity</span>
                  <span className="text-fuchsia-400/60 font-mono text-[10px]">💡</span>
                </div>
                <div className="flex items-center justify-end gap-3 hover:text-fuchsia-300 transition-colors">
                  <span>Innovation</span>
                  <span className="text-fuchsia-400/60 font-mono text-[10px]">🚀</span>
                </div>
                <div className="flex items-center justify-end gap-3 hover:text-fuchsia-300 transition-colors">
                  <span>Intelligence</span>
                  <span className="text-fuchsia-400/60 font-mono text-[10px]">💾</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guiding connection path and arrow pointer */}
        {!connected && phase < 2 && (
          <svg className={`pointer-events-none absolute inset-0 z-10 h-full w-full transition-opacity duration-500 ${positionsLoaded ? "opacity-100" : "opacity-0"}`}>
            {/* Guide connection curve */}
            <path
              d={`M ${leftHandPos.x} ${leftHandPos.y} Q ${(leftHandPos.x + aiCorePos.x) / 2} ${(leftHandPos.y + aiCorePos.y) / 2 - 30}, ${aiCorePos.x} ${aiCorePos.y}`}
              fill="none"
              stroke="rgba(34, 211, 238, 0.15)"
              strokeWidth="3"
              strokeDasharray="6,6"
            />
            <motion.path
              d={`M ${leftHandPos.x} ${leftHandPos.y} Q ${(leftHandPos.x + aiCorePos.x) / 2} ${(leftHandPos.y + aiCorePos.y) / 2 - 30}, ${aiCorePos.x} ${aiCorePos.y}`}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="3"
              strokeDasharray="10,10"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="opacity-50"
            />

            {/* Pulsing target rings and arrow at aiCorePos */}
            <g transform={`translate(${aiCorePos.x}, ${aiCorePos.y})`}>
              <motion.circle
                r="24"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="1.5"
                animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle
                r="40"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="1"
                strokeDasharray="4,4"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="opacity-30"
              />

              {/* Guide arrow pointer (pointing left to right, towards core center) */}
              <g>
                {/* Arrow body and head */}
                <motion.path
                  d="M -50 0 L -24 0 M -34 -8 L -24 0 L -34 8"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                  animate={{ x: [-25, -12, -25] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </g>

              {/* Text tooltip guiding user */}
              <text
                x="-37"
                y="-16"
                fill="#22d3ee"
                fontSize="9"
                fontWeight="bold"
                letterSpacing="0.2em"
                textAnchor="middle"
                className="opacity-95 font-mono select-none drop-shadow-[0_0_4px_rgba(34,211,238,0.5)] animate-pulse"
              >
                PLUG HERE
              </text>
            </g>
          </svg>
        )}

        {/* Cable Connector */}
        <div className={`transition-opacity duration-500 ${positionsLoaded ? "opacity-100" : "opacity-0"}`}>
          <Cable
            side="left"
            color="cyan"
            anchor={logicPortPos}
            plug={plug}
            label="LOGIC"
            keywords={["Engineering", "Coding", "Structure"]}
            disabled={connected || phase >= 2}
            onDrag={handleDrag}
          />
        </div>

        {/* Narrative Stepper Progress Panel (5 cards at the bottom) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full max-w-[1400px] mt-6 relative z-20">

          {/* Card 1: Power Source */}
          <StepCard
            index={0}
            title="Power Source"
            desc="Drag the logic power wire"
            activePhase={phase}
            icon={
              <svg className="h-10 w-10 text-current opacity-70 animate-pulse" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
                <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M50 35 L50 65 M35 50 L65 50" stroke="currentColor" strokeWidth="2" />
              </svg>
            }
          />

          {/* Card 2: Connect */}
          <StepCard
            index={1}
            title="Connect"
            desc="Connect the wire to the arc reactor"
            activePhase={phase}
            icon={
              <svg className="h-10 w-10 text-current opacity-70" viewBox="0 0 100 100">
                <circle cx="25" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="75" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M35 50 Q50 30 65 50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
                <polygon points="61,45 66,50 60,54" fill="currentColor" />
              </svg>
            }
          />

          {/* Card 3: Powering Up */}
          <StepCard
            index={2}
            title="Powering Up"
            desc="Arc reactor absorbing the power"
            activePhase={phase}
            icon={
              <svg className="h-10 w-10 text-current opacity-70" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="12" fill="currentColor" />
                <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8,4" />
              </svg>
            }
          />

          {/* Card 4: System Online */}
          <StepCard
            index={3}
            title="System Online"
            desc="Arc reactor activated system online"
            activePhase={phase}
            icon={
              <svg className="h-10 w-10 text-current opacity-70" viewBox="0 0 100 100">
                <rect x="35" y="25" width="30" height="50" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="42" y="20" width="16" height="5" rx="1" fill="currentColor" />
                <motion.rect
                  initial={{ height: 0 }}
                  animate={phase >= 3 ? { height: 40 } : { height: 5 }}
                  x="39" y="30" width="22" fill="currentColor"
                  className="origin-bottom"
                />
              </svg>
            }
          />

          {/* Card 5: Activated */}
          <StepCard
            index={4}
            title="Activated"
            desc="Portfolio fully powered up"
            activePhase={phase}
            icon={
              <svg className="h-10 w-10 text-current opacity-70" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M38 50 L46 58 L62 42" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />

        </div>
      </section>

      {/* Sparks explosion on chest connection */}
      <EnergyBurst active={phase >= 2} point={aiCorePos} />

      {/* White camera flash when snap is locked - runs once when phase becomes >= 2 */}
      {phase >= 2 && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 z-45 bg-white"
        />
      )}

      {/* Portfolio Section revealed below the fold */}
      {portfolioRevealed && (
        <motion.section
          id="portfolio-section"
          initial={{ opacity: 0, y: 55 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 w-full max-w-[1400px] mx-auto mt-12 mb-20 px-6 py-12 border-t border-cyan-500/20 bg-slate-950/30 backdrop-blur-md"
        >
          {/* Portfolio content grid */}
          <div className="text-left mb-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-400/60 font-mono">Archive Unlocked</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">Portfolio Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Project 1 */}
            <div className="p-6 rounded-lg border border-cyan-500/15 bg-slate-950/60 backdrop-blur shadow-cyan flex flex-col justify-between min-h-[200px]" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)" }}>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400/60">Core AI Architecture</span>
                <h3 className="font-display text-lg font-bold text-white mt-1">Jivites Core AI</h3>
                <p className="text-xs text-slate-300/80 mt-3 leading-relaxed">
                  A high-performance neural link model built for agentic coders. Features low-latency reasoning and adaptive contextual mapping.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-cyan-300">
                <span>React / NextJS / PyTorch</span>
                <span className="font-bold">Active</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="p-6 rounded-lg border border-fuchsia-500/15 bg-slate-950/60 backdrop-blur shadow-violet flex flex-col justify-between min-h-[200px]" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)" }}>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-fuchsia-400/60">Reasoning Engine</span>
                <h3 className="font-display text-lg font-bold text-white mt-1">Neuro-Symbolic Link</h3>
                <p className="text-xs text-slate-300/80 mt-3 leading-relaxed">
                  Combining deep neural networks with symbolic logic execution. Solves complex multi-step reasoning queries with math verification.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-fuchsia-300">
                <span>TypeScript / Python / Rust</span>
                <span className="font-bold">Synced</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="p-6 rounded-lg border border-cyan-500/15 bg-slate-950/60 backdrop-blur shadow-cyan flex flex-col justify-between min-h-[200px]" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)" }}>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400/60">Interface Design</span>
                <h3 className="font-display text-lg font-bold text-white mt-1">Quantum HUD Canvas</h3>
                <p className="text-xs text-slate-300/80 mt-3 leading-relaxed">
                  High-fidelity interactive canvases with complex GPU shader pipelines. Ideal for high-refresh-rate digital displays.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-cyan-300">
                <span>WebGL / ThreeJS / Glsl</span>
                <span className="font-bold">Loaded</span>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* High-Tech Loading Screen Overlay */}
      {loadingScreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[999] bg-[#020510] flex flex-col items-center justify-center font-mono"
        >
          {/* Futuristic grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.18),transparent_50%),linear-gradient(180deg,#020510_0%,#050e1b_60%,#020510_100%)]" />
          <div className="city-grid absolute inset-0 opacity-20" />

          <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
            {/* Holographic glowing target rings */}
            <div className="relative h-44 w-44 flex items-center justify-center mb-8">
              {/* Outer rotating dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40"
              />
              {/* Inner counter-rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute h-36 w-36 rounded-full border border-double border-fuchsia-500/30"
              />
              {/* Pulsing center glow */}
              <motion.div
                animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute h-24 w-24 rounded-full bg-cyan-500/10 blur-md"
              />

              {/* Glowing Percentage Display */}
              <div className="relative z-10 text-center flex flex-col justify-center">
                <span className="font-display text-4xl font-black text-cyan-200 tracking-tighter drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">
                  {loadingProgress}%
                </span>
                <span className="text-[8px] uppercase tracking-[0.25em] text-cyan-400/60 mt-0.5">
                  LOADING
                </span>
              </div>
            </div>

            {/* Glowing progress line */}
            <div className="w-full h-1.5 bg-slate-900 border border-cyan-500/20 rounded-full overflow-hidden shadow-[inset_0_0_8px_rgba(0,0,0,0.8)] mb-6">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            {/* Scrolling terminal status */}
            <div className="h-12 flex flex-col justify-center">
              <span className="text-xs text-cyan-300 tracking-[0.15em] font-semibold animate-pulse uppercase">
                {loadingProgress < 30 && "⚡ INITIALIZING NEURAL INTERFACE..."}
                {loadingProgress >= 30 && loadingProgress < 60 && "◇ DOWNLOAD COMPLETED. INTEGRATING MODULES..."}
                {loadingProgress >= 60 && loadingProgress < 90 && "⬡ CALIBRATING ARC REACTOR INTAKE..."}
                {loadingProgress >= 90 && "✓ SECURE CORE ESTABLISHED. SYNCHRONIZING ROUTE..."}
              </span>
            </div>

            <div className="mt-8 font-mono text-[9px] text-cyan-500/40 tracking-[0.1em] border border-cyan-500/10 p-2 bg-slate-950/40 w-full uppercase">
              NODE ID: CORE_B5 // STATUS: SUCCESS
            </div>
          </div>
        </motion.div>
      )}
    </motion.main>
  );
}

// Helper: Custom styled stepper card components
interface StepCardProps {
  index: number;
  title: string;
  desc: string;
  activePhase: number;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

function StepCard({ index, title, desc, activePhase, icon, children }: StepCardProps) {
  const isActive = activePhase === index;
  const isCompleted = activePhase > index;

  let borderColor = "border-slate-800/80";
  let textColor = "text-slate-500";
  let bgOpacity = "bg-slate-950/45";
  let opacity = "opacity-45";
  let glow = "";

  if (isActive) {
    opacity = "opacity-100";
    textColor = index >= 2 ? "text-fuchsia-300" : "text-cyan-300";
    borderColor = index >= 2 ? "border-fuchsia-500/80" : "border-cyan-500/80";
    bgOpacity = index >= 2 ? "bg-fuchsia-950/10" : "bg-cyan-950/10";
    glow = index >= 2 ? "shadow-[0_0_20px_rgba(217,70,239,0.2)]" : "shadow-[0_0_20px_rgba(34,211,238,0.2)]";
  } else if (isCompleted) {
    opacity = "opacity-80";
    textColor = "text-emerald-400";
    borderColor = "border-emerald-500/50";
    bgOpacity = "bg-emerald-950/5";
  }

  return (
    <div
      className={`relative flex flex-col p-3 rounded-lg border backdrop-blur-md transition-all duration-500 ${borderColor} ${textColor} ${bgOpacity} ${opacity} ${glow}`}
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
      }}
    >
      <div className="flex items-center justify-between gap-1.5 border-b border-white/5 pb-1.5 mb-1.5">
        <span className="font-display text-[10px] uppercase tracking-widest font-semibold truncate">
          {index + 1}. {title}
        </span>
        <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors duration-500 ${isCompleted ? "bg-emerald-500/20 text-emerald-400" : isActive ? (index >= 2 ? "bg-fuchsia-500/20 text-fuchsia-400" : "bg-cyan-500/20 text-cyan-400") : "bg-slate-900 text-slate-600"
          }`}>
          {isCompleted ? "✓" : index + 1}
        </div>
      </div>

      <p className="text-[10px] leading-relaxed text-slate-400/80 h-7 overflow-hidden">
        {desc}
      </p>

      <div className="mt-2.5 flex items-center justify-center h-20 w-full rounded border border-white/5 bg-slate-900/35 overflow-hidden">
        {children && isActive ? children : icon}
      </div>
    </div>
  );
}


