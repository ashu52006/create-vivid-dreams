import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">Creatively</span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Features</a>
            <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>

          <div className="text-sm text-muted-foreground">
            © 2025 Creatively. All rights reserved.
          </div>
        </div>

        {/* AdSense Placeholder */}
        <div className="mt-8 p-6 bg-muted/20 rounded-lg border border-dashed border-border text-center">
          <p className="text-sm text-muted-foreground">Advertisement Placeholder</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
