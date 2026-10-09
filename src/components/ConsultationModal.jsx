"use client";

import { useState, useEffect } from "react";
import { X, Send, Terminal, Cpu, CheckCircle2, AlertCircle } from "lucide-react";

export default function ConsultationModal({ isOpen, onClose }) {
  // State machine for form lifecycle: "idle" | "processing" | "success" | "error"
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Global listener to gracefully unmount modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("processing");
    setErrorMsg("");

    try {
      const formData = new FormData(e.target);
      // Web3Forms API Key (Environment variable ya fallback string)
      formData.append(
        "access_key", 
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY"
      );

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        e.target.reset();
        setTimeout(() => {
          setStatus("idle");
          onClose();
        }, 2500);
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Transmission failed. Please email directly.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Network packet loss detected. Please email directly.");
    }
  };

  return (
    // Backdrop Overlay
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Modal Card Wrapper */}
      <div 
        className="relative w-full max-w-lg glass-panel p-1 rounded-2xl bg-brand-card/90 overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.15)] border border-brand-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow Ambient Border */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-60" />
        
        <div className="p-6 md:p-8">
          {/* Modal Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-brand-accent" />
                INITIATE_COMM_LINK
              </h2>
              <p className="text-sm text-slate-400 mt-1 font-mono">
                Direct transmission channel for AI deployment & MLOps strategy.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-brand-accent hover:bg-brand-accent/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dynamic Content Views based on Status State */}
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
              <h3 className="text-lg font-bold text-slate-100 font-mono">TRANSMISSION_SUCCESSFUL</h3>
              <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
                Your payload has been routed to my inbox. I will review the requirements and establish a return connection shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-brand-accent">CLIENT_IDENTIFIER // Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Enter your name or enterprise"
                  className="w-full bg-[#050a14]/60 border border-brand-border rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand-accent/70 focus:ring-1 focus:ring-brand-accent/70 transition-all font-mono text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-brand-accent">RETURN_VECTOR // Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="name@company.com"
                  className="w-full bg-[#050a14]/60 border border-brand-border rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand-accent/70 focus:ring-1 focus:ring-brand-accent/70 transition-all font-mono text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-brand-accent">PAYLOAD_PARAMETERS // Requirements</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  placeholder="Detail your computer vision pipeline, LLM deployment, or MLOps infrastructure needs..."
                  className="w-full bg-[#050a14]/60 border border-brand-border rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand-accent/70 focus:ring-1 focus:ring-brand-accent/70 transition-all resize-none text-sm font-sans"
                />
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 p-3 bg-red-950/50 border border-red-500/40 rounded-lg text-xs font-mono text-red-400">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === "processing"}
                className="w-full flex items-center justify-center gap-2 bg-brand-accent text-slate-950 font-bold py-3 px-4 rounded-lg hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all disabled:opacity-70 disabled:cursor-wait font-mono text-sm"
              >
                {status === "processing" ? (
                  <span className="flex items-center gap-2 animate-pulse">
                    <Cpu className="w-4 h-4 animate-spin text-slate-950" /> TRANSMITTING_PAYLOAD...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> TRANSMIT_REQUEST
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}