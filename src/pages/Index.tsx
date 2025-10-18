import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ToolsShowcase from "@/components/ToolsShowcase";
import Gallery from "@/components/Gallery";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <div id="tools">
          <ToolsShowcase />
        </div>
        <div id="gallery">
          <Gallery />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
