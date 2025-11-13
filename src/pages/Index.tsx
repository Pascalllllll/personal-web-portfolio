import { ParticleBackground } from "@/components/ParticleBackground";
import { CustomCursor } from "@/components/CustomCursor";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";

// 💡 1. Tentukan interface untuk props yang akan diterima dari App.tsx
interface IndexProps {
  theme: "light" | "dark";
}

// 💡 2. Terima props 'theme'
const Index = ({ theme }: IndexProps) => {
  return (
    <div className="relative">
      {/* 💡 3. Teruskan 'theme' ke ParticleBackground */}
      <ParticleBackground theme={theme} />

      <main>
        <Hero theme={theme} />
        <About />
        <Portfolio />
        <Contact />
      </main>

      <footer className="py-8 text-center text-muted-foreground border-t border-border/20">
        <p>© 2025 Hosea Felix Sanjaya. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;