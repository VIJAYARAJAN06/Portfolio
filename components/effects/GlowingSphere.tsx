import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GlowingSphereProps {
  position?: [number, number, number];
  scale?: number;
  intensity?: number;
  color?: string;
}

export function GlowingSphere({
  position = [0, 0, 0],
  scale = 1,
  intensity = 1,
  color = "#00f5ff",
}: GlowingSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const sphereShader = {
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(color) },
      intensity: { value: intensity },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      uniform float intensity;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vec3 normal = normalize(vNormal);
        float fresnel = pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 2.0);
        
        // Pulsing effect
        float pulse = sin(time * 2.0) * 0.5 + 0.5;
        
        // Noise distortion
        float noise = sin(vPosition.x * 5.0 + time) * sin(vPosition.y * 5.0 + time) * 0.1;
        
        vec3 finalColor = color * (0.3 + fresnel * 0.7 + noise) * intensity;
        
        // Add glow
        gl_FragColor = vec4(finalColor, 0.8 + pulse * 0.2);
      }
    `,
  };

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0005;
      meshRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <group position={position}>
      {/* Main sphere */}
      <mesh ref={meshRef} scale={scale}>
        <icosahedronGeometry args={[1, 32]} />
        <shaderMaterial
          ref={materialRef}
          {...sphereShader}
          wireframe={false}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh scale={scale * 1.2}>
        <torusGeometry args={[1, 0.1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Inner glow */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2 * intensity}
        distance={10}
        decay={2}
        color={color}
      />
    </group>
  );
}
