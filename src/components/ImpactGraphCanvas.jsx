"use client";

import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Sparkles, RoundedBox, Environment, MeshReflectorMaterial, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

// Telemetry datasets
const telemetryData = {
  "EDGE AI & VISION": [
    { label: "INFERENCE SPEED", value: "120 FPS", sub: "Hailo-8 NPU Pipeline", color: "#00f0ff", height: 3.5 },
    { label: "DETECTION ACCURACY", value: "94.8%", sub: "YOLOv8 Vectoring", color: "#10b981", height: 4.2 },
    { label: "POWER EFFICIENCY", value: "8.5W", sub: "Raspberry Pi 5 Edge", color: "#ec4899", height: 2.8 },
  ],
  "MLOPS INFRASTRUCTURE": [
    { label: "DEPLOYMENT SPEED", value: "4x", sub: "Kubeflow & GitOps CI/CD", color: "#00f0ff", height: 4.0 },
    { label: "MODEL INFERENCE", value: "90.1%", sub: "Hailo-8 Automated Bench", color: "#10b981", height: 3.2 },
    { label: "GPU UTILIZATION", value: "88%", sub: "vLLM Multi-Tenant Cluster", color: "#ec4899", height: 3.8 },
  ],
  "AGENTIC SYSTEMS": [
    { label: "RESPONSE LATENCY", value: "140ms", sub: "Ollama Local Stream", color: "#00f0ff", height: 3.0 },
    { label: "TASK COMPLETION", value: "98.2%", sub: "LiteLLM Router Agent", color: "#10b981", height: 4.5 },
    { label: "MEMORY RETRIEVAL", value: "12ms", sub: "Feast Feature Store", color: "#ec4899", height: 3.6 },
  ],
};

function Bar({ position, height, color, label, value, sub }) {
  const meshRef = useRef();

  // Smooth height and floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, height, 0.08);
      // Center positioning math based on scale
      meshRef.current.position.y = meshRef.current.scale.y / 2; 
      // Subtle floating breathing effect for extra premium feel
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.02;
    }
  });

  return (
    <group position={position}>
      {/* 1. PREMIUM ROUNDED BOX INSTEAD OF SHARP CUBE */}
      <RoundedBox ref={meshRef} args={[0.7, 1, 0.7]} radius={0.1} smoothness={4} position={[0, 0, 0]}>
        
        {/* 2. HOLOGRAPHIC GLASS MATERIAL */}
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.8}
          transparent={true}
          opacity={0.9}
          transmission={0.8} // Yeh property isko kanch (glass) banati hai
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* High-Contrast Glassmorphic Badge (HTML) */}
      <Html position={[0, height + 0.8, 0]} center zIndexRange={[100, 0]}>
        <div
          style={{
            background: "rgba(10, 15, 30, 0.8)",
            border: `1px solid ${color}80`,
            backdropFilter: "blur(12px)",
            padding: "8px 16px",
            borderRadius: "8px",
            color: "#ffffff",
            fontFamily: "monospace",
            textAlign: "center",
            boxShadow: `0 8px 32px 0 rgba(0,0,0,0.37), 0 0 15px ${color}40`, // Premium shadow
            pointerEvents: "none",
            minWidth: "160px",
          }}
        >
          <div style={{ color: color, fontSize: "10px", fontWeight: "bold", letterSpacing: "1px" }}>
            {label}
          </div>
          <div style={{ fontSize: "20px", fontWeight: "900", color: "#ffffff", margin: "2px 0" }}>
            {value}
          </div>
          <div style={{ color: "#94a3b8", fontSize: "10px" }}>
            {sub}
          </div>
        </div>
      </Html>
    </group>
  );
}

function Scene({ activeTab }) {
  const bars = telemetryData[activeTab];
  const spacing = 2.5;
  const startX = -((bars.length - 1) * spacing) / 2;

  return (
    <>
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minDistance={6} 
        maxDistance={15} 
        maxPolarAngle={Math.PI / 2 - 0.05} 
        dampingFactor={0.05} // Smooth stop effect
      />
      {/* Fog for fading into the dark background */}
      <fog attach="fog" args={["#020617", 5, 25]} />
      
      {/* Environment map gives the glass material something to reflect */}
      <Environment preset="city" />

      <ambientLight intensity={0.2} />
      <spotLight position={[0, 10, 0]} intensity={1.5} color="#00f0ff" penumbra={1} />
      <directionalLight position={[-5, 5, -5]} intensity={1} color="#ec4899" />

      {/* Floating data particles */}
      <Sparkles count={80} scale={15} size={2} speed={0.4} opacity={0.4} color="#00f0ff" />

      {/* 3. PREMIUM REFLECTIVE FLOOR */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]} // Blur ground reflections
          resolution={1024}
          mixBlur={1}
          mixStrength={40} // Reflection strength
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050510" // Dark tint
          metalness={0.5}
        />
      </mesh>

      {/* Subtle neon grid overlaying the reflective floor */}
      <gridHelper args={[40, 40, "#00f0ff", "#1e293b"]} position={[0, 0, 0]} material-opacity={0.2} material-transparent />

      {/* Render 3D Bars */}
      <group position={[0, -1, 0]}>
        {bars.map((bar, index) => (
          <Bar
            key={bar.label + activeTab}
            position={[startX + index * spacing, 0, 0]}
            height={bar.height}
            color={bar.color}
            label={bar.label}
            value={bar.value}
            sub={bar.sub}
          />
        ))}
      </group>

      {/* 4. CINEMATIC POST-PROCESSING (Glow + Vignette) */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.3} mipmapBlur intensity={1.5} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
}

export default function ImpactGraphCanvas() {
  const [activeTab, setActiveTab] = useState("EDGE AI & VISION");

  return (
    <section id="telemetry" className="w-full space-y-6 glass-panel p-6 md:p-8 rounded-2xl backdrop-blur-md bg-brand-card/20 border border-brand-border shadow-2xl relative z-10">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="border-l-4 border-brand-accent pl-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            QUANTIFIED SYSTEM IMPACT TELEMETRY
          </h2>
          <p className="text-xs text-brand-text font-mono mt-1">
            Production Benchmarks Across Edge Vision, MLOps Pipelines & AI Agent Deployment
          </p>
        </div>

        {/* Dynamic Tab Buttons */}
        <div className="flex flex-wrap gap-2">
          {Object.keys(telemetryData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)] font-bold"
                  : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas Container */}
      {/* Background is fully transparent to blend with the global scene, border is minimal */}
      <div className="relative w-full h-[450px] rounded-xl overflow-hidden bg-transparent border border-slate-800/40">
        <Canvas camera={{ position: [0, 5, 12], fov: 45 }} dpr={[1, 2]}>
          <color attach="background" args={["#020617"]} /> 
          <Scene activeTab={activeTab} />
        </Canvas>
      </div>
    </section>
  );
}