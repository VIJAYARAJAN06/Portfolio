/// <reference types="react" />
/// <reference types="react-dom" />

// Three.js / R3F
declare module "*.glsl" {
  const value: string;
  export default value;
}

declare module "*.vert" {
  const value: string;
  export default value;
}

declare module "*.frag" {
  const value: string;
  export default value;
}

// Three.js extension for R3F
import type { Object3DNode } from "@react-three/fiber";
import type { ShaderMaterial } from "three";

declare module "@react-three/fiber" {
  interface ThreeElements {
    shaderMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial>;
  }
}
