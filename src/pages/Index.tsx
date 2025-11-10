import { ParticleBackground } from "@/components/ParticleBackground";
import { CustomCursor } from "@/components/CustomCursor";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="relative">
      <ParticleBackground />
      <CustomCursor />
      
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>
      
      <footer className="py-8 text-center text-muted-foreground border-t border-border/20">
        <p>© 2024 Your Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
