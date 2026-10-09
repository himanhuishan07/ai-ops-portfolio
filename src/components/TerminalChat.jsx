"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, TerminalSquare, Minus } from 'lucide-react';

export default function TerminalChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', content: 'SYSTEM ONLINE. OFFLINE INFERENCE ENGINE INITIALIZED.\nType "help" to view available directives.' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // O(1) Hash Map for static command routing
  const commandRegistry = {
    "help": "AVAILABLE DIRECTIVES:\n> about   :: Display engineer profile\n> skills  :: List technical stack & architecture\n> contact :: Initialize communication protocol",
    "about": "PROFILE: Senior AI Engineer.\nSPECIALIZATION: End-to-end ML pipelines, Edge AI deployment, and Generative AI applications.",
    "skills": "TECH STACK:\n- Languages: Python, Go, Rust, JavaScript\n- AI/ML: PyTorch, TensorFlow, Hailo-8 NPU, CUDA, Ollama\n- Architecture: Docker, Kubernetes, ROS 2, MAVLink\n- Frontend: React, Three.js (React Three Fiber)",
    "contact": "COMMUNICATION PROTOCOL:\nLink established. Please connect via LinkedIn or review repositories on GitHub to initiate data transfer."
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedInput = input.trim().toLowerCase();
    if (!sanitizedInput) return;

    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');

    // Fallback logic for unmapped commands
    setTimeout(() => {
      const botReply = commandRegistry[sanitizedInput] 
        || `[WARN]: Command '${sanitizedInput}' not recognized by local runtime.\nType 'help' for valid parameters.`;
      
      setMessages((prev) => [...prev, { role: 'assistant', content: botReply }]);
    }, 400); // Artificial delay to simulate processing overhead
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-brand-card border border-brand-accent/50 text-brand-accent rounded-full shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:bg-brand-accent/10 transition-all group"
      >
        <TerminalSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 md:w-[400px] flex flex-col glass-panel bg-brand-bg/95 border border-brand-border rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-3 border-b border-brand-border bg-[#0a1122]">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          EDGE_NODE :: offline-v1.0
        </div>
        <Minus className="w-4 h-4 cursor-pointer text-slate-400 hover:text-brand-accent transition-colors" onClick={() => setIsOpen(false)} />
      </div>

      <div ref={scrollRef} className="flex-1 h-[350px] p-4 overflow-y-auto space-y-4 custom-scrollbar font-mono text-xs">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <span className={`px-3 py-2 rounded-lg max-w-[85%] break-words whitespace-pre-wrap ${
              msg.role === 'user' 
                ? 'bg-brand-accent/10 border border-brand-accent/30 text-brand-accent' 
                : 'bg-[#050a14]/60 border border-brand-border text-slate-300'
            }`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-brand-border bg-[#050a14]">
        <div className="relative flex items-center">
          <span className="absolute left-3 text-brand-accent text-xs font-mono font-bold">{">"}</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Input command..."
            spellCheck="false"
            autoComplete="off"
            className="w-full bg-transparent border border-brand-border rounded-lg pl-8 pr-10 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-brand-accent/60 transition-all"
          />
          <button 
            type="submit" 
            disabled={!input.trim()}
            className="absolute right-2 p-1.5 bg-brand-accent/10 text-brand-accent rounded hover:bg-brand-accent hover:text-black disabled:opacity-50 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}