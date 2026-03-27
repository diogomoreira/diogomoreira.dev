import { cn } from "@/utils/cn";
import React from "react";
import Footer from "./Footer";
import GrainEffect from "./GrainEffect";
import Navigation from "./Navigation";

type LayoutProps = {
  children: React.ReactNode;
  className: string;
};

const baseClasses = "flex flex-col h-screen";

const Layout: React.FC<LayoutProps> = ({ children, className }: LayoutProps) => {
  return (
    <div className={cn(baseClasses, className)}>
      <GrainEffect />
      <Navigation />
      <main className="p-10 flex-1 max-w-5xl container mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
