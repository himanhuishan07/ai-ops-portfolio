"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Cpu, Eye, Network, Server, Terminal, Shield, ArrowUpRight, Github, Mail, Globe, Radio } from "lucide-react";
import TechBanner from '@/components/TechBanner';
import Footer from '@/components/Footer';
import TerminalChat from '@/components/TerminalChat';
import AudioToggle from '@/components/AudioToggle';
import ImpactGraphCanvas from '@/components/ImpactGraphCanvas';
import ConsultationModal from '@/components/ConsultationModal';

// Dynamically import the 3D canvas to prevent server-side rendering errors
const ThreeCanvas = dynamic(() => import("@/components/ThreeCanvas"), { ssr: false });

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="relative w-full min-h-screen bg-transparent text-slate-100 overflow-x-hidden">
      
      {/* =========================================================
          LAYER 0: WebGL Background Canvas (Fixed behind everything)
          ========================================================= */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
        <ThreeCanvas />
      </div>

      {/* =========================================================
          LAYER 1: DOM User Interface Overlays (Z-index 10)
          ========================================================= */}
      <div className="relative z-10 w-full flex flex-col items-center pointer-events-none">
        <div className="pointer-events-auto">
          <AudioToggle />
        </div>
        
        {/* Main Content Wrapper */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-8 space-y-20 pointer-events-auto">
          
          {/* Navigation Header with Added Icons & Comm Links */}
          <header className="flex justify-between items-center py-4 border-b border-brand-border glass-panel px-6 rounded-xl backdrop-blur-md bg-brand-card/60">
            <div className="text-xl font-bold tracking-wider text-brand-accent flex items-center gap-2">
              <Terminal className="w-5 h-5" /> HG // AI_OPS
            </div>
            
            <nav className="hidden md:flex gap-8 text-sm text-brand-text font-medium items-center">
              <a href="#about" className="hover:text-brand-accent transition">About Us</a>
              <a href="#capabilities" className="hover:text-brand-accent transition">Navigation</a>
              <a href="#telemetry" className="hover:text-brand-accent transition">Telemetry</a>
              <a href="#telemetry" className="hover:text-brand-accent transition">ROI Calculator</a>
              <Link href="/logs" className="hover:text-brand-accent transition flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Engineering Logs
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <a href="https://github.com/himanshuishan07" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-accent transition">
                <Github className="w-4 h-4" />
              </a>
              <a href="mailto:gaurhimanshu164@gmail.com" title="Direct Email" className="text-slate-400 hover:text-brand-accent transition">
                <Mail className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-xs font-semibold bg-brand-accent/10 border border-brand-accent/40 text-brand-accent rounded-lg hover:bg-brand-accent hover:text-black transition"
              >
                COMM LINK
              </button>
            </div>
          </header>

          {/* Hero Section */}
          <section id="about" className="grid md:grid-cols-2 gap-8 items-center pt-6 min-h-[60vh]">
            <div className="space-y-6 glass-panel p-8 rounded-2xl backdrop-blur-md bg-brand-card/40 border border-brand-border shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                AVAILABLE FOR REMOTE & ON-SITE DEPLOYMENTS
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Himanshu Gaur
              </h1>
              <p className="text-xl font-medium text-brand-accent font-mono">
                Senior AI Engineer & MLOps Specialist
              </p>
              <p className="text-slate-300 leading-relaxed max-w-xl">
                Architecting and deploying production-grade Machine Learning, LLMs, and Agentic AI solutions for global clients. Specializing in computer vision, real-time perception pipelines, Hailo-8 NPU hardware acceleration, and establishing automated enterprise MLOps ecosystems.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="/resume.pdf"
                  download="Himanshu_Gaur_Resume.pdf"
                  className="flex items-center justify-center gap-2 px-6 py-2 bg-brand-accent text-black font-semibold rounded-lg hover:bg-white transition"
                >
                  Download Resume
                </a>
                
                {/* Client Consultation Button Connected to Modal */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 glass-panel text-slate-200 font-semibold text-sm rounded-lg hover:border-brand-accent transition flex items-center gap-2 bg-brand-card/60 backdrop-blur-md border border-transparent"
                >
                  Book Client Consultation <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Social Media & Dual Email Comm Links */}
              <div className="flex flex-wrap gap-6 mt-6 border-t border-slate-800 pt-6">
                <a href="https://linkedin.com/in/himanshu-gaur-bb37a8241" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 font-mono text-sm transition-colors">
                  [ LINKEDIN ]
                </a>
                <a href="https://github.com/himanshuishan07" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 font-mono text-sm transition-colors">
                  [ GITHUB ]
                </a>
                <a href="mailto:gaurhimanshu164@gmail.com" className="text-slate-400 hover:text-cyan-400 font-mono text-sm transition-colors">
                  [ GMAIL ]
                </a>
                <a href="mailto:gaurhimanshu300@gmail.com" className="text-slate-400 hover:text-cyan-400 font-mono text-sm transition-colors">
                  [ OUTLOOK ]
                </a>
              </div>
            </div>

            {/* Empty right column for 3D canvas visibility */}
            <div className="hidden md:block"></div>
          </section>

          {/* Core Engineering Capabilities */}
          <section id="capabilities" className="space-y-8 glass-panel p-8 rounded-2xl backdrop-blur-md bg-brand-card/40 border border-brand-border">
            <div className="border-l-4 border-brand-accent pl-4">
              <h2 className="text-2xl font-bold">CORE ENGINEERING CAPABILITIES</h2>
              <p className="text-sm text-brand-text font-mono">Hardware Acceleration & Inference Optimization</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-brand-bg/60 p-6 rounded-xl space-y-4 hover:border-brand-accent/60 border border-transparent transition">
                <Cpu className="w-8 h-8 text-brand-accent" />
                <h3 className="text-lg font-bold">Edge AI & Computer Vision</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Real-time perception pipelines using YOLOv8/YOLOv22, SuperVision, Depth and ByteTrack. Deployments optimized for Raspberry Pi 5, Hailo-8 NPU acceleration, and NVIDIA Jetson platforms.
                </p>
              </div>
              <div className="bg-brand-bg/60 p-6 rounded-xl space-y-4 hover:border-brand-accent/60 border border-transparent transition">
                <Network className="w-8 h-8 text-brand-accent" />
                <h3 className="text-lg font-bold">Generative AI & Agentic Systems</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Custom agentic architectures, local Ollama LLM deployments, Enterprise VLMs, LiteLLM routing layers, and high-throughput streaming integrations.
                </p>
              </div>
              <div className="bg-brand-bg/60 p-6 rounded-xl space-y-4 hover:border-brand-accent/60 border border-transparent transition">
                <Server className="w-8 h-8 text-brand-accent" />
                <h3 className="text-lg font-bold">Enterprise MLOps & Data Pipelines</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Feature store orchestration using Feast, model registry automation with MLflow/Kubeflow, Docker containerization, and Kubernetes cluster deployments.
                </p>
              </div>
              <div className="bg-brand-bg/60 p-6 rounded-xl space-y-4 hover:border-brand-accent/60 border border-transparent transition md:col-start-2">
                <Network className="w-8 h-8 text-brand-accent" />
                <h3 className="text-lg font-bold">Embedded Firmware & Real-Time Systems</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Bare-metal C/C++ MCU control, FreeRTOS deterministic task scheduling, noise-resilient RS485/CAN-bus protocols, on-chip digital sensor filtering, and low-latency hardware-software orchestration.
                </p>
              </div>
            </div>
          </section>

          {/* Production Workloads */}
          <section id="workloads" className="space-y-8 glass-panel p-8 rounded-2xl backdrop-blur-md bg-brand-card/40 border border-brand-border">
            <div className="border-l-4 border-brand-accent pl-4">
              <h2 className="text-2xl font-bold">PRODUCTION WORKLOADS AND CLIENT</h2>
              <p className="text-sm text-brand-text font-mono">Selected Engineering Deployments</p>
            </div>
            
            {/* Changed from 3-col grid to row-wise stacking flex container */}
            <div className="flex flex-col gap-6">
              
              <div className="bg-brand-bg/60 p-6 rounded-xl space-y-3">
                <span className="text-xs font-mono text-brand-accent">EDGE DEPLOYMENT</span>
                <h3 className="text-lg font-bold">Edge AI Interceptor Drone Tracking</h3>
                <p className="text-xs text-slate-400">
                  Raspberry Pi 5 + Hailo-8 NPU hardware acceleration running YOLOv8/YOLOv11/YOLOV22 AI detection, ByteTrack multi-object vectoring, Depth and MAVLink flight control integration.
                </p>
              </div>
              
              <div className="bg-brand-bg/60 p-6 rounded-xl space-y-3">
                <span className="text-xs font-mono text-brand-accent">SIMULATION & TELEMETRY</span>
                <h3 className="text-lg font-bold">Enterprise Digital Twin Platform</h3>
                <p className="text-xs text-slate-400">
                  Physics-Informed Neural Networks (PINNs), NVIDIA Isaac Sim, Extended Kalman Filtering state estimation, and ROS 2 telemetry streaming infrastructure.
                </p>
              </div>
              
              <div className="bg-brand-bg/60 p-6 rounded-xl space-y-3">
                <span className="text-xs font-mono text-brand-accent">DATA INFRASTRUCTURE</span>
                <h3 className="text-lg font-bold">MLOps Feast Feature Store Pipeline</h3>
                <p className="text-xs text-slate-400">
                  End-to-end price prediction model with online feature retrieval via Feast feature store, Python inference servers, and automated registry tracking.
                </p>
              </div>
              
              <div className="bg-brand-bg/60 p-6 rounded-xl space-y-3">
                <span className="text-xs font-mono text-brand-accent">EMBEDDED ROBOTICS & COMMUNICATIONS</span>
                <h3 className="text-lg font-bold">Subterranean Pipeline Crawler & Telemetry Suite</h3>
                <p className="text-xs text-slate-400">
                  Dual-node C/C++ MCU firmware, deterministic CRC-16 protocol parsing over 100m umbilical lines, multi-threaded PyQt5 ground control UI, and real-time IMU filter routines with AHD video stream multiplexing.
                </p>
              </div>
              
            </div>
          </section>
          
          {/* Career Telemetry */}
          <section id="telemetry" className="space-y-8 glass-panel p-8 rounded-2xl backdrop-blur-md bg-brand-card/40 border border-brand-border">
            <div className="border-l-4 border-brand-accent pl-4">
              <h2 className="text-2xl font-bold">CAREER TELEMETRY</h2>
              <p className="text-sm text-brand-text font-mono">Professional Timeline</p>
            </div>
            <div className="space-y-4">
              <div className="bg-brand-bg/60 p-6 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold">Senior AI Engineer</h3>
                  <p className="text-sm text-brand-accent font-mono">PEYMAGEN INFORMATICS & AUTOMATION PRIVATE LIMITED</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Leading production AI architectures, edge vision pipelines, and scalable enterprise intelligence systems.
                  </p>
                </div>
                <div className="text-xs font-mono text-slate-400 bg-brand-border/50 px-3 py-1.5 rounded-lg self-start md:self-auto">
                  June 2026 - Present
                </div>
              </div>
              <div className="bg-brand-bg/60 p-6 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold">Machine Learning Engineer</h3>
                  <p className="text-sm text-brand-accent font-mono">Bytes Software</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Engineered end-to-end ML solutions, computer vision models, data pipelines, and MLOps automation workflows over 4 years.
                  </p>
                </div>
                <div className="text-xs font-mono text-slate-400 bg-brand-border/50 px-3 py-1.5 rounded-lg self-start md:self-auto">
                  Feb 2023 - May 2026
                </div>
              </div>
            </div>
          </section>
          
          {/* 3D ROI & Performance Telemetry Graph */}
          <ImpactGraphCanvas />

          {/* Added Network & Node Status Footer Overlays */}
          <div className="flex flex-col md:flex-row justify-between items-center text-xs font-mono text-slate-500 pt-6 mt-12 border-t border-slate-800/60 pb-8">
            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-bold uppercase tracking-wider">GLOBAL_OPERATIONS_NETWORK</span>
              <span className="flex items-center gap-1 text-cyan-400"><Globe className="w-3 h-3" /> Arrtai</span>
              <span className="flex items-center gap-1 text-emerald-400"><Radio className="w-3 h-3" /> Direct Comm</span>
            </div>
            <div className="mt-4 md:mt-0 px-3 py-1.5 bg-slate-900/80 border border-cyan-900/50 rounded text-cyan-400 tracking-wider flex items-center gap-2 shadow-[0_0_10px_rgba(0,240,255,0.1)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              SSH_EDGE_NODE
            </div>
          </div>
          
        </div> {/* Ends the max-w-7xl content wrapper */}

        {/* Global Footers */}
        <div className="w-full pointer-events-auto">
          <TechBanner />
          <Footer />
          <TerminalChat />
        </div>

      </div> {/* Ends the relative z-10 wrapper */}

      {/* Interactive Email Consultation Overlay */}
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}