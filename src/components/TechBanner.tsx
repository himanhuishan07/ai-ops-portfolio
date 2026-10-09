import React from 'react';

const skills = [
  { name: "Python", icon: <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor"><path d="M14.2 2.5c-4.4 0-4.6 1.9-4.6 1.9L9.5 7h4.8v1.6H5.7s-2.1-.2-2.1 4.5c0 4.6 2 4.4 2 4.4h2v-2.2c0-2.3 2-2.3 2-2.3h4.6c1.1 0 1.9-.8 1.9-1.9v-6c0-1.1-.9-1.9-1.9-1.9z"/><path d="M9.8 21.5c4.4 0 4.6-1.9 4.6-1.9l.1-2.6H9.7v-1.6h8.6s2.1.2 2.1-4.5c0-4.6-2-4.4-2-4.4h-2v2.2c0 2.3-2 2.3-2 2.3H9.8c-1.1 0-1.9.8-1.9 1.9v6c0 1.1.9 1.9 1.9 1.9z"/></svg> },
  { name: "PyTorch", icon: <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor"><path d="M17.4 5.3A15.3 15.3 0 0 0 12 4a15.3 15.3 0 0 0-5.4 1.3A14.6 14.6 0 0 0 2 12a14.6 14.6 0 0 0 4.6 6.7A15.3 15.3 0 0 0 12 20a15.3 15.3 0 0 0 5.4-1.3A14.6 14.6 0 0 0 22 12a14.6 14.6 0 0 0-4.6-6.7zM12 18.2a13.5 13.5 0 0 1-4.7-1.1 12.8 12.8 0 0 1-4.1-5.1 12.8 12.8 0 0 1 4.1-5.1 13.5 13.5 0 0 1 9.4 0 12.8 12.8 0 0 1 4.1 5.1 12.8 12.8 0 0 1-4.1 5.1A13.5 13.5 0 0 1 12 18.2z"/><path d="M12 6.8a5.2 5.2 0 1 0 0 10.4 5.2 5.2 0 0 0 0-10.4z"/></svg> },
  { name: "TensorFlow", icon: <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor"><path d="M11.3 2.2l-9 4.3 9.4 4.8 9.5-4.8-9.9-4.3zm0 6l-6.3-3.2 6-2.9 6.7 2.9-6.4 3.2zm-7.6 1.8v5.8l7.2 3.6v-6.2l-7.2-3.2zm8.6 3.8v6.2l7.7-3.9v-5.8l-7.7 3.5z"/></svg> },
  { name: "Docker", icon: <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor"><path d="M22.2 12.2c-.3-1.3-1.6-2.2-2.9-2.2h-1.5c-.2-.6-.5-1.1-1-1.6l-1.3 1.3c.3.3.5.7.6 1.1h-4.3V9.5h2.1V7.4h-2.1V5.2H9.6v2.1H7.5V5.2H5.4v2.1H3.3v2.1h2.1v1.4H3.3v2.1h8.5c.5 0 .9.1 1.3.3.4.2.7.6.9 1h5l3.2-2zM9.6 10.9H7.5V8.8h2.1v2.1zm2.1 0h-2.1V8.8h2.1v2.1zm2.1 0h-2.1V8.8h2.1v2.1zm-4.2-2.1H7.5V6.7h2.1v2.1zm2.1 0h-2.1V6.7h2.1v2.1zm2.1 0h-2.1V6.7h2.1v2.1z"/></svg> },
  { name: "Kubernetes", icon: <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12l10 10 10-10L12 2zM12 19l-7-7 7-7 7 7-7 7z"/><circle cx="12" cy="12" r="3"/></svg> },
  { name: "YOLOv8", icon: <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9M15 9v12"/></svg> },
  { name: "ROS 2", icon: <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="12" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg> },
  { name: "LLMs", icon: <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M9 10h.01M15 10h.01M12 10h.01"/></svg> },
  { name: "Agentic AI", icon: <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01M8.5 14l3.5-2 3.5 2"/></svg> },
  { name: "MLOps", icon: <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg> },
  { name: "Computer Vision", icon: <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg> }
];

export default function TechBanner() {
  return (
    <div className="w-full overflow-hidden bg-[#080c14]/90 backdrop-blur-md border-y border-[#00f0ff]/20 py-6 relative flex items-center mt-20">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#080c14] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#080c14] to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] transition-all cursor-default">
        {[...skills, ...skills, ...skills, ...skills].map((skill, idx) => (
          <div key={idx} className="flex items-center justify-center px-12 min-w-max gap-4">
            <div className="opacity-80 hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
              {skill.icon}
            </div>
            
            <span className="text-lg font-mono font-bold text-slate-300 tracking-widest uppercase hover:text-[#00f0ff] transition-colors duration-300">
              {skill.name}
            </span>
            <span className="ml-12 text-[#00f0ff]/30 font-bold">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}