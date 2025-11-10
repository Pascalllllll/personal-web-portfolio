import { Button } from "@/components/ui/button";
import portraitImage from "@/assets/portrait.jpg";

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 md:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <p className="text-muted-foreground text-lg">Hello, I'm</p>
              <h1 className="text-5xl md:text-7xl font-bold glow-text">
                Your Name
              </h1>
              <div className="flex items-center gap-3 text-2xl md:text-3xl text-primary">
                <span>A Passionate</span>
                <span className="font-semibold animate-pulse">
                  Front-End Developer
                </span>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Crafting beautiful, interactive web experiences with modern technologies. 
              Specializing in React, Web3, and cutting-edge UI/UX design.
            </p>
            
            <div className="flex gap-4 pt-4">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                View Projects
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
              >
                My Story
              </Button>
            </div>
          </div>

          {/* Right: Portrait Image */}
          <div className="flex justify-center md:justify-end animate-fade-in">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-glow-secondary to-primary rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-glow" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl animate-float">
                <img 
                  src={portraitImage} 
                  alt="Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
