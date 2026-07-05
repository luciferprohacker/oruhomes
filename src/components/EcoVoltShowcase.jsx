import React, { useState, useEffect } from 'react';
import { Zap, Cpu, Activity, BatteryCharging, Thermometer } from 'lucide-react';

export default function EcoVoltShowcase() {
  const [telemetry, setTelemetry] = useState({
    voltage: 480.24,
    frequency: 60.02,
    temp: 24.5,
    charge: 82
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry(prev => ({
        voltage: +(prev.voltage + (Math.random() - 0.5) * 0.1).toFixed(2),
        frequency: +(60 + (Math.random() - 0.5) * 0.02).toFixed(2),
        temp: +(prev.temp + (Math.random() - 0.5) * 0.05).toFixed(2),
        charge: prev.charge >= 100 ? 70 : prev.charge + 1
      }));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="ecovolt" className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5">
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/20 border border-cyan-500/20 px-2.5 py-1 rounded-full uppercase">
          CleanTech Division
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          EcoVolt Superconducting Grid Node
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Monitor our zero-loss power routing arrays utilizing cryogenic graphene storage. Designed for next-generation smart-city load balancing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Live Grid Telemetries */}
        <div className="lg:col-span-2 bg-[#09090b] border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <h3 className="text-xs font-semibold text-white uppercase font-mono tracking-wider text-zinc-500 flex items-center gap-1.5">
              <Activity size={14} className="text-cyan-400" /> Grid Node Telemetry
            </h3>
            <span className="flex items-center gap-1.5 text-xs text-emerald-450 font-bold font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              ACTIVE
            </span>
          </div>

          {/* Metric details */}
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 bg-[#030303] border border-white/5 rounded-xl">
              <span className="text-zinc-500 text-[10px] block uppercase">OUTPUT CURRENT</span>
              <span className="text-sm font-bold text-white block mt-1">{telemetry.voltage} KV</span>
            </div>
            <div className="p-3 bg-[#030303] border border-white/5 rounded-xl">
              <span className="text-zinc-500 text-[10px] block uppercase">GRID FREQUENCY</span>
              <span className="text-sm font-bold text-white block mt-1">{telemetry.frequency} Hz</span>
            </div>
            <div className="p-3 bg-[#030303] border border-white/5 rounded-xl">
              <span className="text-zinc-500 text-[10px] block uppercase">TEMPERATURE</span>
              <span className="text-sm font-bold text-white block mt-1">{telemetry.temp}°C</span>
            </div>
            <div className="p-3 bg-[#030303] border border-white/5 rounded-xl">
              <span className="text-zinc-500 text-[10px] block uppercase">PROCESS CAPACITY</span>
              <span className="text-sm font-bold text-white block mt-1">99.88% [OPTIMAL]</span>
            </div>
          </div>

          {/* Dynamic Graphene Accumulator visual */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-400 font-semibold flex items-center gap-1.5">
                <BatteryCharging size={14} className="text-cyan-400" /> Graphene Capacitance
              </span>
              <span className="text-cyan-400 font-bold">{telemetry.charge}% Deployed</span>
            </div>
            
            <div className="w-full bg-[#030303] border border-white/5 rounded-lg p-2 flex gap-1 items-center h-10">
              {Array.from({ length: 10 }).map((_, i) => {
                const active = telemetry.charge >= (i + 1) * 10;
                return (
                  <div
                    key={i}
                    className="flex-1 h-full rounded transition-all duration-300"
                    style={{
                      backgroundColor: active ? '#22d3ee' : 'rgba(255, 255, 255, 0.02)',
                      boxShadow: active ? '0 0 6px rgba(34, 211, 238, 0.3)' : 'none'
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Corporate Specifications */}
        <div className="lg:col-span-1 bg-[#09090b] border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase font-mono tracking-wider text-zinc-500 flex items-center gap-1.5">
              <Zap size={14} className="text-cyan-400" /> Technology Highlights
            </h3>
            
            <ul className="space-y-3.5 text-xs text-zinc-400 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">»</span>
                <span><strong>Zero-Loss Grid:</strong> Superconducting nodes minimize resistive losses over transmission paths.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">»</span>
                <span><strong>Neural Load Balancer:</strong> Predicts local power spikes 15 minutes before they occur.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">»</span>
                <span><strong>Cryogenic Operations:</strong> Graphene-core capacitors operates under automated cooling loops.</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs">
            <span className="text-[10px] text-zinc-500 font-mono uppercase font-bold">Grid Class: Core</span>
            <button 
              onClick={() => alert("Loading technical documentation...")}
              className="btn-secondary text-[11px] py-1 px-3.5"
            >
              Specifications
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
