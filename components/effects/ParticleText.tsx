import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleTextProps {
  text: string;
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

export function ParticleText({
  text,
  position = [0, 0, 0],
  scale = 1,
  color = "#00f5ff",
}: ParticleTextProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const { camera } = useThree();

  const geometry = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    ctx.font = "bold 80px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const particles: THREE.Vector3[] = [];
    const pixelSize = 4;

    for (let i = 0; i < data.length; i += pixelSize * 10) {
      if (data[i + 3] > 128) {
        const index = i / 4;
        const x = (index % canvas.width) / canvas.width - 0.5;
        const y = Math.floor(index / canvas.width) / canvas.height - 0.5;
        particles.push(new THREE.Vector3(x * 4, y * 4, 0));
      }
    }

    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(particles.flatMap((p) => [p.x, p.y, p.z])), 3)
    );

    return bufferGeometry;
  }, [text]);

  useFrame((state) => {
    if (pointsRef.current && materialRef.current) {
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.2;

      // Pulsing size
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      materialRef.current.size = 8 * scale;
    }
  });

  return (
    <group position={position} scale={scale}>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          ref={materialRef}
          color={color}
          size={8}
          sizeAttenuation
          transparent
        />
      </points>
    </group>
  );
}
