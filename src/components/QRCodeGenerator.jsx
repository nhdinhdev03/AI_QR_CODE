import { Copy, Download, RefreshCw, Sparkles } from "lucide-react";
import QRCode from "qrcode";
import React, { useCallback, useRef, useState } from "react";

const QRCodeGenerator = () => {
  const [qrData, setQrData] = useState("Hello, World! 🌍");
  const [qrOptions, setQrOptions] = useState({
    errorCorrectionLevel: "M",
    type: "image/png",
    quality: 0.92,
    margin: 1,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
    width: 256,
  });
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef(null);

  // AI-powered suggestions for QR code content
  const suggestions = [
    "Visit our website: https://example.com",
    "Contact us: tel:+1234567890",
    "Email us: mailto:hello@example.com",
    "WiFi: WIFI:T:WPA;S:MyNetwork;P:password;;",
    "Send SMS: sms:+1234567890:Hello!",
    "Location: geo:37.7749,-122.4194",
    "WhatsApp: https://wa.me/1234567890",
    "LinkedIn: https://linkedin.com/in/username",
    "Instagram: https://instagram.com/username",
    "Twitter: https://twitter.com/username",
  ];

  const generateQRCode = useCallback(async () => {
    if (!qrData.trim()) return;

    setIsGenerating(true);
    try {
      const canvas = canvasRef.current;
      await QRCode.toCanvas(canvas, qrData, qrOptions);
      const url = canvas.toDataURL();
      setQrCodeUrl(url);
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [qrData, qrOptions]);

  React.useEffect(() => {
    generateQRCode();
  }, [generateQRCode]);

  const downloadQRCode = (format = "png") => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");
    link.download = `qrcode.${format}`;
    link.href = qrCodeUrl;
    link.click();
  };

  const copyToClipboard = async () => {
    if (!qrCodeUrl) return;

    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      alert("QR code copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      alert("Failed to copy to clipboard");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQrData(suggestion);
  };

  const updateOption = (key, value) => {
    if (key.includes(".")) {
      const [parent, child] = key.split(".");
      setQrOptions((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setQrOptions((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  return (
    <div className="main-content">
      <div className="controls-section">
        <div className="form-group">
          <label htmlFor="qr-data">QR Code Content</label>
          <textarea
            id="qr-data"
            value={qrData}
            onChange={(e) => setQrData(e.target.value)}
            placeholder="Enter text, URL, or data to encode..."
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="error-correction">Error Correction Level</label>
          <select
            id="error-correction"
            value={qrOptions.errorCorrectionLevel}
            onChange={(e) =>
              updateOption("errorCorrectionLevel", e.target.value)
            }
          >
            <option value="L">Low (~7%)</option>
            <option value="M">Medium (~15%)</option>
            <option value="Q">Quartile (~25%)</option>
            <option value="H">High (~30%)</option>
          </select>
        </div>

        <div className="color-inputs">
          <div className="color-input-group">
            <label>Foreground Color</label>
            <div className="color-input-wrapper">
              <input
                type="color"
                className="color-input"
                value={qrOptions.color.dark}
                onChange={(e) => updateOption("color.dark", e.target.value)}
              />
              <input
                type="text"
                value={qrOptions.color.dark}
                onChange={(e) => updateOption("color.dark", e.target.value)}
                placeholder="#000000"
              />
            </div>
          </div>

          <div className="color-input-group">
            <label>Background Color</label>
            <div className="color-input-wrapper">
              <input
                type="color"
                className="color-input"
                value={qrOptions.color.light}
                onChange={(e) => updateOption("color.light", e.target.value)}
              />
              <input
                type="text"
                value={qrOptions.color.light}
                onChange={(e) => updateOption("color.light", e.target.value)}
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="size">Size: {qrOptions.width}px</label>
          <input
            type="range"
            id="size"
            className="range-input"
            min="128"
            max="512"
            value={qrOptions.width}
            onChange={(e) => updateOption("width", parseInt(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="margin">Margin: {qrOptions.margin}</label>
          <input
            type="range"
            id="margin"
            className="range-input"
            min="0"
            max="10"
            value={qrOptions.margin}
            onChange={(e) => updateOption("margin", parseInt(e.target.value))}
          />
        </div>

        <div className="ai-suggestions">
          <h3>
            <Sparkles
              size={18}
              style={{ display: "inline", marginRight: "8px" }}
            />
            AI Suggestions
          </h3>
          <div className="suggestion-buttons">
            {suggestions.slice(0, 6).map((suggestion, index) => (
              <button
                key={index}
                className="suggestion-btn"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.split(":")[0] +
                  (suggestion.includes(":") ? "..." : "")}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="preview-section">
        <div className="qr-preview">
          {isGenerating ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <RefreshCw className="animate-spin" size={24} />
              <span>Generating QR Code...</span>
            </div>
          ) : (
            <canvas
              ref={canvasRef}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          )}
        </div>

        <div className="download-buttons">
          <button
            className="btn btn-primary"
            onClick={() => downloadQRCode("png")}
            disabled={!qrCodeUrl}
          >
            <Download size={18} />
            Download PNG
          </button>

          <button
            className="btn btn-secondary"
            onClick={copyToClipboard}
            disabled={!qrCodeUrl}
          >
            <Copy size={18} />
            Copy to Clipboard
          </button>
        </div>

        <div
          style={{
            marginTop: "20px",
            fontSize: "0.9rem",
            color: "#666",
            textAlign: "center",
          }}
        >
          <p>✨ Features:</p>
          <ul style={{ listStyle: "none", padding: 0, margin: "10px 0" }}>
            <li>• Customizable colors and sizes</li>
            <li>• Multiple error correction levels</li>
            <li>• AI-powered content suggestions</li>
            <li>• High-quality PNG export</li>
            <li>• Copy to clipboard support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
