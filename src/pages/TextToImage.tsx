import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const TextToImage = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt }
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedImage(data.imageUrl);
      toast({
        title: "Success!",
        description: "Image generated successfully",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'generated-image.png';
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Text-to-Image <span className="gradient-text">Generation</span>
        </h1>
        <p className="text-muted-foreground mb-8">
          Transform your ideas into stunning visuals with AI
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-bold mb-4">Your Prompt</h3>
            <Textarea
              placeholder="Describe the image you want to create..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[200px] mb-4"
            />
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full"
              variant="hero"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Image'
              )}
            </Button>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-bold mb-4">Result</h3>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              {loading ? (
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground">Creating your masterpiece...</p>
                </div>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-muted-foreground">Your generated image will appear here</p>
              )}
            </div>
            {generatedImage && !loading && (
              <Button
                onClick={downloadImage}
                className="w-full mt-4"
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Image
              </Button>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TextToImage;
