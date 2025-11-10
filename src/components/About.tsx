import { Card } from "@/components/ui/card";

export const About = () => {
  const skills = [
    { name: "React & Next.js", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Web3 & Blockchain", level: 85 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Three.js", level: 80 },
    { name: "UI/UX Design", level: 88 },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 md:px-12 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 glow-text">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A developer passionate about creating exceptional digital experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Story Card */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-primary">My Journey</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I've been crafting digital experiences for over 5 years, working with startups 
              and established companies to bring their visions to life. My expertise spans 
              from traditional web development to cutting-edge Web3 applications.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I believe in clean code, beautiful design, and creating solutions that not only 
              look stunning but also deliver real value to users.
            </p>
          </Card>

          {/* Skills Card */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-primary">Skills & Expertise</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-glow-secondary transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${skill.level}%`,
                        animationDelay: `${index * 100}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
