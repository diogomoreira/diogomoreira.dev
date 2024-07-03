import { cn } from "@/utils/cn";
import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

type LayoutProps = {
  children: React.ReactNode;
  className: string;
};

const baseClasses = "flex flex-col h-screen mx-auto";

const Layout: React.FC<LayoutProps> = ({ children, className }: LayoutProps) => {
  return (
    <div className={cn(baseClasses, className)}>
      <svg
        className="pointer-events-none fixed isolate z-50 opacity-70 mix-blend-soft-light"
        width="100%"
        height="100%"
      >
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch"></feTurbulence>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)"></rect>
      </svg>
      <Navigation />
      <main className="px-6 py-10 flex-1 max-w-5xl container mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
