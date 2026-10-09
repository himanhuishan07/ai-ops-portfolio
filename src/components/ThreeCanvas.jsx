"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points, Stars, useGLTF, Text } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import * as THREE from "three";

// Global Mouse Object (Stores normalized -1 to +1 coordinates across entire window)
const globalMouse = { x: 0, y: 0 };

// =========================================================
// 1. 3D CINEMATIC NEURAL MESH (With Synchronized Parallax)
// =========================================================
function NeuralNetworkMesh() {
  const pointsRef = useRef();
  const linesRef = useRef();
  const groupRef = useRef();

  const [nodes, linePositions, textLabels] = useMemo(() => {
    const count = 90;
    const pos = new Float32Array(count * 3);
    const tags = [
      "SYS_CORE",
      "AI_NODE_01",
      "TENSOR_FLOW",
      "NPU_ACTIVE",
      "DATA_STREAM",
      "ML_OPS",
      "VISION_0X",
      "FEAST_STORE",
      "CUDA_ACCEL"
    ];
    const labels = [];
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 14;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      if (i % 10 === 0 && labels.length < tags.length) {
        labels.push({
          id: `tag-${i}`,
          text: tags[labels.length],
          position: [x + 0.35, y + 0.15, z]
        });
      }
    }

    const lines = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 4.5) {
          lines.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );
        }
      }
    }

    return [pos, new Float32Array(lines), labels];
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // Base continuous rotation
      const baseRotY = t * 0.02;

      // TRUE 3D PARALLAX: Opposite shift to cursor for realistic background depth
      const targetX = -globalMouse.x * 2.2; // Mouse right -> Background shifts left
      const targetY = -globalMouse.y * 1.5; // Mouse up -> Background shifts down
      
      // Interactive 3D Rotational Tilt
      const targetRotY = baseRotY - globalMouse.x * 0.35;
      const targetRotX = globalMouse.y * 0.25;

      // Snappy lerp (0.06) so movement is clearly visible instantly
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.06);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.06);

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {/* Synaptic Nodes with Higher Visibility */}
      <Points ref={pointsRef} positions={nodes} stride={3} frustumCulled={false}>
        <PointMaterial 
          color="#00f0ff" 
          size={0.28} 
          transparent 
          opacity={0.9} 
          sizeAttenuation 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </Points>

      {/* Connection Lines with Higher Opacity for Contrast */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial 
          color="#00f0ff" 
          transparent 
          opacity={0.4} 
          linewidth={1} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </lineSegments>

      {/* Floating Holographic Labels */}
      {textLabels.map((item) => (
        <Text
          key={item.id}
          position={item.position}
          fontSize={0.26}
          color="#00f0ff"
          fillOpacity={0.8}
          letterSpacing={0.08}
          anchorX="left"
          anchorY="middle"
        >
          {`[ ${item.text} ]`}
        </Text>
      ))}
    </group>
  );
}

// =========================================================
// 2. REACTIVE HUMANOID HEAD
// =========================================================
function CyberHead() {
  const headRef = useRef();
  const { scene } = useGLTF("/humanoid_head.glb");

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    const targetY = globalMouse.x * 1.2;  
    const targetX = -globalMouse.y * 0.8; 
    const targetZ = -globalMouse.x * 0.25; 

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetY, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetX, 0.08);
      headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, targetZ, 0.08);
      
      headRef.current.position.y = Math.sin(time * 1.8) * 0.06 - 0.5;
    }
  });

  return (
    <group ref={headRef} position={[0, -0.5, 0]}>
      <primitive object={scene} scale={[1.25, 1.25, 1.25]} />
    </group>
  );
}

// Dynamic Mouse Light Tracking
function InteractiveMouseLight() {
  const lightRef = useRef();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, 3.2 + globalMouse.x * 6, 0.1);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, globalMouse.y * 5, 0.1);
    }
  });

  return <pointLight ref={lightRef} intensity={12} color="#00f0ff" distance={16} decay={1.4} position={[3.2, 0, 4]} />;
}

// Camera Movement Rig
function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, globalMouse.x * 1.8, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, globalMouse.y * 1.2, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// =========================================================
// 3. MAIN CANVAS
// =========================================================
export default function ThreeCanvas() {
  useEffect(() => {
    const handleMouseMove = (event) => {
      globalMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      globalMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", handleMouseMove);
    return () => window.removeEventListener("pointermove", handleMouseMove);
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true }}>
      <color attach="background" args={["#020617"]} />
      
      <fog attach="fog" args={["#020617", 6, 22]} />

      <InteractiveMouseLight />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 8, 5]} intensity={2.2} color="#00f0ff" />
      <directionalLight position={[-10, -5, -5]} intensity={1.5} color="#bb293d" />

      <Stars radius={80} depth={40} count={2500} factor={3} saturation={0.5} fade speed={1.0} />
      
      <NeuralNetworkMesh />

      <group position={[3.2, 0, 0]}>
        <CyberHead />
      </group>

      <CameraRig />

      {/* Cinematic Post Processing */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.4} />
        <DepthOfField focusDistance={0.02} focalLength={0.14} bokehScale={3.5} height={480} />
      </EffectComposer>
    </Canvas>
  );
}

useGLTF.preload("/humanoid_head.glb");