import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">Creatively</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#tools" className="text-sm hover:text-primary transition-colors">Tools</a>
          <a href="#gallery" className="text-sm hover:text-primary transition-colors">Gallery</a>
          <a href="#pricing" className="text-sm hover:text-primary transition-colors">Pricing</a>
        </div>

        <Button variant="hero" size="sm">
          Sign In with Google
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
