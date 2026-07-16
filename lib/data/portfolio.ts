// ============================================================
// VJ PORTFOLIO — Central Data File
// Update this file with your personal information
// ============================================================

export const personal = {
  name: "Vijayarajan A",
  title: "Embedded Systems Engineer",
  tagline: "Building intelligent hardware for the physical world",
  email: "vijayarajan@example.com",        // TODO: update
  phone: "+91 00000 00000",                // TODO: update or remove
  location: "Tamil Nadu, India",
  github: "https://github.com/vijayarajan", // TODO: update
  linkedin: "https://linkedin.com/in/vijayarajan", // TODO: update
  resume: "/resume.pdf",
  photo: "/photo.jpg",
  available: true,
  availabilityNote: "Available for Internship / Full-time Roles",
  currentlyLearning: ["ESP-IDF", "TinyML", "RTOS", "VLSI Design"],
};

export const skills = [
  // Core Embedded
  { name: "ESP32", category: "microcontroller", level: 95, color: "#00d4ff", icon: "cpu" },
  { name: "STM32", category: "microcontroller", level: 88, color: "#3b82f6", icon: "cpu" },
  { name: "Embedded C", category: "language", level: 92, color: "#f59e0b", icon: "code" },
  { name: "FreeRTOS", category: "os", level: 82, color: "#10b981", icon: "layers" },
  { name: "Arduino", category: "framework", level: 90, color: "#00979d", icon: "cpu" },
  // Protocols
  { name: "MQTT", category: "protocol", level: 88, color: "#ff6b35", icon: "wifi" },
  { name: "UART/SPI/I2C", category: "protocol", level: 90, color: "#8b5cf6", icon: "zap" },
  { name: "BLE", category: "protocol", level: 80, color: "#6366f1", icon: "bluetooth" },
  { name: "CAN Bus", category: "protocol", level: 75, color: "#ec4899", icon: "share-2" },
  { name: "LoRa/LoRaWAN", category: "protocol", level: 72, color: "#14b8a6", icon: "radio" },
  // Software
  { name: "Python", category: "language", level: 85, color: "#f59e0b", icon: "terminal" },
  { name: "C++", category: "language", level: 82, color: "#ef4444", icon: "code-2" },
  { name: "Linux", category: "os", level: 80, color: "#f97316", icon: "terminal" },
  // Cloud & IoT
  { name: "AWS IoT", category: "cloud", level: 75, color: "#ff9900", icon: "cloud" },
  { name: "Node-RED", category: "tool", level: 82, color: "#8f0000", icon: "workflow" },
  // Design
  { name: "KiCad", category: "hardware", level: 80, color: "#314cb0", icon: "cpu" },
  { name: "PCB Design", category: "hardware", level: 78, color: "#22c55e", icon: "circuit-board" },
  // AI / ML
  { name: "TinyML", category: "ai", level: 65, color: "#a855f7", icon: "brain" },
  { name: "TensorFlow Lite", category: "ai", level: 60, color: "#ff6f00", icon: "brain" },
];

export const projects = [
  {
    id: "smart-phase-shifter",
    title: "Smart Phase Shifter",
    subtitle: "Intelligent RF Phase Shifting System",
    description:
      "A digitally controlled RF phase shifter with real-time monitoring, designed for phased array antenna systems. Features closed-loop control, remote configuration via MQTT, and a web-based dashboard.",
    longDescription:
      "Engineered a complete embedded system featuring STM32-based digital control, SPI-driven phase shifter ICs, real-time telemetry over MQTT, and a cloud-connected dashboard. The system achieves sub-1° phase resolution across the full 0–360° range.",
    tech: ["STM32", "SPI", "MQTT", "Python", "PCB Design", "KiCad", "FreeRTOS"],
    category: "RF / Hardware",
    featured: true,
    color: "#00d4ff",
    github: "https://github.com/vijayarajan/smart-phase-shifter",
    image: null,
    architecture: {
      nodes: ["Sensor", "STM32 MCU", "SPI Interface", "Phase Shifter IC", "MQTT Broker", "Cloud Dashboard"],
      edges: [
        [0, 1], [1, 2], [2, 3], [1, 4], [4, 5],
      ],
    },
    stats: { resolution: "< 1°", range: "0–360°", latency: "< 5ms", interface: "MQTT + REST" },
  },
  {
    id: "flowra-gateway",
    title: "Flowra ESP32 Gateway",
    subtitle: "BLE Provisioning & OTA Firmware Platform",
    description:
      "A production-grade ESP32 IoT gateway with BLE-based Wi-Fi provisioning, secure OTA updates, firmware validation, and rollback management for industrial IoT applications.",
    longDescription:
      "Built using ESP-IDF framework, this gateway handles BLE provisioning for zero-touch device onboarding, cryptographic firmware validation, atomic OTA updates with automatic rollback on failure, and MQTT-based telemetry to cloud.",
    tech: ["ESP32", "ESP-IDF", "BLE", "MQTT", "FreeRTOS", "OTA", "C"],
    category: "IoT / Firmware",
    featured: true,
    color: "#f59e0b",
    github: "https://github.com/vijayarajan/flowra-gateway",
    image: null,
    architecture: {
      nodes: ["BLE Device", "ESP32 Gateway", "OTA Server", "MQTT Broker", "Cloud Platform", "Dashboard"],
      edges: [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5]],
    },
    stats: { provisioning: "BLE 5.0", ota: "Secure + Rollback", uptime: "99.9%", protocol: "MQTT / TLS" },
  },
  {
    id: "tinyml-sensor",
    title: "TinyML Edge Sensor",
    subtitle: "On-device AI for Predictive Sensing",
    description:
      "An edge AI system running TensorFlow Lite models directly on microcontrollers for real-time anomaly detection without cloud dependency.",
    longDescription:
      "Trained and quantized neural networks for deployment on STM32 and Arduino Nano 33 BLE Sense. Achieves <50ms inference latency with >95% accuracy for vibration-based fault detection in industrial machinery.",
    tech: ["TinyML", "TensorFlow Lite", "STM32", "Embedded C", "Python", "Edge AI"],
    category: "AI / Edge Computing",
    featured: false,
    color: "#a855f7",
    github: "https://github.com/vijayarajan/tinyml-sensor",
    image: null,
    architecture: {
      nodes: ["Sensor", "MCU", "TFLite Model", "Inference Engine", "Alert System"],
      edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
    },
    stats: { latency: "< 50ms", accuracy: "> 95%", power: "< 10mW", model: "INT8 Quantized" },
  },
  {
    id: "iot-dashboard",
    title: "IoT Monitoring Dashboard",
    subtitle: "Real-time Sensor Data Visualization",
    description:
      "A full-stack IoT monitoring system with real-time sensor data visualization, alerting, and historical analytics.",
    longDescription:
      "End-to-end IoT pipeline: embedded sensors → MQTT → Node-RED → InfluxDB → Grafana dashboard. Features configurable alerts, historical trending, and remote device control.",
    tech: ["MQTT", "Node-RED", "Python", "AWS IoT", "Grafana", "InfluxDB", "ESP32"],
    category: "IoT / Cloud",
    featured: false,
    color: "#10b981",
    github: "https://github.com/vijayarajan/iot-dashboard",
    image: null,
    architecture: {
      nodes: ["ESP32 Sensor", "MQTT", "Node-RED", "InfluxDB", "Grafana"],
      edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
    },
    stats: { sensors: "10+", latency: "< 1s", retention: "1 year", alerts: "Real-time" },
  },
];

export const timeline = [
  {
    id: "school",
    year: "2018",
    title: "School",
    subtitle: "Discovered Electronics",
    description: "Built first Arduino project — a servo motor controller. Fell in love with making hardware obey software.",
    icon: "graduation-cap",
    color: "#00d4ff",
  },
  {
    id: "college",
    year: "2020",
    title: "B.E. Electronics & Communication",
    subtitle: "College of Engineering",
    description: "Deep-dived into digital electronics, microcontrollers, signal processing, and communication systems.",
    icon: "book-open",
    color: "#f59e0b",
  },
  {
    id: "internship1",
    year: "2022",
    title: "Embedded Systems Intern",
    subtitle: "First Industry Experience",
    description: "Worked on STM32-based firmware, learned FreeRTOS, SPI/I2C protocols, and PCB bring-up procedures.",
    icon: "briefcase",
    color: "#10b981",
  },
  {
    id: "projects",
    year: "2023",
    title: "Project Phase",
    subtitle: "Smart Phase Shifter & More",
    description: "Built the Smart Phase Shifter, Flowra IoT Gateway, and TinyML edge sensor projects.",
    icon: "cpu",
    color: "#a855f7",
  },
  {
    id: "research",
    year: "2024",
    title: "Research & Specialization",
    subtitle: "TinyML + RTOS + RF Systems",
    description: "Focused on edge AI, real-time operating systems, RF hardware design, and cloud-connected embedded systems.",
    icon: "flask-conical",
    color: "#ec4899",
  },
  {
    id: "future",
    year: "2025+",
    title: "Future Goals",
    subtitle: "Industry Engineering",
    description: "Target: Embedded Systems Engineer at product companies working on IoT, robotics, or automotive electronics.",
    icon: "rocket",
    color: "#f59e0b",
  },
];

export const hobbies = [
  {
    id: "rubiks",
    title: "Rubik's Cube",
    description: "Average solve time under 30 seconds. Algorithms feel like debugging — systematic and satisfying.",
    type: "rubiks",
    color: "#f59e0b",
  },
  {
    id: "pcb",
    title: "PCB Design",
    description: "Designing multi-layer PCBs in KiCad. There's something beautiful about perfect copper trace routing.",
    type: "pcb",
    color: "#00d4ff",
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    description: "Experimenting with TinyML and edge AI — bringing intelligence to constrained hardware.",
    type: "neural",
    color: "#a855f7",
  },
  {
    id: "coding",
    title: "Programming",
    description: "Open source contributions, firmware experiments, and automating everything possible.",
    type: "code",
    color: "#10b981",
  },
];

export const stats = [
  { value: 4, label: "Years Experience", suffix: "+" },
  { value: 15, label: "Projects Built", suffix: "+" },
  { value: 10, label: "Technologies", suffix: "+" },
  { value: 3, label: "Internships", suffix: "" },
];
