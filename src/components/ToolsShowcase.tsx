import { Card } from "@/components/ui/card";
import { Image, Users, ArrowUpCircle } from "lucide-react";
import toolTextToImage from "@/assets/tool-text-to-image.jpg";
import toolFaceSwap from "@/assets/tool-faceswap.jpg";
import toolUpscaler from "@/assets/tool-upscaler.jpg";

const tools = [
  {
    icon: Image,
    title: "Text-to-Image Generation",
    description: "Transform your ideas into stunning visuals with high-fidelity AI generation.",
    image: toolTextToImage,
  },
  {
    icon: Users,
    title: "Identity Preservation & FaceSwap",
    description: "Seamlessly swap faces while maintaining identity and natural appearance.",
    image: toolFaceSwap,
  },
  {
    icon: ArrowUpCircle,
    title: "Image Upscaler & Restoration",
    description: "Enhance resolution and restore quality with advanced AI upscaling.",
    image: toolUpscaler,
  },
];

const ToolsShowcase = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful AI <span className="gradient-text">Tools</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three cutting-edge tools designed to bring your creative visions to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500 hover:glow-primary cursor-pointer"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={tool.image}
                  alt={tool.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold">{tool.title}</h3>
                </div>
                <p className="text-muted-foreground">{tool.description}</p>
              </div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsShowcase;
