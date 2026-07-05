import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Activity, ShieldCheck } from 'lucide-react';

export default function JarvisConsole({ activeSection, setActiveSection }) {
  const [logs, setLogs] = useState([
    { type: 'sys', text: 'Initializing Nexus developer environment...' },
    { type: 'sys', text: 'Node sync: active.' },
    { type: 'success', text: 'CONNECTION SECURED: END-TO-END QUANTUM CHANNEL ONLINE' },
    { type: 'info', text: 'Type "help" to view directory of commands.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const cmd = inputVal.toLowerCase().trim();
    const newLogs = [...logs, { type: 'user', text: `user@nexus:~$ ${inputVal}` }];

    switch (cmd) {
      case 'help':
        newLogs.push(
          { type: 'info', text: 'Available commands:' },
          { type: 'code', text: '  status       - Queries CPU load, Node latency, and telemetry metrics.' },
          { type: 'code', text: '  agents       - Queries cloud status of active AI agents.' },
          { type: 'code', text: '  projects     - Switches workspace to CleanTech grid console.' },
          { type: 'code', text: '  invest       - Switches workspace to Venture Pitch Vault.' },
          { type: 'code', text: '  clear        - Clears terminal output.' }
        );
        break;
      case 'status':
        newLogs.push(
          { type: 'sys', text: 'Querying node telemetry stats...' },
          { type: 'success', text: '  Node Host: kalyan.edge-14b [OPTIMAL]' },
          { type: 'success', text: '  Memory Leak Test: 0% [STABLE]' },
          { type: 'success', text: '  Client Latency: 12ms [EXCELLENT]' },
          { type: 'info', text: 'All micro-services reporting green status.' }
        );
        break;
      case 'agents':
        newLogs.push(
          { type: 'info', text: 'Cloud Agents Deployed:' },
          { type: 'code', text: '  1. ResumeForge (Resume drafting agent) -> Active' },
          { type: 'code', text: '  2. NexusCoder (Web app auto-generation) -> Labs' }
        );
        setActiveSection('agents');
        break;
      case 'projects':
        newLogs.push(
          { type: 'info', text: 'Projects status loaded.' }
        );
        setActiveSection('projects');
        break;
      case 'invest':
        newLogs.push(
          { type: 'success', text: 'Opening Venture Deck dashboard...' }
        );
        setActiveSection('investors');
        break;
      case 'clear':
        setLogs([]);
        setInputVal('');
        return;
      default:
        newLogs.push({ type: 'error', text: `Command "${cmd}" not recognized. Type "help" for a list of commands.` });
        break;
    }

    setLogs(newLogs);
    setInputVal('');
  };

  return (
    <div className="dev-panel p-4 flex flex-col h-full bg-[#18181b] text-zinc-300 font-mono text-[11px] leading-5 relative">
      
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-zinc-400" />
          <span className="font-semibold text-white tracking-wider font-sans">DEVELOPER SHELL</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono">
          <span className="flex items-center gap-0.5"><Cpu size={10} /> 3%</span>
          <span className="flex items-center gap-0.5"><Activity size={10} /> 12ms</span>
          <span className="flex items-center gap-0.5 text-emerald-500"><ShieldCheck size={10} /> encrypted</span>
        </div>
      </div>

      {/* Terminal log list */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 min-h-[160px]">
        {logs.map((log, idx) => {
          let color = 'text-zinc-400';
          if (log.type === 'sys') color = 'text-zinc-500';
          if (log.type === 'success') color = 'text-emerald-400 font-bold';
          if (log.type === 'info') color = 'text-blue-400';
          if (log.type === 'code') color = 'text-zinc-300';
          if (log.type === 'user') color = 'text-white';
          if (log.type === 'error') color = 'text-red-400 font-medium';

          return (
            <div key={idx} className={`${color} whitespace-pre-wrap`}>
              {log.text}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input prompt */}
      <form onSubmit={handleCommand} className="mt-2 border-t border-zinc-800 pt-2 flex items-center">
        <span className="text-emerald-500 mr-2">nexus@shell:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-zinc-700 caret-white"
          placeholder="Command..."
        />
      </form>
    </div>
  );
}
