import React from 'react';
import Navbar from './Navbar';
import AgentDeployer from './AgentDeployer';
import EcoVoltShowcase from './EcoVoltShowcase';
import InvestorPitch from './InvestorPitch';
import JarvisConsole from './JarvisConsole';
import { ArrowRight, Bot, Zap, Coins, Globe, GitBranch, Cpu } from 'lucide-react';

export default function HUDDashboard() {
  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black font-sans relative">
      {/* Background glow */}
      <div className="hero-glow"></div>

      {/* Corporate Navbar */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative max-w-5xl mx-auto px-6 pt-24 pb-16 text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          Platform Build: Deployed and Active
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-gradient">
          Building the Infrastructure<br />of the 2050 Tech Frontier
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
          An autonomous technology incubator and venture ecosystem. We deploy scalable AI agents, design smart superconducting power grids, and simulate predictive financial SaaS modules.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <a href="#playground" className="btn-primary">
            Launch AI Agents
          </a>
          <a href="#investors" className="btn-secondary">
            Venture Projections
          </a>
        </div>
      </section>

      {/* BENTO PRODUCT GRID */}
      <section id="products" className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
            Incubator Portfolio
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Our Core Technology Divisions
          </h2>
        </div>

        <div className="bento-grid">
          {/* Card 1: AI Agents (SaaS) */}
          <div className="bento-card col-span-12 md:col-span-8 flex flex-col justify-between min-h-[220px]">
            <div className="space-y-2">
              <Bot size={20} className="text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Autonomous AI Agent Fleet</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Self-managing developer agents, security auditors, and recruit generators. Deployed as scalable API nodes, our flagship tool **ResumeForge** generates optimized resumes in real-time based on system telemetry.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-mono">STATUS: 3 DEPLOYED</span>
              <a href="#playground" className="text-white font-semibold flex items-center gap-1 hover:underline">
                Enter Sandbox <ArrowRight size={12} />
              </a>
            </div>
          </div>

          {/* Card 2: CleanTech */}
          <div className="bento-card col-span-12 md:col-span-4 flex flex-col justify-between min-h-[220px]">
            <div className="space-y-2">
              <Zap size={20} className="text-cyan-400" />
              <h3 className="text-lg font-bold text-white">EcoVolt CleanTech</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Superconducting grid networks using solid-state graphene capacitors for zero-loss long-distance distribution.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-mono">STATUS: PILOT LAB</span>
              <a href="#ecovolt" className="text-white font-semibold flex items-center gap-1 hover:underline">
                Grid Telemetry <ArrowRight size={12} />
              </a>
            </div>
          </div>

          {/* Card 3: Venture Projections */}
          <div className="bento-card col-span-12 md:col-span-4 flex flex-col justify-between min-h-[220px]">
            <div className="space-y-2">
              <Coins size={20} className="text-amber-400" />
              <h3 className="text-lg font-bold text-white">Venture Series A</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Open capital seed round targeting $12M valuation cap. Compounding returns model simulated for institutional partners.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-mono">STATUS: ROUND OPEN</span>
              <a href="#investors" className="text-white font-semibold flex items-center gap-1 hover:underline">
                Valuation Calculator <ArrowRight size={12} />
              </a>
            </div>
          </div>

          {/* Card 4: R&D Labs */}
          <div className="bento-card col-span-12 md:col-span-8 flex flex-col justify-between min-h-[220px]">
            <div className="space-y-2">
              <Cpu size={20} className="text-zinc-400" />
              <h3 className="text-lg font-bold text-white">Advanced R&D Projects</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Investigating neural sync arrays, telemetry bio-sync modules, and plasma ion thrusters designed for micro-satellite stabilization in low-Earth orbit.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>STATUS: THEORETICAL LABS</span>
              <span>CODENAME: NEURAL PROBE</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PLAYGROUND (RESUME BUILDER) */}
      <AgentDeployer />

      {/* ECOVOLT GRID telemetry */}
      <EcoVoltShowcase />

      {/* INVESTOR PITCH DECK & VALUATIONS */}
      <InvestorPitch />

      {/* SYSTEM FEEDBACK DEV TERMINAL CARD */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-bold text-white">Developer Shell</h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-medium">
              Run local diagnostic scans and check active cloud deployments. Type command strings to fetch simulated API readouts.
            </p>
          </div>
          <div className="lg:col-span-2">
            <JarvisConsole />
          </div>
        </div>
      </section>

      {/* CORPORATE FOOTER */}
      <footer className="border-t border-white/5 bg-[#050507] py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-zinc-500 font-medium">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold">
              <Globe size={14} />
              <span>KALYAN NEXUS</span>
            </div>
            <p className="leading-relaxed">
              Engineering the software, energy, and incubation architectures for the 2050 technological frontier.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-bold text-zinc-400 font-mono uppercase tracking-wider">Divisions</span>
            <div className="flex flex-col gap-2">
              <a href="#playground" className="hover:text-white transition-colors">AI Playground</a>
              <a href="#ecovolt" className="hover:text-white transition-colors">EcoVolt Grid</a>
              <a href="#products" className="hover:text-white transition-colors">Incubations</a>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-bold text-zinc-400 font-mono uppercase tracking-wider">Venture round</span>
            <div className="flex flex-col gap-2">
              <a href="#investors" className="hover:text-white transition-colors">Series A Funding</a>
              <a href="#investors" className="hover:text-white transition-colors">Stake Calculator</a>
              <a href="#" className="hover:text-white transition-colors">Venture Prospectus</a>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-bold text-zinc-400 font-mono uppercase tracking-wider">Connect</span>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1"><GitBranch size={12} /> GitHub</a>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1"><Globe size={12} /> Edge Network</a>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto pt-8 border-t border-white/5 mt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-650 font-mono">
          <span>© 2050 KALYAN TECHNOLOGY GROUP INC. ALL RIGHTS RESERVED.</span>
          <span className="mt-2 sm:mt-0">SEC CAP TABLE SECURITY: VERIFIED</span>
        </div>
      </footer>

    </div>
  );
}
