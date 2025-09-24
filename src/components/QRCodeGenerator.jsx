import { Copy, Download, RefreshCw, Sparkles, Zap } from "lucide-react";
import QRCode from "qrcode";
import React, { useCallback, useRef, useState } from "react";

// Import images
import img10 from "../img/image copy 10.png";
import img11 from "../img/image copy 11.png";
import img12 from "../img/image copy 12.png";
import img13 from "../img/image copy 13.png";
import img14 from "../img/image copy 14.png";
import img15 from "../img/image copy 15.png";
import img16 from "../img/image copy 16.png";
import img2 from "../img/image copy 2.png";
import img3 from "../img/image copy 3.png";
import img4 from "../img/image copy 4.png";
import img5 from "../img/image copy 5.png";
import img6 from "../img/image copy 6.png";
import img7 from "../img/image copy 7.png";
import img8 from "../img/image copy 8.png";
import img9 from "../img/image copy 9.png";
import img1 from "../img/image copy.png";

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
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageSelector, setShowImageSelector] = useState(false);

  const canvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);

  // Image collection - chỉ có hình ảnh, không có emoji
  const imageCollection = [
    { content: img1, name: "Meme 1" },
    { content: img2, name: "Meme 2" },
    { content: img3, name: "Meme 3" },
    { content: img4, name: "Meme 4" },
    { content: img5, name: "Meme 5" },
    { content: img6, name: "Meme 6" },
    { content: img7, name: "Meme 7" },
    { content: img8, name: "Meme 8" },
    { content: img9, name: "Meme 9" },
    { content: img10, name: "Meme 10" },
    { content: img11, name: "Meme 11" },
    { content: img12, name: "Meme 12" },
    { content: img13, name: "Meme 13" },
    { content: img14, name: "Meme 14" },
    { content: img15, name: "Meme 15" },
    { content: img16, name: "Meme 16" },
  ];

  // Function to get random image
  const getRandomImage = () => {
    return imageCollection[Math.floor(Math.random() * imageCollection.length)];
  };

  // Function to check if text is a URL
  const isURL = (text) => {
    try {
      new URL(text);
      return true;
    } catch {
      const lowerText = text.toLowerCase().trim();
      return (
        lowerText.includes("http") ||
        lowerText.includes("www.") ||
        lowerText.includes(".com") ||
        lowerText.includes(".net") ||
        lowerText.includes(".org") ||
        lowerText.includes(".io") ||
        lowerText.includes(".co")
      );
    }
  };

  // Auto random image when URL is detected
  React.useEffect(() => {
    if (qrData.trim() && isURL(qrData.trim())) {
      // Random image ngay lập tức và mở image selector để user thấy
      const randomImage = getRandomImage();
      setSelectedImage(randomImage);
      setShowImageSelector(true); // Mở selector để user thấy ảnh được chọn
    }
  }, [qrData]);

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

      // Create overlay canvas for media
      const overlayCtx = overlayCanvas.getContext("2d");

      // Copy original QR code to overlay canvas
      overlayCanvas.width = canvas.width;
      overlayCanvas.height = canvas.height;
      overlayCtx.drawImage(canvas, 0, 0);

      // Add image in the center if selected
      if (selectedImage) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const imageSize = Math.min(canvas.width, canvas.height) * 0.2;

        // Create background circle with gradient
        const gradient = overlayCtx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          imageSize * 0.9
        );
        gradient.addColorStop(0, qrOptions.color.light);
        gradient.addColorStop(0.8, qrOptions.color.light);
        gradient.addColorStop(1, "rgba(255,255,255,0.9)");

        overlayCtx.fillStyle = gradient;
        overlayCtx.beginPath();
        overlayCtx.arc(centerX, centerY, imageSize * 0.9, 0, 2 * Math.PI);
        overlayCtx.fill();

        // Add decorative border ring
        overlayCtx.strokeStyle = qrOptions.color.dark;
        overlayCtx.lineWidth = 3;
        overlayCtx.stroke();

        // Load and draw image
        const img = new Image();
        img.onload = () => {
          overlayCtx.save();

          // Create circular clipping path for image
          overlayCtx.beginPath();
          overlayCtx.arc(centerX, centerY, imageSize * 0.7, 0, 2 * Math.PI);
          overlayCtx.clip();

          // Add shadow for image
          overlayCtx.shadowColor = "rgba(0,0,0,0.6)";
          overlayCtx.shadowBlur = 15;
          overlayCtx.shadowOffsetX = 5;
          overlayCtx.shadowOffsetY = 5;

          // Calculate image dimensions to fit in circle
          const imgSize = imageSize * 1.4;
          overlayCtx.drawImage(
            img,
            centerX - imgSize / 2,
            centerY - imgSize / 2,
            imgSize,
            imgSize
          );

          overlayCtx.restore();

          // Update QR code URL after image is loaded
          const url = overlayCanvas.toDataURL();
          setQrCodeUrl(url);

          // Add success animation after image is loaded
          setTimeout(() => {
            if (overlayCanvas) {
              overlayCanvas.className = "qr-canvas-display new-generated";
              setTimeout(() => {
                overlayCanvas.className = "qr-canvas-display";
              }, 600);
            }
          }, 100);
        };
        img.src = selectedImage.content;
      } else {
        // No image selected, just set the QR code URL
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
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [qrData, qrOptions, selectedImage]);

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

        {/* Image Selector Section */}
        <div className="meme-section">
          <h3>🖼️ Choose Meme Image</h3>
          {selectedImage && isURL(qrData.trim()) && (
            <div
              style={{
                background: "linear-gradient(45deg, #4ecdc4, #44a08d)",
                color: "white",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "0.8rem",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              ✨ Auto-selected: {selectedImage.name} for your URL!
            </div>
          )}
          <div className="meme-controls">
            <button
              className="meme-toggle-btn"
              onClick={() => setShowImageSelector(!showImageSelector)}
            >
              {showImageSelector ? "Hide Images" : "Show Images"}
            </button>
            <button
              className="random-meme-btn"
              onClick={() => setSelectedImage(getRandomImage())}
              title="Random Image"
            >
              🎲 Random
            </button>
          </div>

          {showImageSelector && (
            <div className="media-grid">
              {imageCollection.map((image, index) => (
                <button
                  key={index}
                  className={`media-btn image ${
                    selectedImage?.content === image.content ? "selected" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                  title={image.name}
                >
                  <div className="media-image-container">
                    <img
                      src={image.content}
                      alt={image.name}
                      className="media-image"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="media-image-fallback">🖼️</div>
                  </div>
                  <span className="media-name">{image.name}</span>
                </button>
              ))}
              <button
                className={`media-btn ${!selectedImage ? "selected" : ""}`}
                onClick={() => setSelectedImage(null)}
                title="No Image"
              >
                <span className="media-emoji">❌</span>
                <span className="media-name">None</span>
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
              {selectedImage && (
                <div className="meme-indicator">
                  <Zap size={16} />
                  <span>Enhanced with: {selectedImage.name}</span>
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
