// Shader utility strings used across Three.js scenes

export const hologramVertexShader = `
  uniform float time;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    
    vec3 pos = position;
    pos.x += sin(pos.y * 10.0 + time * 2.0) * 0.002;
    pos.y += sin(pos.z * 8.0 + time * 1.5) * 0.002;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const hologramFragmentShader = `
  uniform float time;
  uniform vec3 color;
  uniform float opacity;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    // Scanlines
    float scanline = sin(vUv.y * 200.0 + time * 5.0) * 0.5 + 0.5;
    scanline = pow(scanline, 8.0);
    
    // Edge glow (fresnel)
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 3.0);
    
    // Flicker
    float flicker = sin(time * 30.0) * 0.03 + 0.97;
    
    float alpha = (fresnel * 0.8 + scanline * 0.3 + 0.2) * opacity * flicker;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export const pcbTraceVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const pcbTraceFragmentShader = `
  uniform float time;
  uniform float progress;
  uniform vec3 traceColor;
  varying vec2 vUv;

  float line(vec2 p, vec2 a, vec2 b, float width) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    float d = length(pa - ba * h);
    return smoothstep(width + 0.005, width - 0.005, d);
  }

  void main() {
    vec2 uv = vUv;
    
    // Animated trace pulse
    float pulse = sin(uv.x * 20.0 - time * 4.0) * 0.5 + 0.5;
    float mask = step(1.0 - progress, uv.x);
    
    // PCB green background
    vec3 pcbGreen = vec3(0.05, 0.15, 0.05);
    vec3 copper = traceColor * (0.6 + pulse * 0.4);
    
    float traceLine = line(uv, vec2(0.0, 0.5), vec2(1.0, 0.5), 0.015) * mask;
    
    vec3 col = mix(pcbGreen, copper, traceLine);
    float glow = traceLine * pulse * 0.5;
    col += traceColor * glow;
    
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const particleVertexShader = `
  attribute float size;
  attribute float alpha;
  attribute vec3 color;
  
  varying float vAlpha;
  varying vec3 vColor;
  
  uniform float time;
  
  void main() {
    vAlpha = alpha;
    vColor = color;
    
    vec3 pos = position;
    pos.y += sin(time * 0.5 + position.x * 2.0) * 0.1;
    pos.x += cos(time * 0.3 + position.z * 1.5) * 0.1;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const particleFragmentShader = `
  varying float vAlpha;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float circle = smoothstep(0.5, 0.3, d);
    float glow = exp(-d * 8.0) * 0.6;
    
    gl_FragColor = vec4(vColor, (circle + glow) * vAlpha);
  }
`;

export const atmosphereVertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const atmosphereFragmentShader = `
  uniform vec3 atmColor;
  varying vec3 vNormal;
  
  void main() {
    float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
    gl_FragColor = vec4(atmColor, intensity * 0.8);
  }
`;

export const noiseFragmentShader = `
  uniform float time;
  varying vec2 vUv;
  
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  void main() {
    float n = noise(vUv * 8.0 + time * 0.2);
    gl_FragColor = vec4(n, n, n, 1.0);
  }
`;
