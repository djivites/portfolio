"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  User, 
  Laptop, 
  BrainCircuit, 
  FileText, 
  Send, 
  ArrowUpRight 
} from "lucide-react";

// Configurable menu items to open in new tab
const menuItems = [
  {
    num: "01",
    title: "ABOUT ME",
    subtitle: "Who I Am",
    icon: User,
    url: "/about",
    offsetXClass: "lg:-translate-x-12",
    glowColor: "hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]",
    iconGlow: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20 shadow-[0_0_12px_rgba(34,211,238,0.3)]",
  },
  {
    num: "02",
    title: "PROJECTS",
    subtitle: "Things I've Built",
    icon: Laptop,
    url: "/projects",
    offsetXClass: "lg:-translate-x-2",
    glowColor: "hover:border-fuchsia-400 hover:shadow-[0_0_20px_rgba(217,70,239,0.25)]",
    iconGlow: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20 shadow-[0_0_12px_rgba(217,70,239,0.3)]",
  },
  {
    num: "03",
    title: "SKILLS",
    subtitle: "My Arsenal",
    icon: BrainCircuit,
    url: "/skills",
    offsetXClass: "lg:translate-x-8",
    glowColor: "hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]",
    iconGlow: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20 shadow-[0_0_12px_rgba(34,211,238,0.3)]",
  },
  {
    num: "04",
    title: "MY JOURNEY",
    subtitle: "Resume / Experience",
    icon: FileText,
    url: "/resume",
    offsetXClass: "lg:-translate-x-2",
    glowColor: "hover:border-fuchsia-400 hover:shadow-[0_0_20px_rgba(217,70,239,0.25)]",
    iconGlow: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20 shadow-[0_0_12px_rgba(217,70,239,0.3)]",
  },
  {
    num: "05",
    title: "CONTACT",
    subtitle: "Get In Touch",
    icon: Send,
    url: "/contact",
    offsetXClass: "lg:-translate-x-12",
    glowColor: "hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]",
    iconGlow: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20 shadow-[0_0_12px_rgba(34,211,238,0.3)]",
  },
];

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#020510] text-cyan-50 font-display p-6 lg:p-12 select-none">
      
      {/* 1. Background Image and Sci-Fi Gradients */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-lighten"
        style={{ backgroundImage: "url('/images/home-bg.png')" }}
      />
      
      {/* Dark gradient mapping to match the original layout atmosphere */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#020510]/95 via-[#020510]/70 to-[#020510]/95" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_75%_50%,rgba(34,211,238,0.18),transparent_50%)]" />
      
      {/* Scanning laser grid lines */}
      <div className="city-grid absolute inset-0 opacity-15 pointer-events-none" />
      <div className="scanline absolute inset-0 opacity-5 pointer-events-none" />

      {/* Cybernetic nodes */}
      <div className="absolute top-6 left-6 font-mono text-[9px] tracking-[0.25em] text-cyan-500/40 pointer-events-none">
        NODE ID: PORTAL_SECURE_HOME // ARCHIVE: ACCESS_GRANTED
      </div>
      <div className="absolute top-6 right-6 font-mono text-[9px] tracking-[0.25em] text-cyan-500/40 pointer-events-none">
        STATUS: ONLINE // INTERFACE: v1.0
      </div>

      {/* 2. Main Responsive Grid Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 flex-1 my-auto pt-10 pb-6">

        {/* ================= LEFT COLUMN: TITLES & SOCIALS ================= */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="lg:w-[28%] w-full flex flex-col justify-center items-start text-left z-20"
        >
          <span className="text-[10px] uppercase tracking-[0.45em] text-cyan-400/80 font-mono font-bold">
            System Online // Profile established
          </span>
          
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter mt-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.12)]">
            JIVITES
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-200 to-cyan-400 drop-shadow-[0_0_35px_rgba(34,211,238,0.45)]">
              DAMODAR
            </span>
          </h1>

          <div className="h-[2px] w-24 bg-gradient-to-r from-cyan-400 to-transparent my-6" />

          <p className="font-mono text-sm tracking-[0.22em] text-cyan-300 font-extrabold uppercase">
            AI Engineer <span className="text-fuchsia-400/80 font-normal">|</span> Full Stack Developer
          </p>
          
          <p className="mt-3 text-xs tracking-widest text-cyan-100/50 uppercase max-w-sm leading-relaxed font-medium">
            Building intelligent agentic structures & holographic canvas systems.
          </p>

          {/* Social Network Nodes */}
          <div className="mt-8 flex gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub Profile"
              className="h-10 w-10 border border-cyan-500/20 bg-slate-950/50 rounded-full flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:text-white hover:border-cyan-400 hover:shadow-[0_0_18px_rgba(34,211,238,0.4)] transition-all duration-300 cursor-pointer"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile"
              className="h-10 w-10 border border-cyan-500/20 bg-slate-950/50 rounded-full flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:text-white hover:border-cyan-400 hover:shadow-[0_0_18px_rgba(34,211,238,0.4)] transition-all duration-300 cursor-pointer"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="mailto:contact@jivites.ai" 
              aria-label="Send Email"
              className="h-10 w-10 border border-cyan-500/20 bg-slate-950/50 rounded-full flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:text-white hover:border-cyan-400 hover:shadow-[0_0_18px_rgba(34,211,238,0.4)] transition-all duration-300 cursor-pointer"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        {/* ================= CENTER COLUMN: AVATAR & GLOWING PORTAL ================= */}
        <div className="lg:w-[36%] w-full flex items-center justify-center relative min-h-[440px] lg:min-h-[820px] z-10">
          
          {/* Animated circular portal graphic */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <div className="relative h-[min(90vw,720px)] w-[min(90vw,720px)] flex items-center justify-center scale-95 lg:scale-105">
              
              {/* Outer Dashed Rotating Ring (Cyan) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-500/20"
              />
              
              {/* Inner Double Rotating Ring (Fuchsia) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="absolute h-[86%] w-[86%] rounded-full border border-double border-fuchsia-500/25"
              />
              
              {/* Tech Circular Grid Ring (Cyan) */}
              <motion.div
                animate={{ rotate: 180 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute h-[74%] w-[74%] rounded-full border border-cyan-400/10 flex items-center justify-center"
              >
                <div className="h-full w-[1.5px] bg-cyan-400/15 absolute" />
                <div className="w-full h-[1.5px] bg-cyan-400/15 absolute" />
              </motion.div>
              
              {/* Center Portal Glowing Core (Gradient Glow) */}
              <div className="absolute h-[55%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.35)_0%,rgba(168,85,247,0.12)_45%,transparent_70%)] blur-md" />
              
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.65, 0.9, 0.65] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute h-[38%] w-[38%] rounded-full bg-cyan-500/5 border border-cyan-400/35 shadow-[0_0_55px_rgba(34,211,238,0.45)]"
              />

              {/* Glowing Portal SVG Shockwaves & Lightning Sparks */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full opacity-70" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="portal-gradient-home" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  
                  {/* Concentric rings */}
                  <circle cx="50" cy="50" r="28" fill="none" stroke="url(#portal-gradient-home)" strokeWidth="0.5" strokeDasharray="3 1.5" />
                  <circle cx="50" cy="50" r="36" fill="none" stroke="url(#portal-gradient-home)" strokeWidth="0.6" strokeDasharray="4 2" />
                  <circle cx="50" cy="50" r="43" fill="none" stroke="#22d3ee" strokeWidth="0.25" strokeOpacity="0.25" />
                  
                  {/* Animate lightning-like path segments */}
                  <motion.path
                    d="M 50 22 A 28 28 0 0 1 78 50"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.9, repeat: Infinity, delay: 0.1 }}
                  />
                  <motion.path
                    d="M 22 50 A 28 28 0 0 1 50 78"
                    fill="none"
                    stroke="#d946ef"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 2.3, repeat: Infinity, delay: 0.7 }}
                  />
                  <motion.path
                    d="M 50 78 A 28 28 0 0 1 78 50"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: 1.3 }}
                  />
                </svg>
              </div>

            </div>
          </div>

          {/* Floating avatar overlay on top of portal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, y: [-6, 6, -6] }}
            transition={{
              opacity: { duration: 1, delay: 0.3 },
              scale: { duration: 1, delay: 0.3 },
              y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="h-[min(95vh,840px)] aspect-[2/3] relative flex items-center justify-center pointer-events-none select-none z-10"
          >
            <Image
              src="/images/home-avatar.png"
              alt="Jivites Damodar Portrait"
              fill
              priority
              unoptimized
              className="object-contain drop-shadow-[0_0_50px_rgba(34,211,238,0.35)]"
            />
          </motion.div>

        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE CURVED MENU CARDS ================= */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="lg:w-[36%] w-full flex flex-col gap-4 z-20 pr-0 lg:pr-4"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <Link
                key={item.num}
                href={item.url}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative flex items-center justify-between p-5 lg:p-6 bg-slate-950/65 backdrop-blur-md border border-cyan-500/15 rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-[1.07] hover:z-30 group select-none shadow-[0_0_12px_rgba(0,0,0,0.4)] ${item.offsetXClass} ${item.glowColor}`}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                }}
              >
                
                {/* Visual tech grid nodes */}
                <span className="absolute top-0 left-0 w-1.5 h-[1px] bg-cyan-400/40" />
                <span className="absolute top-0 left-0 w-[1px] h-1.5 bg-cyan-400/40" />
                <span className="absolute bottom-0 right-0 w-1.5 h-[1px] bg-fuchsia-400/40" />
                <span className="absolute bottom-0 right-0 w-[1px] h-1.5 bg-fuchsia-400/40" />
                
                <div className="flex items-center gap-4">
                  {/* Step index number */}
                  <div className="flex flex-col items-center justify-center font-mono border-r border-cyan-500/10 pr-4">
                    <span className="text-[10px] font-bold text-cyan-400/50 leading-none">ID</span>
                    <span className="text-sm font-black text-cyan-300/80 mt-0.5 tracking-normal leading-none font-sans">
                      {item.num}
                    </span>
                  </div>

                  {/* Icon container with customized neon glow */}
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center border transition-all duration-300 group-hover:scale-105 ${item.iconGlow}`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Labels */}
                  <div className="text-left">
                    <h3 className="font-display text-base font-black tracking-[0.2em] text-white group-hover:text-cyan-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs tracking-widest text-cyan-100/45 uppercase mt-0.5 font-mono">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* External link indicator */}
                <div className="text-cyan-400/50 group-hover:text-cyan-300 transition-colors flex items-center justify-center">
                  <ArrowUpRight className="h-5 w-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

              </Link>
            );
          })}
        </motion.div>

      </div>

      {/* 3. Footer Branding Panel */}
      <footer className="relative z-10 w-full max-w-[1440px] mx-auto border-t border-cyan-500/10 pt-4 flex flex-col sm:flex-row items-center justify-between text-[9px] font-mono tracking-[0.25em] text-cyan-500/40 gap-3">
        <div>
          CORE OPERATIONAL LOAD // 0.082s SECURE
        </div>
        <div className="uppercase">
          © {new Date().getFullYear()} JIVITES DAMODAR // DESIGNED FOR SUPERIOR REASONING
        </div>
      </footer>

    </main>
  );
}
