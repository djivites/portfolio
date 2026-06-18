"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  User, 
  GraduationCap, 
  BookOpen, 
  Building2, 
  MapPin, 
  Lightbulb, 
  Users, 
  Smile, 
  MessageSquare, 
  Brain, 
  Target, 
  Rocket, 
  Star, 
  Code2, 
  Cpu, 
  Trophy, 
  Heart 
} from "lucide-react";

export default function AboutPage() {
  const traits = [
    {
      title: "Creative Thinker",
      desc: "I love to create ideas and find innovative ways to solve problems.",
      icon: Lightbulb,
    },
    {
      title: "Strong Communicator",
      desc: "I have good communication skills and enjoy sharing ideas, discussing solutions and learning from others.",
      icon: MessageSquare,
    },
    {
      title: "Team Player",
      desc: "I enjoy working in teams and believe great things are built through collaboration.",
      icon: Users,
    },
    {
      title: "Growth Mindset",
      desc: "I always try to learn new things and challenge myself to become better every day.",
      icon: Brain,
    },
    {
      title: "Positive & Supportive",
      desc: "I always try to create a positive environment and make people around me happy.",
      icon: Smile,
    },
    {
      title: "Problem Solver",
      desc: "I enjoy breaking down complex problems and building simple, effective solutions.",
      icon: Target,
    },
  ];

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden overflow-y-auto bg-[#020510] text-cyan-50 font-display p-4 md:p-8 lg:p-12 select-none">
      
      {/* 1. Sky City Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/about-bg.png')" }}
      />
      {/* Warm sunset/holographic gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#020510]/95 via-[#020510]/80 to-[#020510]/95 mix-blend-multiply" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_30%,rgba(245,158,11,0.08),transparent_40%)]" />
      
      {/* Technical laser grid */}
      <div className="city-grid absolute inset-0 opacity-10 pointer-events-none" />
      <div className="scanline absolute inset-0 opacity-5 pointer-events-none" />

      {/* Cyber Nodes */}
      <div className="absolute top-6 left-6 font-mono text-[9px] tracking-[0.25em] text-amber-500/40 pointer-events-none">
        SECURE_NODE: ABOUT_ME // INITIALIZED
      </div>
      <div className="absolute top-6 right-6 font-mono text-[9px] tracking-[0.25em] text-cyan-500/40 pointer-events-none">
        ARCHIVE: DECRYPTED // DATA: SYNCD
      </div>

      {/* 2. Main Dual-Column Content Layout */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-stretch gap-10 flex-1 my-auto pt-10 pb-6">
        
        {/* ================= LEFT COLUMN: STYLIZED PORTRAIT ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:w-[40%] w-full flex items-stretch justify-center relative min-h-[440px] lg:min-h-0 pointer-events-none"
        >
          <div className="h-[min(95vh,840px)] w-full aspect-[2/3] relative">
            <Image
              src="/images/about-avatar.png"
              alt="Jivites Damodar Portrait"
              fill
              priority
              unoptimized
              className="object-cover object-bottom drop-shadow-[0_0_40px_rgba(245,158,11,0.25)]"
            />
          </div>
        </motion.div>

        {/* ================= RIGHT COLUMN: GLASSMORPHIC CONTENT PANEL ================= */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="lg:w-[60%] w-full flex flex-col justify-between bg-slate-950/45 border border-amber-500/15 rounded-3xl p-6 lg:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(245,158,11,0.04)] relative"
        >
          {/* Tech design corner marks */}
          <span className="absolute top-0 left-0 w-2.5 h-[1.5px] bg-amber-400/50" />
          <span className="absolute top-0 left-0 w-[1.5px] h-2.5 bg-amber-400/50" />
          <span className="absolute bottom-0 right-0 w-2.5 h-[1.5px] bg-cyan-400/50" />
          <span className="absolute bottom-0 right-0 w-[1.5px] h-2.5 bg-cyan-400/50" />

          {/* ----- ROW 1: HEADER & QUOTE BOX ----- */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-6">
            
            {/* Title Block */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <User className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h1 className="font-display text-4xl font-black tracking-tight text-white leading-none">
                  ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">ME</span>
                </h1>
                <p className="text-xs font-mono tracking-[0.25em] text-cyan-300 uppercase mt-1.5">
                  AI Engineer <span className="text-amber-500">|</span> Full Stack Developer
                </p>
              </div>
            </div>

            {/* Dark Quote Box */}
            <div className="p-4 rounded-xl border border-white/5 bg-black/40 backdrop-blur max-w-xs text-right shadow-[inset_0_0_12px_rgba(0,0,0,0.6)] hover:border-amber-500/35 hover:scale-[1.03] hover:shadow-[inset_0_0_12px_rgba(0,0,0,0.6),0_0_20px_rgba(245,158,11,0.08)] transition-all duration-300 cursor-pointer">
              <p className="font-mono italic text-[11px] text-amber-200/90 leading-relaxed tracking-wider">
                “ Code today.<br />
                Build tomorrow.<br />
                Impact forever. ”
              </p>
              <p className="text-[10px] tracking-widest text-cyan-400 font-bold uppercase mt-2 font-mono">
                — Jivites
              </p>
            </div>

          </div>

          {/* ----- ROW 2: BIO & QUICK STATS GRID ----- */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 py-6 border-b border-white/5">
            
            {/* Bio Column */}
            <div className="xl:col-span-3 text-left flex flex-col justify-center gap-4 text-xs lg:text-sm text-slate-300 leading-relaxed font-sans">
              <p>
                I am an AI Engineering student with a <span className="text-amber-300 font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">CGPA of 9.35</span>, passionate about building intelligent systems that solve real-world problems. My journey in technology is driven by curiosity, creativity, and the desire to turn ideas into impactful solutions.
              </p>
              <p>
                From AI-powered applications to full-stack development, I enjoy transforming concepts into products that people can use and benefit from.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Box 1: CGPA */}
              <div className="p-3 rounded-lg border border-white/5 bg-slate-900/30 flex items-center gap-3 hover:border-amber-500/30 hover:bg-slate-900/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.08)] hover:scale-[1.03] transition-all duration-300 cursor-pointer group">
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.15)]">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="text-left leading-tight">
                  <p className="text-[9px] uppercase tracking-wider text-cyan-400/60 font-mono">CGPA</p>
                  <p className="text-sm font-black text-white mt-0.5">9.35</p>
                </div>
              </div>

              {/* Box 2: Education */}
              <div className="p-3 rounded-lg border border-white/5 bg-slate-900/30 flex items-center gap-3 hover:border-amber-500/30 hover:bg-slate-900/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.08)] hover:scale-[1.03] transition-all duration-300 cursor-pointer group">
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.15)]">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="text-left leading-tight">
                  <p className="text-[9px] uppercase tracking-wider text-cyan-400/60 font-mono">Education</p>
                  <p className="text-xs font-bold text-white mt-0.5">B.Tech CS (AI)</p>
                </div>
              </div>

              {/* Box 3: University */}
              <div className="p-3 rounded-lg border border-white/5 bg-slate-900/30 flex items-center gap-3 hover:border-amber-500/30 hover:bg-slate-900/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.08)] hover:scale-[1.03] transition-all duration-300 cursor-pointer group">
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.15)]">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="text-left leading-tight">
                  <p className="text-[9px] uppercase tracking-wider text-cyan-400/60 font-mono">University</p>
                  <p className="text-[10px] font-bold text-white mt-0.5 leading-snug">Amrita Vishwa Vidyapeetham</p>
                </div>
              </div>

              {/* Box 4: Location */}
              <div className="p-3 rounded-lg border border-white/5 bg-slate-900/30 flex items-center gap-3 hover:border-amber-500/30 hover:bg-slate-900/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.08)] hover:scale-[1.03] transition-all duration-300 cursor-pointer group">
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.15)]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="text-left leading-tight">
                  <p className="text-[9px] uppercase tracking-wider text-cyan-400/60 font-mono">Location</p>
                  <p className="text-xs font-bold text-white mt-0.5">Chennai, India</p>
                </div>
              </div>

            </div>

          </div>

          {/* ----- ROW 3: WHO I AM & MY MISSION ----- */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 py-6">
            
            {/* Traits Column */}
            <div className="xl:col-span-3 text-left">
              
              <div className="flex items-center gap-2 mb-4">
                <User className="h-4 w-4 text-amber-400" />
                <h2 className="font-display text-xs font-bold uppercase tracking-[0.25em] text-white">Who I Am</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                {traits.map((trait) => {
                  const TraitIcon = trait.icon;
                  return (
                    <div key={trait.title} className="flex items-start gap-3 p-2 rounded-xl border border-transparent hover:border-white/5 hover:bg-slate-900/25 hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
                      <div className="h-8 w-8 rounded-lg bg-slate-900/50 border border-white/5 text-cyan-400 flex items-center justify-center group-hover:border-amber-500/20 group-hover:text-amber-300 transition-all duration-300 flex-shrink-0">
                        <TraitIcon className="h-4 w-4" />
                      </div>
                      <div className="text-left leading-tight">
                        <h3 className="text-[11px] font-bold uppercase tracking-wider text-white group-hover:text-amber-200 transition-colors">
                          {trait.title}
                        </h3>
                        <p className="text-[10px] text-slate-400 mt-1 leading-relaxed font-sans">
                          {trait.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Mission Column */}
            <div className="xl:col-span-2 text-left flex flex-col justify-between gap-6">
              
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Rocket className="h-4 w-4 text-amber-400" />
                  <h2 className="font-display text-xs font-bold uppercase tracking-[0.25em] text-white">My Mission</h2>
                </div>
                
                <p className="text-xs leading-relaxed text-slate-300 font-sans">
                  My goal is not just to write code, but to create <span className="text-amber-300 font-bold">meaningful technology</span> that <span className="text-cyan-300 font-bold">improves experiences</span>, <span className="text-amber-300 font-bold">solves problems</span>, and <span className="text-cyan-300 font-bold">brings value to people</span>.
                </p>
                <p className="text-xs leading-relaxed text-slate-300 mt-3 font-sans">
                  I believe innovation happens when creativity, teamwork, and technology come together.
                </p>
              </div>

              {/* Star Highlight Box */}
              <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-center gap-3 shadow-[0_0_15px_rgba(245,158,11,0.06)] hover:border-amber-500/40 hover:bg-amber-500/10 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(245,158,11,0.12)] transition-all duration-300 cursor-pointer">
                <div className="h-9 w-9 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="text-[10px] tracking-wider text-amber-300 font-bold uppercase font-mono leading-normal">
                  Always learning. Always building.<br />
                  <span className="text-white">Always creating impact.</span>
                </p>
              </div>

            </div>

          </div>

          {/* ----- ROW 4: BOTTOM STATS BAR ----- */}
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-white/5 bg-slate-950/70 shadow-[inset_0_0_12px_rgba(0,0,0,0.5)] rounded-2xl relative"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
            }}
          >
            {/* Visual tech nodes */}
            <span className="absolute top-0 left-0 w-1.5 h-[1px] bg-amber-400/40" />
            <span className="absolute top-0 left-0 w-[1px] h-1.5 bg-amber-400/40" />

            {/* Stat Node 1 */}
            <div className="flex items-center gap-3 justify-center md:justify-start border-r border-white/5 pr-2 last:border-0 hover:scale-[1.04] hover:text-cyan-300 transition-all duration-300 cursor-pointer group">
              <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 flex items-center justify-center flex-shrink-0">
                <Code2 className="h-5 w-5" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-[8px] uppercase tracking-wider text-cyan-400/50 font-mono">Projects Built</p>
                <p className="text-sm font-black text-white mt-0.5">4+</p>
                <p className="text-[8px] text-slate-400/80 font-mono">End-to-End AI Solutions</p>
              </div>
            </div>

            {/* Stat Node 2 */}
            <div className="flex items-center gap-3 justify-center md:justify-start border-r border-white/5 pr-2 last:border-0 hover:scale-[1.04] hover:text-cyan-300 transition-all duration-300 cursor-pointer group">
              <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 flex items-center justify-center flex-shrink-0">
                <Cpu className="h-5 w-5" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-[8px] uppercase tracking-wider text-cyan-400/50 font-mono">AI & ML Focus</p>
                <p className="text-sm font-black text-white mt-0.5">100%</p>
                <p className="text-[8px] text-slate-400/80 font-mono">Passionate & Dedicated</p>
              </div>
            </div>

            {/* Stat Node 3 */}
            <div className="flex items-center gap-3 justify-center md:justify-start border-r border-white/5 pr-2 last:border-0 hover:scale-[1.04] hover:text-cyan-300 transition-all duration-300 cursor-pointer group">
              <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 flex items-center justify-center flex-shrink-0">
                <Trophy className="h-5 w-5" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-[8px] uppercase tracking-wider text-cyan-400/50 font-mono">CGPA Achieved</p>
                <p className="text-sm font-black text-white mt-0.5">9.35</p>
                <p className="text-[8px] text-slate-400/80 font-mono">Consistent Performance</p>
              </div>
            </div>

            {/* Stat Node 4 */}
            <div className="flex items-center gap-3 justify-center md:justify-start last:border-0 hover:scale-[1.04] hover:text-cyan-300 transition-all duration-300 cursor-pointer group">
              <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 flex items-center justify-center flex-shrink-0">
                <Heart className="h-5 w-5" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-[8px] uppercase tracking-wider text-cyan-400/50 font-mono">Belief</p>
                <p className="text-sm font-black text-white mt-0.5">People First</p>
                <p className="text-[8px] text-slate-400/80 font-mono">Tech with a Purpose</p>
              </div>
            </div>

          </div>

        </motion.div>

      </div>

      {/* 3. Footer */}
      <footer className="relative z-10 w-full max-w-[1440px] mx-auto border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between text-[9px] font-mono tracking-[0.25em] text-amber-500/30 gap-3">
        <div>
          CORE OPERATIONAL LOAD // SECURE NODE
        </div>
        <div className="uppercase">
          © {new Date().getFullYear()} JIVITES DAMODAR // DESIGNED FOR SUPERIOR REASONING
        </div>
      </footer>

    </main>
  );
}
