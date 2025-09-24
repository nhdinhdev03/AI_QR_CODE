import { Copy, Download, RefreshCw, Smile, Sparkles, Zap } from "lucide-react";
import QRCode from "qrcode";
import React, { useCallback, useRef, useState } from "react";

const QRCodeGenerator = () => {
  const [qrData, setQrData] = useState("Hello, World! 🌍");
  const [qrOptions, setQrOptions] = useState({
    errorCorrectionLevel: "H", // High error correction for logo overlay
    type: "image/png",
    quality: 0.92,
    margin: 1,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
    width: 300,
  });
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState("😎");
  const [showMemeSelector, setShowMemeSelector] = useState(false);
  const canvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);

  // Meme collection for QR code center
  const memeCollection = [
    { emoji: "😎", name: "Too Cool", category: "face" },
    { emoji: "🤣", name: "ROFL", category: "face" },
    { emoji: "🔥", name: "Lit AF", category: "object" },
    { emoji: "💎", name: "Diamond Hands", category: "object" },
    { emoji: "🚀", name: "To the Moon", category: "object" },
    { emoji: "⚡", name: "Zap Zap", category: "object" },
    { emoji: "🎉", name: "Party Time", category: "object" },
    { emoji: "💀", name: "Dead Inside", category: "face" },
    { emoji: "🤖", name: "Beep Boop", category: "face" },
    { emoji: "👑", name: "King/Queen", category: "object" },
    { emoji: "🌟", name: "Shiny", category: "object" },
    { emoji: "🎯", name: "On Target", category: "object" },
    { emoji: "💯", name: "Keep it 100", category: "object" },
    { emoji: "🎭", name: "Drama Queen", category: "object" },
    { emoji: "🎪", name: "Circus Life", category: "object" },
    { emoji: "🦄", name: "Unicorn Vibes", category: "animal" },
    { emoji: "🐱‍💻", name: "Code Cat", category: "animal" },
    { emoji: "🐸", name: "Pepe Vibes", category: "animal" },
    { emoji: "🦖", name: "Dino Mode", category: "animal" },
    { emoji: "👻", name: "Spooky Boi", category: "face" },
    { emoji: "🤡", name: "Clown World", category: "face" },
    { emoji: "🧠", name: "Big Brain", category: "face" },
    { emoji: "🍕", name: "Pizza Time", category: "food" },
    { emoji: "☕", name: "Caffeine", category: "food" },
    { emoji: "🌮", name: "Taco Tuesday", category: "food" },
    { emoji: "🎮", name: "Gamer Mode", category: "object" },
    { emoji: "📱", name: "Phone Life", category: "object" },
    { emoji: "💻", name: "Dev Life", category: "object" },
    { emoji: "🏆", name: "Winner", category: "object" },
    { emoji: "🦾", name: "Cyborg", category: "object" },
  ];

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

    // Add generating animation
    const overlayCanvas = overlayCanvasRef.current;
    if (overlayCanvas) {
      overlayCanvas.className = "qr-canvas-display generating";
    }

    try {
      const canvas = canvasRef.current;

      // Generate basic QR code
      await QRCode.toCanvas(canvas, qrData, qrOptions);

      // Create overlay canvas for meme
      const overlayCtx = overlayCanvas.getContext("2d");

      // Copy original QR code to overlay canvas
      overlayCanvas.width = canvas.width;
      overlayCanvas.height = canvas.height;
      overlayCtx.drawImage(canvas, 0, 0);

      // Add meme emoji in the center
      if (selectedMeme) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const emojiSize = Math.min(canvas.width, canvas.height) * 0.15; // 15% of canvas size

        // Create white background circle for emoji with gradient
        const gradient = overlayCtx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          emojiSize * 0.8
        );
        gradient.addColorStop(0, qrOptions.color.light);
        gradient.addColorStop(0.7, qrOptions.color.light);
        gradient.addColorStop(1, "rgba(255,255,255,0.8)");

        overlayCtx.fillStyle = gradient;
        overlayCtx.beginPath();
        overlayCtx.arc(centerX, centerY, emojiSize * 0.8, 0, 2 * Math.PI);
        overlayCtx.fill();

        // Add border ring
        overlayCtx.strokeStyle = qrOptions.color.dark;
        overlayCtx.lineWidth = 2;
        overlayCtx.stroke();

        // Add emoji with shadow
        overlayCtx.shadowColor = "rgba(0,0,0,0.4)";
        overlayCtx.shadowBlur = 8;
        overlayCtx.shadowOffsetX = 3;
        overlayCtx.shadowOffsetY = 3;

        overlayCtx.font = `${emojiSize}px Arial`;
        overlayCtx.textAlign = "center";
        overlayCtx.textBaseline = "middle";
        overlayCtx.fillText(selectedMeme, centerX, centerY);
      }

      const url = overlayCanvas.toDataURL();
      setQrCodeUrl(url);

      // Add success animation
      setTimeout(() => {
        if (overlayCanvas) {
          overlayCanvas.className = "qr-canvas-display new-generated";
          setTimeout(() => {
            overlayCanvas.className = "qr-canvas-display";
          }, 600);
        }
      }, 100);
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [qrData, qrOptions, selectedMeme]);

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

        {/* Meme Selector Section */}
        <div className="meme-section">
          <h3>
            <Smile
              size={18}
              style={{ display: "inline", marginRight: "8px" }}
            />
            Choose Your Meme Style
          </h3>
          <div className="meme-controls">
            <button
              className="meme-toggle-btn"
              onClick={() => setShowMemeSelector(!showMemeSelector)}
            >
              {showMemeSelector ? "Hide Memes" : "Show Memes"} {selectedMeme}
            </button>
            <button
              className="random-meme-btn"
              onClick={() => {
                const randomMeme =
                  memeCollection[
                    Math.floor(Math.random() * memeCollection.length)
                  ];
                setSelectedMeme(randomMeme.emoji);
              }}
              title="Random Meme"
            >
              🎲 Random
            </button>
          </div>

          {showMemeSelector && (
            <div className="meme-grid">
              {memeCollection.map((meme, index) => (
                <button
                  key={index}
                  className={`meme-btn ${
                    selectedMeme === meme.emoji ? "selected" : ""
                  }`}
                  onClick={() => setSelectedMeme(meme.emoji)}
                  title={meme.name}
                >
                  <span className="meme-emoji">{meme.emoji}</span>
                  <span className="meme-name">{meme.name}</span>
                </button>
              ))}
              <button
                className={`meme-btn ${selectedMeme === "" ? "selected" : ""}`}
                onClick={() => setSelectedMeme("")}
                title="No Meme"
              >
                <span className="meme-emoji">❌</span>
                <span className="meme-name">None</span>
              </button>
            </div>
          )}
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
              <span>Generating Awesome QR Code...</span>
            </div>
          ) : (
            <div className="qr-canvas-container">
              <canvas ref={canvasRef} style={{ display: "none" }} />
              <canvas
                ref={overlayCanvasRef}
                className="qr-canvas-display"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                }}
              />
              {selectedMeme && (
                <div className="meme-indicator">
                  <Zap size={16} />
                  <span>
                    {selectedMeme === "🔥"
                      ? "This QR is LIT! 🔥"
                      : selectedMeme === "💎"
                      ? "Diamond Hands QR! 💎"
                      : selectedMeme === "🚀"
                      ? "QR to the Moon! 🚀"
                      : selectedMeme === "🤣"
                      ? "LOL QR Code! 🤣"
                      : selectedMeme === "💀"
                      ? "Deadly QR Code! 💀"
                      : selectedMeme === "🤖"
                      ? "Beep Boop QR! 🤖"
                      : selectedMeme === "🦄"
                      ? "Magical QR! 🦄"
                      : selectedMeme === "🎉"
                      ? "Party QR! 🎉"
                      : selectedMeme === "👑"
                      ? "Royal QR Code! 👑"
                      : selectedMeme === "🤡"
                      ? "Clown QR! 🤡"
                      : selectedMeme === "🧠"
                      ? "Big Brain QR! 🧠"
                      : selectedMeme === "🍕"
                      ? "Pizza QR Time! 🍕"
                      : selectedMeme === "🎮"
                      ? "Gamer QR! 🎮"
                      : "Meme Enhanced!"}
                  </span>
                </div>
              )}
            </div>
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
