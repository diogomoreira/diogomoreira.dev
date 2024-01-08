import Navigation from "./Navigation";
import React from "react";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen mx-auto">
      <Navigation />
      <main className="px-10 py-10 flex-1 max-w-5xl container mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
