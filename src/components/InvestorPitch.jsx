import React, { useState } from 'react';
import { Coins, Target, TrendingUp, BarChart2, Calculator } from 'lucide-react';

export default function InvestorPitch() {
  const [funding, setFunding] = useState(500000);
  const [growth, setGrowth] = useState(1.5); // multiplier

  const equityStake = ((funding / 12000000) * 10).toFixed(3);
  const projectedReturn5Y = Math.round(funding * Math.pow(growth, 5));

  return (
    <section id="investors" className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5">
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-mono font-bold tracking-widest text-amber-400 bg-amber-950/20 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase">
          Venture Projections
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          Venture Capital Round: Series A
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Access seed funding rounds, valuation cap tables, and simulated growth vectors for the Kalyan Tech Nexus portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Yield Projections Simulator */}
        <div className="bg-[#09090b] border border-white/5 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
          <div className="border-b border-white/5 pb-3">
            <h3 className="text-xs font-semibold text-white uppercase font-mono tracking-wider text-zinc-500 flex items-center gap-1.5">
              <Calculator size={14} className="text-amber-400" /> Investment Yield Projections
            </h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-500">YOUR FUNDING COMMITMENT:</span>
                <span className="text-white font-bold">${funding.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min="100000"
                max="2000000"
                step="50000"
                value={funding}
                onChange={(e) => setFunding(Number(e.target.value))}
                className="w-full h-[3px] bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-500">ESTIMATED COMPOUND GROWTH RATE:</span>
                <span className="text-white font-bold">{growth}x / Year</span>
              </div>
              <input
                type="range"
                min="1.2"
                max="2.0"
                step="0.1"
                value={growth}
                onChange={(e) => setGrowth(Number(e.target.value))}
                className="w-full h-[3px] bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>

          {/* Calculator Output */}
          <div className="p-4 bg-[#030303] border border-white/5 rounded-xl font-mono text-xs space-y-2.5">
            <div className="flex justify-between">
              <span className="text-zinc-500">Calculated Equity Allocation:</span>
              <span className="text-emerald-400 font-semibold">{equityStake}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Projected 5-Year Return:</span>
              <span className="text-emerald-400 font-semibold">${projectedReturn5Y.toLocaleString()} USD</span>
            </div>
            <div className="flex justify-between border-t border-zinc-900 pt-2.5 mt-2.5">
              <span className="text-zinc-400">Total Return Yield:</span>
              <span className="text-amber-500 font-bold">{(projectedReturn5Y / funding).toFixed(1)}x return multipliers</span>
            </div>
          </div>

          <button 
            onClick={() => alert("Securing investor communication channel...")}
            className="btn-primary w-full py-3 flex items-center justify-center font-bold text-xs"
          >
            Request Venture Prospectus
          </button>
        </div>

        {/* Projections Matrix */}
        <div className="bg-[#09090b] border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase font-mono tracking-wider text-zinc-500 flex items-center gap-1.5">
              <BarChart2 size={14} className="text-amber-400" /> Capital Allocation Core
            </h3>

            <div className="space-y-3.5 text-xs font-medium text-zinc-400">
              <div className="flex items-start gap-2.5">
                <span className="text-zinc-500">01.</span>
                <span><strong>SaaS Revenue Modules:</strong> Automatic monthly billing loops for NexusCoder automation and transactional fees on AlphaMarket trading agents.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-zinc-500">02.</span>
                <span><strong>CleanTech Grid Licensing:</strong> Royalties collected from regional municipal grids utilizing the EcoVolt load-balancing framework.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-zinc-500">03.</span>
                <span><strong>Scale Infrastructure:</strong> 40% of capital reserves are deployed directly to GPU clustering and hardware telemetry nodes.</span>
              </div>
            </div>
          </div>

          {/* Seed summary grid */}
          <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-4 text-xs font-mono">
            <div>
              <span className="text-zinc-500 text-[10px] block uppercase">ROUND CAP SIZE</span>
              <span className="text-sm font-bold text-white mt-0.5 block">$12,000,000</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block uppercase">VALUATION LIMIT</span>
              <span className="text-sm font-bold text-white mt-0.5 block">$120,000,000</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
