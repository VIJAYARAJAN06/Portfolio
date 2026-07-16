import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";
import gsap from "gsap";

interface FloatingCardProps {
  title: string;
  description: string;
  technologies: string[];
  glowColor?: string;
  delay?: number;
}

export const FloatingCard = React.forwardRef<HTMLDivElement, FloatingCardProps>(
  (
    { title, description, technologies, glowColor = "#00f5ff", delay = 0 },
    ref
  ) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const finalRef = ref as React.MutableRefObject<HTMLDivElement> || cardRef;

    React.useEffect(() => {
      const el = finalRef.current || cardRef.current;
      if (!el) return;

      if (isHovered) {
        gsap.to(el, {
          boxShadow: `0 0 40px ${glowColor}, inset 0 0 30px ${glowColor}`,
          transform: "translateY(-20px) scale(1.05)",
          duration: 0.3,
        });
      } else {
        gsap.to(el, {
          boxShadow: `0 0 15px ${glowColor}`,
          transform: "translateY(0) scale(1)",
          duration: 0.3,
        });
      }
    }, [isHovered, glowColor, finalRef]);

    return (
      <motion.div
        ref={finalRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative p-6 rounded-lg border backdrop-blur-sm group overflow-hidden"
        style={{
          borderColor: glowColor,
          backgroundColor: `${glowColor}08`,
          boxShadow: `0 0 15px ${glowColor}`,
        }}
      >
        {/* Background gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${glowColor}, transparent)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2" style={{ color: glowColor }}>
            {title}
          </h3>
          <p className="text-slate-300 mb-4 text-sm leading-relaxed">
            {description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded border font-mono"
                style={{
                  borderColor: `${glowColor}40`,
                  color: glowColor,
                  backgroundColor: `${glowColor}10`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-lg border pointer-events-none" style={{ borderColor: `${glowColor}00` }}>
          <div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              border: `1px solid ${glowColor}`,
              boxShadow: `inset 0 0 20px ${glowColor}20`,
            }}
          />
        </div>
      </motion.div>
    );
  }
);

FloatingCard.displayName = "FloatingCard";

// ── 3D Card Component with Three.js ──────────────────────────────────

interface Card3DProps {
  title: string;
  icon: string;
  color: string;
}

export function Card3D({ title, icon, color }: Card3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;

    if (isHovered) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    } else {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group
      ref={meshRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Front */}
      <mesh position={[0, 0, 0.5]} castShadow>
        <boxGeometry args={[1.5, 1.5, 0.1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={isHovered ? 0.8 : 0.3}
        />
      </mesh>

      {/* Back */}
      <mesh position={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[1.5, 1.5, 0.1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.5}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Sides */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh
          key={i}
          position={
            [
              [0.75, 0, 0],
              [-0.75, 0, 0],
              [0, 0.75, 0],
              [0, -0.75, 0],
            ][i] as [number, number, number]
          }
          castShadow
        >
          <boxGeometry args={[0.1, 1.5, 1]} />
          <meshStandardMaterial
            color={color}
            metalness={0.5}
            roughness={0.4}
            emissive={color}
            emissiveIntensity={isHovered ? 0.5 : 0.1}
          />
        </mesh>
      ))}

      {/* Glow light */}
      {isHovered && (
        <pointLight
          position={[0, 0, 0]}
          intensity={2}
          distance={5}
          color={color}
        />
      )}
    </group>
  );
}
