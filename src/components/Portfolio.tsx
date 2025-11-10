import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Portfolio = () => {
  const projects = [
    {
      title: "Web3 DApp Platform",
      description: "A decentralized application for NFT trading with wallet integration and real-time blockchain data.",
      tech: ["React", "Web3.js", "Solidity", "Tailwind"],
      link: "#",
    },
    {
      title: "SaaS Dashboard",
      description: "Enterprise analytics dashboard with real-time data visualization and team collaboration tools.",
      tech: ["Next.js", "TypeScript", "D3.js", "PostgreSQL"],
      link: "#",
    },
    {
      title: "E-Commerce Platform",
      description: "Modern shopping experience with AI-powered recommendations and seamless checkout flow.",
      tech: ["React", "Node.js", "Stripe", "MongoDB"],
      link: "#",
    },
    {
      title: "3D Portfolio Site",
      description: "Interactive portfolio featuring Three.js animations and immersive user experience.",
      tech: ["React", "Three.js", "GSAP", "WebGL"],
      link: "#",
    },
  ];

  return (
    <section id="portfolio" className="min-h-screen flex items-center justify-center px-6 md:px-12 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 glow-text">Portfolio</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of my recent work and projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="group p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/60 transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Button 
                  variant="outline"
                  className="w-full border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  View Project →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
