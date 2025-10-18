import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Download, ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Upscaler = () => {
  const [loading, setLoading] = useState(false);
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpscale = async () => {
    if (!sourceImage) {
      toast({
        title: "Error",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('upscale-image', {
        body: { imageUrl: sourceImage }
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedImage(data.imageUrl);
      toast({
        title: "Success!",
        description: "Image upscaled successfully",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to upscale image",
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
      link.download = 'upscaled-image.png';
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
          Image <span className="gradient-text">Upscaler & Restoration</span>
        </h1>
        <p className="text-muted-foreground mb-8">
          Enhance resolution and restore quality with AI
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-bold mb-4">Upload Image</h3>
            
            <div className="mb-6">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {sourceImage ? (
                    <img src={sourceImage} alt="Source" className="max-h-64 mx-auto rounded" />
                  ) : (
                    <>
                      <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg text-muted-foreground mb-2">Click to upload image</p>
                      <p className="text-sm text-muted-foreground">Supports JPG, PNG, WEBP</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <Button
              onClick={handleUpscale}
              disabled={loading || !sourceImage}
              className="w-full"
              variant="hero"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Upscaling...
                </>
              ) : (
                'Upscale & Enhance'
              )}
            </Button>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-bold mb-4">Enhanced Result</h3>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              {loading ? (
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground">Enhancing your image...</p>
                </div>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Upscaled"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-muted-foreground">Your enhanced image will appear here</p>
              )}
            </div>
            {generatedImage && !loading && (
              <Button
                onClick={downloadImage}
                className="w-full mt-4"
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Enhanced Image
              </Button>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Upscaler;
