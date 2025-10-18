import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Download, ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const FaceSwap = () => {
  const [prompt, setPrompt] = useState("");
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

  const handleGenerate = async () => {
    if (!prompt.trim() || !sourceImage) {
      toast({
        title: "Error",
        description: "Please upload an image and enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('faceswap', {
        body: { imageUrl: sourceImage, prompt }
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedImage(data.imageUrl);
      toast({
        title: "Success!",
        description: "Face swap completed successfully",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process face swap",
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
      link.download = 'faceswap-result.png';
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
          Identity Preservation & <span className="gradient-text">FaceSwap</span>
        </h1>
        <p className="text-muted-foreground mb-8">
          Transform images while preserving facial identity
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-bold mb-4">Upload & Transform</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Source Image</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {sourceImage ? (
                    <img src={sourceImage} alt="Source" className="max-h-48 mx-auto rounded" />
                  ) : (
                    <>
                      <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">Click to upload image</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <Textarea
              placeholder="Describe how you want to transform the image..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[150px] mb-4"
            />
            <Button
              onClick={handleGenerate}
              disabled={loading || !sourceImage}
              className="w-full"
              variant="hero"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Transform Image'
              )}
            </Button>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-bold mb-4">Result</h3>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              {loading ? (
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground">Processing face swap...</p>
                </div>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Result"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-muted-foreground">Your transformed image will appear here</p>
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

export default FaceSwap;
