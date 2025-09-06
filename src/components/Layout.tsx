import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({ children, title, description }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {title && (
          <div className="bg-gradient-hero text-white py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                {title}
              </h1>
              {description && (
                <p className="text-xl opacity-90 max-w-2xl">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;