import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      
      {/* Animated grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf620_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf620_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm text-muted-foreground">Powered by Advanced AI Technology</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
          Create <span className="gradient-text">Stunning Images</span> with AI
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          Transform your imagination into reality with our suite of powerful AI tools. Generate, edit, and enhance images like never before.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <Button size="lg" variant="hero" className="group">
            Get Started Free
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline">
            View Gallery
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
          <div>
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">10K+</div>
            <div className="text-sm text-muted-foreground">Images Generated</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">5K+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">99%</div>
            <div className="text-sm text-muted-foreground">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
