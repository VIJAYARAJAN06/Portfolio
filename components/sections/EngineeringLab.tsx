import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Glitch } from "@react-three/postprocessing";
import * as THREE from "three";
import { motion } from "framer-motion";
import { GlowCard, NeonButton } from "../effects/UIEffects";

// ── ESP32 Interactive ──────────────────────────────────────────────────
function ESP32Interactive() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<THREE.Group>(null);

  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.005;
    if (isHovered) {
      ref.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
    } else {
      ref.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <group
      ref={ref}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Main body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 0.6, 0.1]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.7}
          roughness={0.3}
          emissive="#00d4ff"
          emissiveIntensity={isHovered ? 0.8 : 0.3}
        />
      </mesh>

      {/* Antenna */}
      <mesh position={[0.5, 0.15, 0]}>
        <boxGeometry args={[0.06, 0.5, 0.03]} />
        <meshStandardMaterial
          color="#00d4ff"
          metalness={0.9}
          roughness={0.1}
          emissive="#00d4ff"
          emissiveIntensity={isHovered ? 1 : 0.5}
        />
      </mesh>

      {/* LED */}
      {isHovered && (
        <pointLight position={[0, 0, 0.1]} intensity={2} color="#00d4ff" distance={3} />
      )}

      {/* Pins */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[-0.45 + i * 0.1, -0.35, 0]} castShadow>
          <boxGeometry args={[0.02, 0.15, 0.02]} />
          <meshStandardMaterial
            color="#c0a060"
            metalness={1}
            roughness={0.2}
            emissive={isHovered ? "#c0a060" : "#000"}
            emissiveIntensity={isHovered ? 0.5 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── PCB Interactive ──────────────────────────────────────────────────
function PCBInteractive() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<THREE.Group>(null);

  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.002;
    if (isHovered) {
      ref.current.rotation.z += 0.015;
    }
  });

  return (
    <group
      ref={ref}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.8, 0.08]} />
        <meshStandardMaterial
          color={isHovered ? "#1a4d2e" : "#0f2817"}
          metalness={0.6}
          roughness={0.4}
          emissive="#0aff9d"
          emissiveIntensity={isHovered ? 0.6 : 0.2}
        />
      </mesh>

      {/* Component dots */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} position={[Math.random() - 1.25, Math.random() - 0.9, 0.1]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#ffd700"
            metalness={0.8}
            roughness={0.2}
            emissive={isHovered ? "#ffd700" : "#666"}
            emissiveIntensity={isHovered ? 0.4 : 0}
          />
        </mesh>
      ))}

      {isHovered && (
        <pointLight position={[0, 0, 0.5]} intensity={1.5} color="#0aff9d" distance={5} />
      )}
    </group>
  );
}

// ── Oscilloscope Interactive ──────────────────────────────────────────────
function OscilloscopeInteractive() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<THREE.Group>(null);
  const waveRef = useRef<THREE.Mesh>(null);

  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.003;

    if (waveRef.current && "position" in waveRef.current) {
      waveRef.current.position.z = Math.sin(s.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group
      ref={ref}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Screen bezel */}
      <mesh castShadow>
        <boxGeometry args={[1.2, 0.9, 0.15]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Screen */}
      <mesh ref={waveRef} position={[0, 0, 0.08]}>
        <planeGeometry args={[1, 0.7]} />
        <meshBasicMaterial color="#001100" transparent />
      </mesh>

      {/* Grid */}
      <Canvas
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <mesh position={[0, 0, 0.09]}>
          <planeGeometry args={[1, 0.7]} />
          <shaderMaterial
            uniforms={{ time: { value: 0 } }}
            vertexShader={`
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              uniform float time;
              varying vec2 vUv;
              void main() {
                float wave = sin(vUv.x * 10.0 - time * 3.0) * 0.3 + 0.5;
                float signal = step(abs(vUv.y - wave), 0.05);
                gl_FragColor = vec4(0.0, 1.0, 0.5, signal);
              }
            `}
          />
        </mesh>
      </Canvas>

      {/* Knobs */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={i} position={[-0.4 + i * 0.4, -0.5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
          <meshStandardMaterial
            color="#555"
            metalness={0.7}
            roughness={0.3}
            emissive={isHovered ? "#00d4ff" : "#000"}
            emissiveIntensity={isHovered ? 0.3 : 0}
          />
        </mesh>
      ))}

      {isHovered && (
        <pointLight position={[0, 0, 0.3]} intensity={1} color="#00ff88" distance={4} />
      )}
    </group>
  );
}

// ── Engineering Lab Scene ──────────────────────────────────────────────────
function EngineeringLabScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00d4ff" />
      <pointLight position={[-5, -3, 3]} intensity={0.8} color="#a855f7" />

      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.1}>
        <ESP32Interactive />
      </Float>

      <Float speed={0.4} rotationIntensity={0.15} floatIntensity={0.15}>
        <group position={[-2.5, 0, 0]}>
          <PCBInteractive />
        </group>
      </Float>

      <Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.2}>
        <group position={[2.5, 0, 0]}>
          <OscilloscopeInteractive />
        </group>
      </Float>

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.8} intensity={0.5} />
      </EffectComposer>

      <OrbitControls
        autoRotate
        autoRotateSpeed={2}
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  );
}

// ── Engineering Lab Component ──────────────────────────────────────────────
export const EngineeringLab = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const deviceInfo: Record<string, string> = {
    esp32: "ESP32 Microcontroller - Dual-core processor with Wi-Fi & Bluetooth capabilities for IoT applications",
    pcb: "Custom PCB Board - High-speed signal routing with embedded components for embedded systems",
    oscilloscope: "Oscilloscope - Real-time waveform analysis and signal debugging tool",
  };

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-20 flex flex-col items-center justify-center"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Engineering Lab
          </h2>
          <p className="text-slate-400 text-lg">Interactive 3D visualization of my hardware expertise</p>
        </motion.div>

        {/* 3D Canvas */}
        <div className="relative w-full h-[500px] rounded-lg border border-cyan-500/30 overflow-hidden mb-8 bg-slate-950/50 backdrop-blur-sm">
          <EngineeringLabScene />
        </div>

        {/* Device Selection */}
        <div className="flex justify-center gap-4 mb-8">
          {["esp32", "pcb", "oscilloscope"].map((device) => (
            <NeonButton
              key={device}
              onClick={() => setSelectedDevice(device)}
              glowColor={selectedDevice === device ? "#00f5ff" : "#666"}
              className={`capitalize ${selectedDevice === device ? "scale-105" : ""}`}
            >
              {device === "esp32" ? "ESP32" : device === "pcb" ? "PCB" : "O-Scope"}
            </NeonButton>
          ))}
        </div>

        {/* Device Info */}
        {selectedDevice && (
          <GlowCard
            glowColor="rgba(0, 245, 255, 0.5)"
            className="p-6 bg-slate-900/50 backdrop-blur-sm"
          >
            <p className="text-slate-300 text-center">{deviceInfo[selectedDevice]}</p>
          </GlowCard>
        )}
      </div>
    </section>
  );
});

EngineeringLab.displayName = "EngineeringLab";
