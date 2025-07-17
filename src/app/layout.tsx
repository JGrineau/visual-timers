import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./clientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visual Timers",
  keywords: [
    "timers",
    "visual timers",
    "pomodoro",
    "radial timer",
    "linear timer",
    "countdown",
    "productivity",
    "focus",
    "time management",
    "Next.js",
    "React",
  ],
  description:
    "Visual Timers is a Next.js app offering customizable Pomodoro, radial, and linear timers. Perfect for productivity, focus, and time management. Try our visual countdowns and explore timer tools for work, study, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
