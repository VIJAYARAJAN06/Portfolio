import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vijayarajan A — Embedded Systems Engineer",
  description:
    "Portfolio of Vijayarajan A — Embedded Systems, Firmware, IoT & Hardware Engineer. Specializing in ESP32, STM32, FreeRTOS, MQTT, PCB Design, and TinyML.",
  keywords: [
    "Embedded Systems Engineer",
    "Firmware Developer",
    "IoT Engineer",
    "ESP32",
    "STM32",
    "FreeRTOS",
    "MQTT",
    "PCB Design",
    "TinyML",
    "Hardware Engineer",
    "Vijayarajan",
  ],
  authors: [{ name: "Vijayarajan A" }],
  creator: "Vijayarajan A",
  openGraph: {
    title: "Vijayarajan A — Embedded Systems Engineer",
    description:
      "Cinematic engineering portfolio showcasing embedded systems, firmware, IoT, and hardware projects.",
    type: "website",
    locale: "en_IN",
    siteName: "Vijayarajan A Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vijayarajan A — Embedded Systems Engineer",
    description: "Embedded Systems, Firmware, IoT & Hardware Engineering Portfolio",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-space-950 text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
