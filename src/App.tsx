import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import { ThemeToggle } from "@/components/ThemeToggle";
import { MusicToggle } from "@/components/MusicToggle";
import { Clock } from "@/components/Clock";
import { Github, Linkedin, Instagram } from "lucide-react";

const queryClient = new QueryClient();

const getInitialTheme = (): "light" | "dark" => {
  // ... (fungsi ini tidak berubah) ...
  if (typeof window !== "undefined") {
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  }
  return "dark";
};

const App = () => {
  // ... (state, useEffect, dan handleThemeToggle tidak berubah) ...
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div
          className={`theme-transition-overlay ${isTransitioning ? "active" : ""
            }`}
        />
        <Toaster />
        <Sonner />

        <div className="fixed top-6 right-6 z-50 flex items-center gap-4">

          {/* Grup 1: Ikon Sosial & Tombol Tema */}
          <div className="flex items-center gap-3">

            <a
              href="https://github.com/Pascalllllll"
              target="_blank"
              rel="noopener noreferrer"
              // 💡 UBAH 'hover:text-foreground' menjadi 'hover:text-primary'
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Profil GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/hoseafs-3a9a0931b"
              target="_blank"
              rel="noopener noreferrer"
              // 💡 UBAH 'hover:text-foreground' menjadi 'hover:text-primary'
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Profil LinkedIn"
            >
              <Linkedin size={20} />
            </a>

            <a
              href="https://instagram.com/hoseafelix_"
              target="_blank"
              rel="noopener noreferrer"
              // 💡 UBAH 'hover:text-foreground' menjadi 'hover:text-primary'
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Profil Instagram"
            >
              <Instagram size={20} />
            </a>

            <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
          </div>

          {/* Grup 2: Pembatas Vertikal */}
          <div className="h-6 w-px bg-border/40"></div>

          {/* Grup 3: Jam & Tanggal */}
          <Clock />

        </div>
        
        {/* FOOTER TENGAH BAWAH (MusicToggle) */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <MusicToggle />
        </div>


        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index theme={theme} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;