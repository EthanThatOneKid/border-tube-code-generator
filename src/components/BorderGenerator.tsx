
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const BORDER_COLORS = [
  { name: "Black", value: "black" },
  { name: "Gray", value: "gray" },
  { name: "Red", value: "red" },
  { name: "Blue", value: "blue" },
  { name: "Green", value: "green" },
  { name: "Yellow", value: "yellow" },
  { name: "Purple", value: "purple" },
];

const BORDER_STYLES = [
  { name: "Solid", value: "solid" },
  { name: "Dashed", value: "dashed" },
  { name: "Dotted", value: "dotted" },
  { name: "Double", value: "double" },
];

const BorderGenerator = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [borderColor, setBorderColor] = useState(searchParams.get("color") || "black");
  const [borderStyle, setBorderStyle] = useState(searchParams.get("style") || "solid");
  const [borderWidth, setBorderWidth] = useState(searchParams.get("width") || "2");
  const [content, setContent] = useState(searchParams.get("content") || "Hello, Border!");

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("color", borderColor);
    params.set("style", borderStyle);
    params.set("width", borderWidth);
    params.set("content", content);
    setSearchParams(params);
  }, [borderColor, borderStyle, borderWidth, content, setSearchParams]);

  const generateCSSCode = () => {
    return `border: ${borderWidth}px ${borderStyle} ${borderColor};`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Border Generator</h1>
          <p className="text-lg text-gray-600">Create beautiful CSS borders with ease</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div
            className="w-full h-32 flex items-center justify-center bg-gray-50 rounded-md transition-all duration-200"
            style={{
              border: `${borderWidth}px ${borderStyle} ${borderColor}`,
            }}
          >
            <p className="text-gray-700">{content}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid gap-6 mb-6">
            <div className="grid gap-2">
              <Label htmlFor="borderColor">Border Color</Label>
              <Select value={borderColor} onValueChange={setBorderColor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {BORDER_COLORS.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      {color.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="borderStyle">Border Style</Label>
              <Select value={borderStyle} onValueChange={setBorderStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {BORDER_STYLES.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="borderWidth">Border Width (px)</Label>
              <Input
                id="borderWidth"
                type="number"
                min="1"
                max="20"
                value={borderWidth}
                onChange={(e) => setBorderWidth(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Input
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter content text"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Generated CSS</h2>
            <Button
              variant="outline"
              onClick={() => copyToClipboard(generateCSSCode())}
            >
              Copy Code
            </Button>
          </div>
          <pre className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
            {generateCSSCode()}
          </pre>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-600">
        <a
          href="https://fartlabs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 transition-colors"
        >
          🧪 FartLabs
        </a>
      </footer>
    </div>
  );
};

export default BorderGenerator;
