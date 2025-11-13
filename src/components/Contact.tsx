import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 md:px-12 py-20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 glow-text">Get In Touch</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's create something amazing together
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <h3 className="text-xl font-bold mb-2 text-primary">Email</h3>
              <p className="text-muted-foreground">hoseeee777@gmail.com</p>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <h3 className="text-xl font-bold mb-2 text-primary">Location</h3>
              <p className="text-muted-foreground">Kediri, Indonesia</p>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <h3 className="text-xl font-bold mb-2 text-primary">Social</h3>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  GitHub
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Instagram
                </a>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input 
                  placeholder="Your Name"
                  className="bg-background/50 border-primary/30 focus:border-primary"
                />
              </div>
              <div>
                <Input 
                  type="email"
                  placeholder="Your Email"
                  className="bg-background/50 border-primary/30 focus:border-primary"
                />
              </div>
              <div>
                <Textarea 
                  placeholder="Your Message"
                  rows={5}
                  className="bg-background/50 border-primary/30 focus:border-primary resize-none"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
