"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Megaphone, 
  Network, 
  Handshake, 
  Newspaper, 
  Github, 
  ArrowUpRight, 
  ArrowLeft,
  Leaf 
} from "lucide-react";

const projects = [
  {
    title: "MaatramMark",
    subtitle: "AI Marketing Platform",
    description: "Multi-agent AI platform that generates posters, captions, hashtags, and reel ideas, reducing content creation time by 80%.",
    icon: Megaphone,
    themeColor: "emerald",
    liveUrl: "#",
    githubUrl: "https://github.com",
    bgGlow: "group-hover:shadow-[0_0_35px_rgba(16,185,129,0.3)]",
    borderGlow: "border-emerald-500/25 group-hover:border-emerald-500/60",
    iconClass: "bg-emerald-950/30 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]",
    tagColor: "text-emerald-400",
    btnClass: "border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-black hover:shadow-[0_0_12px_rgba(16,185,129,0.4)]"
  },
  {
    title: "SkillBridge",
    subtitle: "AI Recruitment Platform",
    description: "AI-driven recruitment using knowledge graphs, LangChain, and vector embeddings for intelligent resume-job matching.",
    icon: Network,
    themeColor: "cyan",
    liveUrl: "#",
    githubUrl: "https://github.com",
    bgGlow: "group-hover:shadow-[0_0_35px_rgba(6,182,212,0.3)]",
    borderGlow: "border-cyan-500/25 group-hover:border-cyan-500/60",
    iconClass: "bg-cyan-950/30 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]",
    tagColor: "text-cyan-400",
    btnClass: "border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_12px_rgba(6,182,212,0.4)]"
  },
  {
    title: "VentureMatch",
    subtitle: "Investor-Founder Matching",
    description: "Recommendation engine that matches startups with investors based on domain and investment interests.",
    icon: Handshake,
    themeColor: "amber",
    liveUrl: "#",
    githubUrl: "https://github.com",
    bgGlow: "group-hover:shadow-[0_0_35px_rgba(245,158,11,0.3)]",
    borderGlow: "border-amber-500/25 group-hover:border-amber-500/60",
    iconClass: "bg-amber-950/30 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]",
    tagColor: "text-amber-400",
    btnClass: "border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-black hover:shadow-[0_0_12px_rgba(245,158,11,0.4)]"
  },
  {
    title: "AI News Credibility Index",
    subtitle: "NLP Misinformation Detection",
    description: "NLP-based system that detects misinformation in news articles and provides credibility scoring using ML models.",
    icon: Newspaper,
    themeColor: "purple",
    liveUrl: "#",
    githubUrl: "https://github.com",
    bgGlow: "group-hover:shadow-[0_0_35px_rgba(168,85,247,0.3)]",
    borderGlow: "border-purple-500/25 group-hover:border-purple-500/60",
    iconClass: "bg-purple-950/30 border-purple-500/30 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.25)]",
    tagColor: "text-purple-400",
    btnClass: "border-purple-500/40 text-purple-400 hover:bg-purple-500 hover:text-black hover:shadow-[0_0_12px_rgba(168,85,247,0.4)]"
  }
];

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden overflow-y-auto bg-[#020510] text-cyan-50 font-display p-4 md:p-8 lg:p-12 select-none">
      
      {/* 1. Forest Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-lighten"
        style={{ backgroundImage: "url('/images/forest.png')" }}
      />
      
      {/* Dark overlay and subtle green spotlight in middle */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#020510]/95 via-[#020510]/75 to-[#020510]/95" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_35%,rgba(16,185,129,0.14),transparent_55%)]" />
      
      {/* Technical laser grid */}
      <div className="city-grid absolute inset-0 opacity-10 pointer-events-none" />
      <div className="scanline absolute inset-0 opacity-5 pointer-events-none" />

      {/* Cyber Nodes */}
      <div className="absolute top-6 left-6 font-mono text-[9px] tracking-[0.25em] text-emerald-500/40 pointer-events-none">
        SECURE_NODE: PROJECTS // INITIALIZED
      </div>
      <div className="absolute top-6 right-6 font-mono text-[9px] tracking-[0.25em] text-cyan-500/40 pointer-events-none">
        ARCHIVE: DECRYPTED // DATA: SYNCD
      </div>

      {/* Back Button and Header Navigation */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex justify-between items-center mb-8">
        <Link 
          href="/home" 
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-slate-950/45 text-xs tracking-widest uppercase hover:border-emerald-500/30 hover:text-emerald-400 transition-all duration-300 shadow-[0_0_12px_rgba(0,0,0,0.4)] group cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex-1 flex flex-col justify-center items-center gap-10 my-auto">
        
        {/* Title Block */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl"
        >
          <div className="flex items-center justify-center gap-4 text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]">
            <Leaf className="h-6 w-6 transform -rotate-45" />
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-widest text-white leading-none">
              PROJECTS
            </h1>
            <Leaf className="h-6 w-6 transform rotate-45" />
          </div>
          <h2 className="mt-4 font-display text-base sm:text-lg font-black tracking-[0.2em] text-emerald-400/80 uppercase">
            Building Intelligent Systems Through Innovation
          </h2>
          
          <div className="flex justify-center my-5">
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <Leaf className="h-4 w-4" />
            </div>
          </div>

          <p className="font-sans text-xs sm:text-sm tracking-wide text-cyan-100/70 max-w-xl mx-auto leading-relaxed">
            A collection of AI-powered projects that solve real-world problems and create meaningful impact.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full px-2 sm:px-6">
          {projects.map((proj, idx) => {
            const Icon = proj.icon;
            return (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                whileHover={{ scale: 1.025 }}
                className={`group relative flex flex-col md:flex-row gap-6 p-6 lg:p-8 bg-slate-950/55 backdrop-blur-md border rounded-3xl transition-all duration-300 ${proj.borderGlow} ${proj.bgGlow} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
              >
                {/* Tech corner marks */}
                <span className="absolute top-0 left-0 w-2.5 h-[1.5px] bg-white/10 group-hover:bg-emerald-400/40 transition-colors" />
                <span className="absolute top-0 left-0 w-[1.5px] h-2.5 bg-white/10 group-hover:bg-emerald-400/40 transition-colors" />
                <span className="absolute bottom-0 right-0 w-2.5 h-[1.5px] bg-white/10 group-hover:bg-cyan-400/40 transition-colors" />
                <span className="absolute bottom-0 right-0 w-[1.5px] h-2.5 bg-white/10 group-hover:bg-cyan-400/40 transition-colors" />

                {/* Left side: Icon Container */}
                <div className="flex-shrink-0 flex items-start justify-center md:justify-start">
                  <div className={`h-16 w-16 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${proj.iconClass}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                </div>

                {/* Right side: Project Details */}
                <div className="flex-grow flex flex-col justify-between text-left">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-black tracking-wider text-white group-hover:text-emerald-100 transition-colors">
                      {proj.title}
                    </h3>
                    <p className={`text-xs sm:text-sm font-semibold tracking-wider ${proj.tagColor} mt-1`}>
                      {proj.subtitle}
                    </p>
                    <p className="mt-4 text-xs sm:text-sm text-slate-300/85 leading-relaxed font-sans font-medium">
                      {proj.description}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 flex flex-wrap gap-4 items-center">
                    <a
                      href={proj.liveUrl}
                      className={`px-4 py-1.5 rounded-full border text-xs tracking-wider font-semibold uppercase flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${proj.btnClass}`}
                    >
                      Live Demo
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded-full border border-white/10 text-slate-300 hover:text-white hover:border-white hover:bg-white/5 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)] text-xs tracking-wider font-semibold uppercase flex items-center gap-2 transition-all duration-300 cursor-pointer"
                    >
                      GitHub
                      <Github className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Footer Branding Panel */}
      <footer className="relative z-10 w-full max-w-[1440px] mx-auto mt-12 pt-6 border-t border-emerald-500/10 flex flex-col items-center gap-6">
        
        {/* Custom styled timeline divider */}
        <div className="w-full flex items-center justify-between gap-4 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-emerald-500/50">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-emerald-500/35 relative">
            <span className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-emerald-500/60 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
          </div>
          
          <div className="flex items-center gap-2 px-4 py-1 rounded-full border border-emerald-500/20 bg-emerald-950/20 shadow-[0_0_12px_rgba(16,185,129,0.15)] font-semibold uppercase">
            <span>Every idea is a seed.</span>
            <Leaf className="h-3.5 w-3.5 text-emerald-400 fill-current animate-pulse" />
            <span>Every project is impact.</span>
          </div>

          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-emerald-500/20 to-emerald-500/35 relative">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-emerald-500/60 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center justify-between text-[9px] font-mono tracking-[0.25em] text-emerald-500/30 gap-3">
          <div>
            CORE PROJECTS STATUS // ACTIVE
          </div>
          <div className="uppercase">
            © {new Date().getFullYear()} JIVITES DAMODAR // DESIGNED FOR SUPERIOR REASONING
          </div>
        </div>
      </footer>

    </main>
  );
}
