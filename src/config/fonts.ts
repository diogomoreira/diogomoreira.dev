import { Hubot_Sans as Hubot, Inter } from "next/font/google";

export const hubot = Hubot({
  preload: true,
  display: "swap",
  variable: "--font-hubot",
});

export const sans = Inter({
  preload: true,
  display: "swap",
  variable: "--font-custom-sans",
});
