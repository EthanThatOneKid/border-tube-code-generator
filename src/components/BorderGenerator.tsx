import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const BORDER_COLORS = [
  { name: "Empty", value: "empty" },
  { name: "Green", value: "green" },
  { name: "Purple", value: "purple" },
  { name: "Yellow", value: "yellow" },
  { name: "Turquoise", value: "turquoise" },
  { name: "Magenta", value: "magenta" },
  { name: "Orange", value: "orange" },
  { name: "Blue", value: "blue" },
];

const BorderGenerator = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tubeID, setTubeID] = useState(searchParams.get("tube") || "green");
  const [content, setContent] = useState(
    searchParams.get("content") || "Hello, World!",
  );
  const [bgColor, setBgColor] = useState(
    searchParams.get("bgColor") || "white",
  );
  const [paddingStyle, setPaddingStyle] = useState(
    searchParams.get("paddingStyle") || "2rem",
  );

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("tube", tubeID);
    params.set("content", content);
    params.set("bgColor", bgColor);
    params.set("paddingStyle", paddingStyle);
    setSearchParams(params);
  }, [tubeID, content, setSearchParams]);

  const generateHeadCode = () => {
    return `<link rel="stylesheet" href="https://fartlabs.org/tube-${tubeID}.css">`;
  };

  const generateBodyCode = () => {
    return `<div class="border-tube-${tubeID}" style="background-color: ${bgColor};${
      paddingStyle === "0" ? "" : ` padding: ${paddingStyle};`
    }">
${content}
</div>`;
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Border Tube Code Generator
          </h1>
          <p className="text-lg text-gray-600">
            Create beautiful FartLabs.org borders with ease.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div dangerouslySetInnerHTML={{ __html: generateBodyCode() }}></div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid gap-6 mb-6">
            <div className="grid gap-2">
              <Label htmlFor="borderColor">Border Color</Label>
              <Select value={tubeID} onValueChange={setTubeID}>
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
              <Label htmlFor="content">Content</Label>
              <Input
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter content text"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bgColor">Background Color</Label>
              <Input
                id="bgColor"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                placeholder="Enter background color"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="paddingStyle">Padding</Label>
              <Input
                id="paddingStyle"
                value={paddingStyle}
                onChange={(e) => setPaddingStyle(e.target.value)}
                placeholder="Enter padding style"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Generated <code>{"<head>"}</code> code
            </h2>
            <Button
              variant="outline"
              onClick={() => copyToClipboard(generateHeadCode())}
            >
              Copy Code
            </Button>
          </div>
          <pre className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
            {generateHeadCode()}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Generated <code>{"<body>"}</code> code
            </h2>
            <Button
              variant="outline"
              onClick={() => copyToClipboard(generateBodyCode())}
            >
              Copy Code
            </Button>
          </div>
          <pre className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
            {generateBodyCode()}
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
