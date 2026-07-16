import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface EnergyRingsProps {
  position?: [number, number, number];
  count?: number;
  radius?: number;
}

export function EnergyRings({
  position = [0, 0, 0],
  count = 3,
  radius = 3,
}: EnergyRingsProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.002;
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: count }).map((_, i) => {
        const rotation = (Math.PI * 2 * i) / count;
        const scale = 1 + i * 0.3;

        return (
          <group key={i} rotation={[rotation, rotation * 0.5, 0]}>
            <mesh>
              <torusGeometry args={[radius * scale, 0.2, 32, 100]} />
              <meshStandardMaterial
                color={`hsl(${180 + i * 20}, 100%, 50%)`}
                emissive={`hsl(${180 + i * 20}, 100%, 50%)`}
                emissiveIntensity={0.8}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Glowing line effect */}
            <mesh>
              <torusGeometry args={[radius * scale, 0.05, 32, 100]} />
              <meshStandardMaterial
                color={`hsl(${180 + i * 20}, 100%, 60%)`}
                emissive={`hsl(${180 + i * 20}, 100%, 60%)`}
                emissiveIntensity={1.2}
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
