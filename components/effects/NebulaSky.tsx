import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NebulaSkyProps {
  scale?: number;
}

export function NebulaSky({ scale = 1000 }: NebulaSkyProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const nebulaShader = {
    uniforms: {
      time: { value: 0 },
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
      varying vec2 vUv;

      // Simplex-like noise
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        
        float n0 = noise(i);
        float n1 = noise(i + vec2(1.0, 0.0));
        float nx0 = mix(n0, n1, f.x);
        
        float n2 = noise(i + vec2(0.0, 1.0));
        float n3 = noise(i + vec2(1.0, 1.0));
        float nx1 = mix(n2, n3, f.x);
        
        return mix(nx0, nx1, f.y);
      }

      void main() {
        vec2 uv = vUv;
        
        // Animated nebula
        vec3 color = vec3(0.0);
        
        // Multiple octaves for Perlin-like noise
        float n = 0.0;
        n += smoothNoise(uv * 2.0 + time * 0.1) * 0.5;
        n += smoothNoise(uv * 4.0 + time * 0.05) * 0.25;
        n += smoothNoise(uv * 8.0 + time * 0.02) * 0.125;
        
        // Color gradient
        color = mix(vec3(0.1, 0.0, 0.3), vec3(0.0, 0.5, 1.0), n);
        color = mix(color, vec3(1.0, 0.2, 0.5), smoothstep(0.3, 0.7, n));
        
        // Stars
        float stars = smoothNoise(uv * 100.0) * smoothNoise(uv * 200.0);
        stars = smoothstep(0.92, 1.0, stars);
        color += vec3(1.0) * stars * 0.8;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  };

  useFrame((state) => {
    if (meshRef.current && "material" in meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = state.clock.elapsedTime * 0.1;
      }
    }
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        {...nebulaShader}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}
