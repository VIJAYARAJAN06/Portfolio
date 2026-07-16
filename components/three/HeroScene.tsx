"use client";

import { useRef, useEffect, Component, type ReactNode, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, Sparkles, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { GlowingSphere, EnergyRings, ParticleText, NebulaSky } from "../effects";
import gsap from "gsap";

// Error boundary to gracefully handle postprocessing failures (e.g. virtualized GPU)
class PostFXBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}
import * as THREE from "three";

// ── PCB Board ──────────────────────────────────────────────────────────────
function PCBBoard() {
  const meshRef = useRef<THREE.Mesh>(null);
  const traceRef = useRef<THREE.ShaderMaterial>(null);

  const traceShader = {
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color("#00d4ff") },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;

      float trace(vec2 uv, float y, float w) {
        return smoothstep(w, w * 0.5, abs(uv.y - y));
      }

      void main() {
        // PCB green base
        vec3 pcbColor = vec3(0.04, 0.12, 0.06);
        
        // Animated traces
        float t1 = trace(vUv, 0.2, 0.018) * (sin(vUv.x * 30.0 - time * 4.0) * 0.5 + 0.5);
        float t2 = trace(vUv, 0.5, 0.012) * (sin(vUv.x * 25.0 - time * 3.0) * 0.5 + 0.5);
        float t3 = trace(vUv, 0.8, 0.015) * (sin(vUv.x * 35.0 - time * 5.0) * 0.5 + 0.5);
        
        float traces = t1 + t2 + t3;
        vec3 col = mix(pcbColor, color, traces);
        col += color * traces * 0.5; // glow
        
        // Pad pattern
        vec2 grid = fract(vUv * 8.0);
        float pad = smoothstep(0.4, 0.35, length(grid - 0.5));
        col += vec3(0.6, 0.5, 0.1) * pad * 0.3;
        
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  };

  useFrame((state) => {
    if (traceRef.current) {
      traceRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={[2.2, 0, 0]}>
        {/* PCB board */}
        <mesh ref={meshRef} castShadow>
          <boxGeometry args={[2.4, 1.6, 0.06]} />
          <shaderMaterial
            ref={traceRef}
            {...traceShader}
            transparent={false}
          />
        </mesh>
        {/* Chips on the board */}
        {[
          [-0.5, 0.3, 0.05], [0.4, -0.2, 0.05], [-0.1, -0.3, 0.05], [0.7, 0.4, 0.05],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]}>
            <boxGeometry args={[0.25, 0.25, 0.05]} />
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// ── ESP32 Chip ─────────────────────────────────────────────────────────────
function ESP32Chip() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.4;
    ref.current.position.y = Math.sin(s.clock.elapsedTime * 0.8) * 0.15;
  });

  return (
    <group ref={ref} position={[-2.5, 0.5, 0]}>
      {/* Main body */}
      <mesh castShadow>
        <boxGeometry args={[0.8, 0.5, 0.08]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0.35, 0.1, 0]}>
        <boxGeometry args={[0.05, 0.4, 0.02]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Pins */}
      {Array.from({ length: 8 }).map((_, i) => (
        <group key={i}>
          <mesh position={[-0.35 + i * 0.1, -0.3, 0]}>
            <boxGeometry args={[0.02, 0.12, 0.02]} />
            <meshStandardMaterial color="#c0a060" metalness={1} roughness={0.1} />
          </mesh>
          <mesh position={[-0.35 + i * 0.1, 0.3, 0]}>
            <boxGeometry args={[0.02, 0.12, 0.02]} />
            <meshStandardMaterial color="#c0a060" metalness={1} roughness={0.1} />
          </mesh>
        </group>
      ))}
      {/* Hologram glow */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[0.9, 0.6]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

// ── Energy Orb (center piece) ──────────────────────────────────────────────
function EnergyOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    (ref.current.material as any).distort = 0.3 + Math.sin(s.clock.elapsedTime) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.3}>
      <mesh ref={ref} position={[0, 0.5, -1]} castShadow>
        <sphereGeometry args={[0.6, 64, 64]} />
        <MeshDistortMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.1}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

// ── Signal Particles (circuit data) ───────────────────────────────────────
function SignalParticles() {
  const count = 120;
  const posRef = useRef<Float32Array>(null as any);
  const pointsRef = useRef<THREE.Points>(null);

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  posRef.current = positions;

  useFrame((s) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = s.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[posRef.current, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#00d4ff"
        size={0.04}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── Mouse parallax camera ─────────────────────────────────────────────────
function ParallaxCamera() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.04;
    camera.position.y += (mouse.current.y * 0.3 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ── Cinematic intro animation ─────────────────────────────────────────────
function CinematicIntro() {
  const groupRef = useRef<THREE.Group>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!groupRef.current) return;

    // Zoom-in animation on mount
    const tl = gsap.timeline();
    tl.from(
      groupRef.current.position,
      {
        z: 15,
        duration: 3,
        ease: "power2.inOut",
      },
      0
    );
  }, []);

  return (
    <group ref={groupRef}>
      <NebulaSky scale={500} />
      <GlowingSphere position={[0, 0.2, -2]} scale={1.2} intensity={1} color="#00f5ff" />
      <EnergyRings position={[0, 0.2, -2]} count={3} radius={2.5} />
    </group>
  );
}

// ── Main Hero Scene ────────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
      style={{ background: "#020408" }}
    >
      <ParallaxCamera />

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00d4ff" />
      <pointLight position={[-5, -3, 3]} intensity={0.8} color="#a855f7" />
      <pointLight position={[0, -5, 2]} intensity={0.6} color="#f59e0b" />
      <directionalLight position={[0, 10, 5]} intensity={0.5} />

      {/* Cinematic intro with new effects */}
      <CinematicIntro />

      {/* Classic components */}
      <PCBBoard />
      <ESP32Chip />
      <EnergyOrb />
      <SignalParticles />

      {/* Post-processing — wrapped to prevent GPU crashes on low-end/virtual devices */}
      <PostFXBoundary>
        <EffectComposer>
          <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} height={200} intensity={0.6} />
        </EffectComposer>
      </PostFXBoundary>
    </Canvas>
  );
}
