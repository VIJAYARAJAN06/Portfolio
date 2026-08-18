export const personalInfo = {
  name: "VIJAYARAJAN A",
  title: "Electronics & Communication Engineer",
  subtitle: "Embedded Systems | Embedded Firmware | IoT | Hardware Engineering",
  location: "Coimbatore, Tamil Nadu, India",
  email: "vijayrajan2006@gmail.com",
  linkedin: "https://linkedin.com/in/a-vijay-rajan",
  github: "https://github.com/a-vijay-rajan",
  vercelUrl: "https://portfolio-jet-nine-x976idrizy.vercel.app",
  summary: "Final-year ECE student (CGPA 8.12/10, GATE EC Qualified) with 3 internships and 10+ embedded/IoT projects on ESP32, STM32, and Arduino. Skilled in Embedded C, sensor interfacing, UART/SPI/I2C, and MQTT-based IoT cloud connectivity. Seeking an Embedded/IoT/Hardware Engineer internship or fresher role.",
  welcomeTag: "WELCOME TO MY PORTFOLIO",
  description: "Final-year ECE student building real-time embedded and IoT solutions with microcontrollers, communication protocols, and hardware-software integration.",
  tagline: "Exploring Hardware. Building Intelligence.",
  aboutTitle: "Where Curiosity Meets Engineering, and Ideas Become Reality.",
  aboutParagraph1: "I’m a final-year Electronics and Communication Engineering student at SNS College of Technology, passionate about building intelligent systems that connect hardware with the real world. With 3 internship experiences and 10+ hands-on projects, I’ve worked with ESP32, STM32, and Arduino across Embedded Systems, IoT, and hardware development. My core skills include Embedded C, microcontroller programming, sensor interfacing, UART, SPI, I2C, ADC, GPIO, PWM, MQTT, and hardware debugging.",
  aboutParagraph2: "I enjoy understanding how things work at the fundamental level and turning ideas into functional, reliable prototypes. Driven by curiosity, experimentation, and problem-solving, I’m exploring Embedded Systems, IoT, Edge AI, VLSI, and Hardware–Software Co-Design, with a goal of continuously learning, building, and creating technology that solves real-world problems.",
  college: "SNS College of Technology, Coimbatore",
  batch: "2023 - 2027",
  cgpa: "8.12 / 10",
  gateStatus: "GATE EC Qualified",
  hscSchool: "M.S.S.D Higher Secondary School, Coimbatore",
  hscScore: "64.3%",
  hscYear: "2022 - 2023"
};

export const heroKeywords = [
  "ESP32", "STM32", "ESP8266", "ARDUINO", "EMBEDDED C", "UART", "SPI", "I2C", "MQTT", "HTTP", "ADC", "GPIO", "PWM"
];

export const domains = [
  {
    number: "01",
    title: "EMBEDDED SYSTEMS & FIRMWARE",
    tags: ["Embedded C", "ESP32", "STM32", "Arduino", "ESP8266"],
    desc: "Bare-metal firmware development, real-time sensor integration via ADC/GPIO/PWM, interrupt handling, and resource-constrained hardware debugging."
  },
  {
    number: "02",
    title: "IoT & CLOUD CONNECTIVITY",
    tags: ["MQTT Broker", "ThingSpeak", "Blynk IoT", "Telegram Alerts", "Web Dashboard"],
    desc: "Building bi-directional IoT gateways, AP-mode setup portals, NVS credential storage, and cloud telemetry pipelines."
  },
  {
    number: "03",
    title: "COMMUNICATION PROTOCOLS",
    tags: ["UART", "SPI", "I2C", "MQTT", "HTTP / HTTPS"],
    desc: "Hardware peripheral signal routing, baud rate calibration, sensor data bus synchronization, and SPIFFS/NVS storage bridges."
  },
  {
    number: "04",
    title: "HARDWARE DEBUGGING & PCB",
    tags: ["Sensor Interfacing", "Relay Control", "OLED Display", "PCB Design (Basic)", "Proteus"],
    desc: "Circuit simulation in Proteus, precision soldering, PCB footprint layout in KiCad, relay isolation, and oscilloscope signal integrity testing."
  }
];

export const technicalToolkit = [
  {
    category: "Languages",
    skills: ["Embedded C (Basics)"]
  },
  {
    category: "Microcontrollers / Boards",
    skills: ["ESP32", "STM32", "ESP8266", "Arduino"]
  },
  {
    category: "Protocols / Interfaces",
    skills: ["UART", "SPI", "I2C", "ADC", "GPIO", "PWM", "RFID", "MQTT", "HTTP/HTTPS"]
  },
  {
    category: "IoT & Cloud",
    skills: ["ThingSpeak", "Blynk IoT", "MQTT Broker", "Telegram Alerts", "Web Dashboard", "XAMPP"]
  },
  {
    category: "Tools / IDEs",
    skills: ["ESP-IDF", "STM32CubeIDE", "STM32CubeMX", "Arduino IDE", "VS Code", "Proteus", "KiCad"]
  },
  {
    category: "Hardware Skills",
    skills: ["Sensor Interfacing", "Relay Control", "OLED Display", "PCB Design (Basic)", "Soldering", "Circuit Simulation", "Hardware Debugging"]
  }
];

export const selectedProjects = [
  {
    id: "sentinel",
    number: "01",
    title: "SENTINEL – IoT Security & Environmental Monitoring System",
    subtitle: "ESP32 Multi-Sensor Telemetry & Instant Alerts",
    image: "/project-sentinel.jpg",
    tags: ["ESP32", "Embedded C", "DHT11", "PIR", "MQ Gas Sensor", "LDR", "Sound Sensor", "Telegram Bot", "Web Dashboard"],
    description: "Engineered an ESP32-based multi-sensor monitoring system integrating PIR, sound, gas, temperature, humidity, and light sensors, delivering live SAFE/ALERT status via a web dashboard and Telegram alerts.",
    caseStudy: {
      problem: "Industrial and residential environments need instant multi-hazard surveillance (gas leak, intrusion, fire, noise) without heavy latency or missing alarm frames.",
      objective: "Develop a unified ESP32 sensor telemetry hub broadcasting live SAFE/ALERT system states to web dashboards and Telegram bot endpoints.",
      architecture: "PIR + MQ Gas + DHT11 + LDR + Sound Sensors -> ESP32 MCU Interrupts -> Web Dashboard Engine & Telegram Bot API.",
      hardware: ["ESP32 Development Board", "PIR Motion Sensor", "MQ Series Gas Sensor", "DHT11 Temp & Humidity Sensor", "LDR Light Sensor", "Sound Sensor Module"],
      software: ["Embedded C", "Arduino IDE / ESP-IDF", "Telegram Bot API", "Web Dashboard HTML/JS"],
      circuit: "GPIO interrupt lines for motion/sound sensors, ADC channel polling for MQ gas and LDR sensors, 5V power regulation.",
      algorithm: "Multi-parameter threshold checking logic continuously updating system status matrix between SAFE and ALERT states.",
      implementation: "Wrote interrupt service routines for instant motion alerts and constructed JSON HTTP requests for Telegram bot dispatch.",
      testing: "Simulated environmental gas concentration spikes and intrusion triggers across continuous 48-hour testing.",
      results: "Delivered sub-second Telegram notification alert latency and 100% reliable dashboard status streaming.",
      challenges: "Calibrating analog MQ gas sensor baseline voltage drift and avoiding false-positive sound sensor triggers.",
      futureImprovements: "Adding wireless LoRa Mesh relay nodes for long-range remote agricultural and industrial deployments."
    }
  },
  {
    id: "flowra",
    number: "02",
    title: "Flowra – Wi-Fi Cloud Gateway for Industrial IoT",
    subtitle: "ESP32 ESP-IDF Wi-Fi/MQTT Local & Cloud Gateway",
    image: "/project-flowra.jpg",
    tags: ["ESP32", "ESP-IDF", "Wi-Fi", "MQTT", "NVS", "HTTP Server", "Embedded C"],
    description: "Built an ESP32 Wi-Fi/MQTT gateway with AP-mode setup, NVS-based credential storage, and MQTT status publishing, enabling both offline local configuration and online cloud device control.",
    caseStudy: {
      problem: "Industrial IoT devices operating in isolated environments require easy field commissioning without hardcoding Wi-Fi credentials into firmware binaries.",
      objective: "Engineered a robust ESP-IDF firmware gateway running an AP-mode configuration portal with NVS non-volatile flash storage for Wi-Fi credentials.",
      architecture: "Serial / Sensor Inputs -> ESP32 Gateway -> NVS Flash Memory -> ESP-IDF HTTP Server (AP Mode) -> MQTT Cloud Broker.",
      hardware: ["ESP32-DevKitC Board", "Status LEDs", "UART Serial Interface"],
      software: ["ESP-IDF SDK", "Embedded C", "Non-Volatile Storage (NVS)", "ESPAsyncWebServer", "MQTT Client"],
      circuit: "Dual-mode Wi-Fi radio configuration (AP + STA), UART communication line for peripheral data ingestion.",
      algorithm: "Boot state detector reading NVS flash; if unconfigured, launches AP mode web portal for credential submission, otherwise connects to MQTT broker.",
      implementation: "Utilized native ESP-IDF API primitives for NVS memory operations and customized MQTT payload serialization.",
      testing: "Executed 50+ power-cycle reboot tests to verify NVS credential persistence and automatic Wi-Fi reconnect.",
      results: "Achieved zero data frame loss during UART-to-MQTT packet conversion with automatic 5-second Wi-Fi reconnect stability.",
      challenges: "Managing ESP32 heap memory allocation between HTTP web server tasks and background MQTT daemon routines.",
      futureImprovements: "Integrating TLS/SSL X.509 certificate authentication for enterprise AWS IoT Core cloud deployments."
    }
  },
  {
    id: "smart-shopping-barcode",
    number: "03",
    title: "Smart Shopping System – Barcode Scanner Version (Advanced Upgrade)",
    subtitle: "Optical Barcode Scanning, SPI Touch Screen TFT UI & XAMPP IoT Cart",
    image: "/project-barcode.jpg",
    tags: ["ESP32", "Barcode Scanner Module", "SPI Touch Screen TFT", "XAMPP", "Localhost IoT Platform", "Embedded C++"],
    description: "Advanced upgraded retail automation cart integrating a laser barcode scanner over UART, 3.5-inch SPI Color Touch Screen TFT Display UI, and XAMPP Localhost IoT database synchronization.",
    caseStudy: {
      problem: "Need for high-speed commercial retail SKU identification paired with rich graphic touch screen UI display and real-time database syncing.",
      objective: "Develop an advanced ESP32 smart cart system combining a high-performance laser barcode scanner with a 3.5-inch SPI Color Touch Screen TFT display and XAMPP Apache/MySQL server synchronization.",
      architecture: "UART Barcode Scanner -> ESP32 MCU -> SPI 3.5\" TFT Touch Screen UI -> Wi-Fi HTTP API -> XAMPP Localhost IoT Database.",
      hardware: ["ESP32 Dev Board", "Laser Barcode Scanner Module", "3.5\" SPI Touch Screen TFT Display", "XAMPP Server", "Power Supply Unit"],
      software: ["Embedded C++", "ILI9488 / ST7796 SPI TFT Driver", "XAMPP Apache & MySQL", "HTTP REST API"],
      circuit: "Hardware UART TX/RX lines interfacing barcode scanner, SPI high-speed bus driving 3.5\" color TFT display, Wi-Fi 802.11 b/g/n module.",
      algorithm: "UART serial stream ASCII barcode parsing, real-time item price query against MySQL database, TFT frame buffer rendering, dynamic subtotal accumulation.",
      implementation: "Wrote high-speed SPI TFT graphics driver for custom cart UI layout, established wireless HTTP POST requests to XAMPP server endpoints.",
      testing: "Scanned 50+ packaged commercial retail products across continuous 100-item checkout runs.",
      results: "Achieved sub-80ms barcode parsing, 60Hz smooth TFT UI response, and 100% database sync reliability.",
      challenges: "Managing high-resolution SPI TFT frame buffer memory alongside HTTP network stack task queues.",
      futureImprovements: "Integrating contactless RFID dual-mode validation alongside barcode scanner."
    }
  },
  {
    id: "smart-shopping-rfid",
    number: "04",
    title: "Smart Shopping System – RFID Reader Version",
    subtitle: "13.56MHz Contactless RFID Auto-Billing & Anti-Collision Cart",
    image: "/project-shopping.jpg",
    tags: ["ESP32/ESP8266", "RFID RC522", "13.56MHz SPI", "LCD Display", "XAMPP", "Localhost IoT Platform"],
    description: "Retail automation cart prototype utilizing 13.56MHz SPI RFID RC522 contactless tags for instant item detection, dynamic item removal handling, and database billing sync.",
    caseStudy: {
      problem: "Manual supermarket billing queues create severe bottleneck delays due to optical alignment limitations of traditional barcode scanners.",
      objective: "Build smart cart billing using 13.56MHz contactless SPI RFID RC522 readers to detect item tags instantly upon placement into the cart.",
      architecture: "RFID RC522 SPI Tag Reader -> ESP32/ESP8266 MCU -> Dynamic Cart Memory Array -> 16x2 LCD -> XAMPP Billing Platform.",
      hardware: ["ESP32 / ESP8266 MCU", "MFRC522 13.56MHz RFID Reader Module", "RFID Tags & Smart Cards", "16x2 I2C LCD Display", "Buzzer Alert"],
      software: ["Embedded C++", "SPI Bus Driver for RC522", "Anti-Collision Tag Protocol", "MySQL Database Connector"],
      circuit: "SPI bus connecting RFID reader (MISO, MOSI, SCK, CS), I2C bus driving LCD display, pushbuttons for item removal interrupts.",
      algorithm: "SPI tag UID lookup against local cart memory array, real-time item addition/removal handling, instant subtotal recalculation.",
      implementation: "Built anti-collision RFID polling logic, dynamic item removal button interrupts, and cloud bill dispatch.",
      testing: "Simulated complete shopping cart checkouts with 20+ distinct RFID tagged items.",
      results: "Reduced customer checkout queue wait time by over 75% compared to manual optical scanning.",
      challenges: "Eliminating double-tag scanning glitches when items remain near the RFID antenna range.",
      futureImprovements: "Integrating wireless NFC payment terminal directly into cart hardware."
    }
  },
  {
    id: "smart-phase-shifter",
    number: "05",
    title: "IoT-Based Smart Phase Shifter & ESP32 OLED Projects",
    subtitle: "Relay Power Monitoring & Embedded Display Interfacing",
    image: "/project-phase-shifter.jpg",
    tags: ["ESP32", "Relays", "Rectifier Circuit", "SSD1306 OLED", "I2C", "ESP-IDF"],
    description: "Built a relay-based remote phase monitoring/switching system and OLED animation/mini-game demos, deepening expertise in electrical control safety and embedded graphics/display interfacing.",
    caseStudy: {
      problem: "Manual phase switching in AC power lines poses electrical safety hazards and lacks automated phase status visualization.",
      objective: "Build a safe relay-based AC phase monitoring/switching system with I2C SSD1306 OLED display status animation.",
      architecture: "AC Phase Sense Circuit -> Rectifier Optocoupler -> ESP32 GPIO/I2C -> Relay Driver Stage & SSD1306 OLED Display.",
      hardware: ["ESP32 MCU", "AC Phase Rectifier Circuit", "5V Relay Modules", "SSD1306 128x64 OLED Display (I2C)"],
      software: ["ESP-IDF", "Embedded C", "SSD1306 OLED Graphics Driver", "GPIO Interrupt Handler"],
      circuit: "Optocoupler isolated phase detection inputs, transistor relay drivers, and 400kHz I2C display bus.",
      algorithm: "Phase presence detection matrix initiating automatic relay line switching during phase loss events, updating OLED UI frame buffer.",
      implementation: "Wrote pure Embedded C graphics buffer routines and programmed relay switching delay safety windows.",
      testing: "Tested line phase dropouts under controlled low-voltage transformer conditions.",
      results: "Achieved smooth OLED UI frame updates at 60 FPS and reliable microsecond relay phase transfer.",
      challenges: "Preventing high-voltage AC inductive switching noise from resetting the ESP32 microcontroller.",
      futureImprovements: "Incorporating automatic power factor correction logic into the phase switching algorithm."
    }
  }
];

export const experienceData = [
  {
    company: "Nanostar Technologies, Coimbatore",
    role: "Embedded Systems Intern",
    duration: "Jun 2026",
    type: "Internship",
    responsibilities: [
      "Gained hands-on exposure to electronics production, assembly, and embedded product testing, applying precision and quality-control practices.",
      "Explored embedded motor control concepts using microcontrollers.",
      "Participated in board testing, component soldering, and hardware verification procedures."
    ],
    technologies: ["Embedded Systems", "Electronics Production", "Motor Control", "Hardware Testing", "Soldering"]
  },
  {
    company: "Tech UC Automation",
    role: "Embedded Systems and IoT Intern",
    duration: "May 2024 - Jun 2024",
    type: "Internship",
    responsibilities: [
      "Developed embedded firmware on ESP32, ESP8266, and Arduino for real-time IoT applications, integrating sensors via ADC, GPIO, PWM, UART, I2C, and SPI for data acquisition and control.",
      "Debugged and optimized hardware-software performance in resource-constrained systems, improving real-time sensor data handling.",
      "Built telemetry dashboards for remote IoT monitoring and control."
    ],
    technologies: ["ESP32", "ESP8266", "Arduino", "ADC", "GPIO", "PWM", "UART", "SPI", "I2C"]
  },
  {
    company: "EMGLitz Automation",
    role: "Embedded Systems and IoT Intern",
    duration: "Jan 2024 - Mar 2024",
    type: "Internship",
    responsibilities: [
      "Built and simulated embedded circuits using ESP32, Arduino, and ESP8266, implementing sensor interfacing and control logic for real-time applications.",
      "Performed hardware-level debugging and system testing, strengthening microcontroller programming skills.",
      "Simulated circuit schematics in Proteus before physical prototype assembly."
    ],
    technologies: ["ESP32", "Arduino", "ESP8266", "Sensor Interfacing", "Proteus", "Hardware Debugging"]
  }
];

export const educationData = [
  {
    degree: "B.E. Electronics and Communication Engineering",
    institution: "SNS College of Technology, Coimbatore",
    duration: "2023 - 2027",
    score: "CGPA: 8.12 / 10",
    status: "Final-year ECE student"
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "M.S.S.D Higher Secondary School, Coimbatore",
    duration: "2022 - 2023",
    score: "Score: 64.3%",
    status: "Completed"
  }
];

export const achievementsData = [
  {
    title: "Placement Coordinator",
    year: "2025 - 2026",
    desc: "Serving as Placement Coordinator, ECE Department, SNS College of Technology, liaising between students and recruiters to organize placement drives and interview logistics."
  },
  {
    title: "GATE EC Qualified & NPTEL",
    year: "2024 - 2025",
    desc: "GATE EC Qualified; completed two NPTEL certification courses in core engineering domains."
  },
  {
    title: "MSME Hackathon & Tech Symposium",
    year: "2024",
    desc: "Participated in the MSME Hackathon; presented a technical project at Bannari Amman Institute of Technology Technical Symposium."
  },
  {
    title: "Electroforge Organizer",
    year: "2024",
    desc: "Organized Electroforge, a circuit debugging event with 50+ participants, demonstrating leadership and technical event management."
  },
  {
    title: "10+ Projects Built",
    year: "2023 - 2027",
    desc: "Built 10+ academic and self-learning projects spanning Embedded Systems, IoT, and electronics."
  }
];

export const engineeringInterests = [
  "EMBEDDED SYSTEMS", "EMBEDDED FIRMWARE", "IoT GATEWAYS", "MICROCONTROLLERS", "SENSOR INTERFACING", "UART / SPI / I2C", "PCB DESIGN", "HARDWARE DEBUGGING"
];

export const toolsMarquee = [
  "ESP32", "STM32", "ESP8266", "Arduino", "Embedded C", "UART", "SPI", "I2C", "MQTT", "ESP-IDF", "STM32CubeIDE", "Proteus", "KiCad", "VS Code"
];
