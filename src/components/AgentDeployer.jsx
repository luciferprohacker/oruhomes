import React, { useState } from 'react';
import { Sparkles, RefreshCw, FileText, CheckCircle2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AgentDeployer() {
  const [formData, setFormData] = useState({
    name: 'Kalyan Mehta',
    role: 'Lead Systems Architect',
    skills: 'Golang, Rust, Kubernetes, Distributed Databases, eBPF, AWS',
    experience: 'Principal Developer at Stripe (2046-2050), Systems Engineer at Cloudflare (2042-2046)'
  });
  const [compiling, setCompiling] = useState(false);
  const [resumeResult, setResumeResult] = useState(null);

  const handleCompile = (e) => {
    e.preventDefault();
    setCompiling(true);
    setTimeout(() => {
      setCompiling(false);
      setResumeResult({ ...formData });
    }, 1500);
  };

  return (
    <section id="playground" className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5">
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase">
          Interactive Sandbox
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          Agent Playground: ResumeForge
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Test our recruit agent. Input your professional telemetry data and compile an optimized engineering CV profile.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input Panel */}
        <div className="bg-[#09090b] border border-white/5 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase font-mono tracking-wider text-zinc-500">
            Agent Input Variables
          </h3>

          <form onSubmit={handleCompile} className="space-y-4 text-xs font-medium text-zinc-300">
            <div className="space-y-1.5">
              <label className="block text-zinc-450">FULL NAME</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#030303] border border-white/5 rounded-lg p-3 text-white outline-none focus:border-zinc-500 transition-all font-mono"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-zinc-450">DESIGNATION ROLE</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full bg-[#030303] border border-white/5 rounded-lg p-3 text-white outline-none focus:border-zinc-500 transition-all font-mono"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-zinc-450">CORE COMPETENCIES (COMMA SEPARATED)</label>
              <textarea
                value={formData.skills}
                rows={2}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                className="w-full bg-[#030303] border border-white/5 rounded-lg p-3 text-white outline-none focus:border-zinc-500 transition-all font-mono resize-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-zinc-450">WORK EXPERIENCE HISTORY</label>
              <textarea
                value={formData.experience}
                rows={2}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="w-full bg-[#030303] border border-white/5 rounded-lg p-3 text-white outline-none focus:border-zinc-500 transition-all font-mono resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={compiling}
              className="btn-primary w-full py-3 flex items-center justify-center gap-2 rounded-lg font-bold text-xs"
            >
              {compiling ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  COMPILING CV MATRIX...
                </>
              ) : (
                <>
                  <Sparkles size={14} /> Run Compiler Agent
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Document Preview */}
        <div className="bg-[#09090b] border border-white/5 rounded-2xl p-6 min-h-[340px] flex flex-col justify-between relative">
          <span className="absolute top-4 right-6 text-[9px] font-mono text-zinc-650 uppercase tracking-widest">
            Render Preview
          </span>

          <AnimatePresence mode="wait">
            {compiling && (
              <motion.div 
                key="compiling"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center font-mono text-xs text-zinc-450 space-y-3"
              >
                <RefreshCw size={24} className="animate-spin text-zinc-400" />
                <span>Running parsing sequences...</span>
              </motion.div>
            )}

            {!compiling && !resumeResult && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center font-sans text-xs text-zinc-500 space-y-2 py-10"
              >
                <FileText size={32} className="text-zinc-650" />
                <span>Await agent output. Fill forms and click "Run Compiler Agent" to render profile.</span>
              </motion.div>
            )}

            {!compiling && resumeResult && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col justify-between"
              >
                <div className="space-y-5 text-zinc-200">
                  {/* Clean PDF-Style Header */}
                  <div className="border-b border-white/10 pb-3">
                    <h4 className="text-base font-bold text-white tracking-wide">{resumeResult.name}</h4>
                    <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5">{resumeResult.role}</p>
                  </div>

                  {/* Sections */}
                  <div className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500 font-bold block uppercase tracking-widest">[TECHNICAL MATRIX]</span>
                      <p className="text-zinc-300 leading-5">{resumeResult.skills}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500 font-bold block uppercase tracking-widest">[PROFESSIONAL LOGS]</span>
                      <p className="text-zinc-300 leading-5">{resumeResult.experience}</p>
                    </div>
                  </div>
                </div>

                {/* Download bar */}
                <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center">
                  <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-bold font-mono">
                    <CheckCircle2 size={13} /> SCORE: 98/100 (Optimal)
                  </span>
                  <button 
                    onClick={() => alert("Downloading resume PDF...")}
                    className="btn-secondary text-xs py-1.5 px-3"
                  >
                    <Download size={11} /> Export PDF
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
