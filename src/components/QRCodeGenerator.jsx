import { Copy, Download, RefreshCw, Sparkles, Zap } from "lucide-react";
import QRCode from "qrcode";
import React, { useCallback, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { getTranslation } from "../utils/translations";

// Import images
import img10 from "../img/image copy 10.png";
import img11 from "../img/image copy 11.png";
import img12 from "../img/image copy 12.png";
import img13 from "../img/image copy 13.png";
import img14 from "../img/image copy 14.png";
import img15 from "../img/image copy 15.png";
import img16 from "../img/image copy 16.png";
import img17 from "../img/image copy 17.png";
import img18 from "../img/image copy 18.png";
import img19 from "../img/image copy 19.png";
import img2 from "../img/image copy 2.png";
import img20 from "../img/image copy 20.png";
import img21 from "../img/image copy 21.png";
import img22 from "../img/image copy 22.png";
import img23 from "../img/image copy 23.png";
import img24 from "../img/image copy 24.png";
import img25 from "../img/image copy 25.png";
import img26 from "../img/image copy 26.png";
import img27 from "../img/image copy 27.png";
import img28 from "../img/image copy 28.png";
import img29 from "../img/image copy 29.png";
import img3 from "../img/image copy 3.png";
import img30 from "../img/image copy 30.png";
import img4 from "../img/image copy 4.png";
import img5 from "../img/image copy 5.png";
import img6 from "../img/image copy 6.png";
import img7 from "../img/image copy 7.png";
import img8 from "../img/image copy 8.png";
import img9 from "../img/image copy 9.png";
import img1 from "../img/image copy.png";
import imgMain from "../img/image.png";

const QRCodeGenerator = () => {
  const { language } = useTheme();
  const [qrData, setQrData] = useState("");
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
  const [triggerGeneration, setTriggerGeneration] = useState(0);

  const canvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const prevIsUrlRef = useRef(false);

  // Helper: animate canvas class transitions
  const animateCanvas = (canvas, delay = 100) => {
    setTimeout(() => {
      if (canvas) {
        canvas.className = "qr-canvas-display new-generated";
        setTimeout(() => {
          canvas.className = "qr-canvas-display";
        }, 600);
      }
    }, delay);
  };

  // Image collection - tất cả 31 ảnh có sẵn
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
    { content: img17, name: "Meme 17" },
    { content: img18, name: "Meme 18" },
    { content: img19, name: "Meme 19" },
    { content: img20, name: "Meme 20" },
    { content: img21, name: "Meme 21" },
    { content: img22, name: "Meme 22" },
    { content: img23, name: "Meme 23" },
    { content: img24, name: "Meme 24" },
    { content: img25, name: "Meme 25" },
    { content: img26, name: "Meme 26" },
    { content: img27, name: "Meme 27" },
    { content: img28, name: "Meme 28" },
    { content: img29, name: "Meme 29" },
    { content: img30, name: "Meme 30" },
    { content: imgMain, name: "Meme 31" },
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

  // Auto random image when URL is detected (tự động random ảnh khi có URL)
  React.useEffect(() => {
    const text = qrData.trim();
    const nowIsUrl = !!text && isURL(text);

    if (nowIsUrl) {
      // Ẩn gallery và tự động random ảnh khi phát hiện URL
      setShowImageSelector(false);

      // Chỉ random ảnh mới khi lần đầu phát hiện URL
      if (!prevIsUrlRef.current) {
        const randomImage = getRandomImage();
        setSelectedImage(randomImage);
        setTriggerGeneration((prev) => prev + 1);
      }
    } else if (text === "") {
      // Khi xóa hết text, reset về trạng thái ban đầu
      setShowImageSelector(false);
      setSelectedImage(null);
    }

    prevIsUrlRef.current = nowIsUrl;
  }, [qrData]);

  // Debounced QR generation - faster for URLs, slower for other content
  React.useEffect(() => {
    if (!qrData.trim()) {
      setQrCodeUrl("");
      return;
    }

    // Generate faster for URLs, slower for other content
    const delay = isURL(qrData.trim()) ? 200 : 800;

    const timer = setTimeout(() => {
      setTriggerGeneration((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [qrData]);

  // Suggestions for QR code content
  const suggestions = getTranslation(language, "suggestions");

  const generateQRCode = useCallback(async () => {
    if (!qrData.trim()) {
      setQrCodeUrl("");
      return;
    }

    console.log("Generating QR Code with data:", qrData);
    console.log("Selected image:", selectedImage);

    setIsGenerating(true);

    // Add generating animation
    const overlayCanvas = overlayCanvasRef.current;
    if (overlayCanvas) {
      overlayCanvas.className = "qr-canvas-display generating";
    }

    try {
      const canvas = canvasRef.current;

      if (!canvas) {
        console.error("Canvas ref is null");
        return;
      }

      if (!overlayCanvas) {
        console.error("Overlay canvas ref is null");
        return;
      }

      console.log("Canvas and overlay canvas are ready");

      // Generate basic QR code
      await QRCode.toCanvas(canvas, qrData, qrOptions);

      // Create overlay canvas for media
      const overlayCtx = overlayCanvas.getContext("2d");

      // Copy original QR code to overlay canvas
      overlayCanvas.width = canvas.width;
      overlayCanvas.height = canvas.height;
      overlayCtx.drawImage(canvas, 0, 0);

      // Immediately show the base QR (without image) so users see feedback instantly
      try {
        const baseUrl = overlayCanvas.toDataURL();
        setQrCodeUrl(baseUrl);
        animateCanvas(overlayCanvas, 50);
      } catch (e) {
        console.warn("Failed to create base data URL early:", e);
      }

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
          animateCanvas(overlayCanvas, 100);
        };
        img.onerror = (err) => {
          console.error(
            "Failed to load center image:",
            selectedImage?.content,
            err
          );
          try {
            const url = overlayCanvas.toDataURL();
            setQrCodeUrl(url);
            animateCanvas(overlayCanvas, 100);
          } catch (e) {
            console.warn("Fallback toDataURL failed after image error:", e);
          }
        };
        img.src = selectedImage.content;
      } else {
        // No image selected, just set the QR code URL
        const url = overlayCanvas.toDataURL();
        setQrCodeUrl(url);
        // Add success animation
        animateCanvas(overlayCanvas, 100);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert(getTranslation(language, "errorGenerating") + error.message);
    } finally {
      setIsGenerating(false);
    }
  }, [qrData, qrOptions, selectedImage, triggerGeneration]);

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
      alert(getTranslation(language, "qrCopied"));
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      alert(getTranslation(language, "copyFailed"));
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
          <label htmlFor="qr-data">
            {getTranslation(language, "qrContent")}
          </label>
          <textarea
            id="qr-data"
            value={qrData}
            onChange={(e) => setQrData(e.target.value)}
            onBlur={() => {
              // Generate immediately when user finishes typing
              if (qrData.trim()) {
                setTriggerGeneration((prev) => prev + 1);
              }
            }}
            onKeyDown={(e) => {
              // Generate immediately on Enter
              if (e.key === "Enter" && !e.shiftKey && qrData.trim()) {
                e.preventDefault();
                setTriggerGeneration((prev) => prev + 1);
              }
            }}
            placeholder={getTranslation(language, "qrContentPlaceholder")}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="error-correction">
            {getTranslation(language, "errorCorrection")}
          </label>
          <select
            id="error-correction"
            value={qrOptions.errorCorrectionLevel}
            onChange={(e) =>
              updateOption("errorCorrectionLevel", e.target.value)
            }
          >
            <option value="L">
              {getTranslation(language, "errorLevels.L")}
            </option>
            <option value="M">
              {getTranslation(language, "errorLevels.M")}
            </option>
            <option value="Q">
              {getTranslation(language, "errorLevels.Q")}
            </option>
            <option value="H">
              {getTranslation(language, "errorLevels.H")}
            </option>
          </select>
        </div>

        <div className="color-inputs">
          <div className="color-input-group">
            <label htmlFor="color-dark">
              {getTranslation(language, "foregroundColor")}
            </label>
            <div className="color-input-wrapper">
              <input
                type="color"
                className="color-input"
                id="color-dark"
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
            <label htmlFor="color-light">
              {getTranslation(language, "backgroundColor")}
            </label>
            <div className="color-input-wrapper">
              <input
                type="color"
                className="color-input"
                id="color-light"
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
          <label htmlFor="size">
            {getTranslation(language, "size")}: {qrOptions.width}px
          </label>
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
          <label htmlFor="margin">
            {getTranslation(language, "margin")}: {qrOptions.margin}
          </label>
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
          <h3>🖼️ {getTranslation(language, "chooseMemeImage")}</h3>

          {/* Thông báo khi phát hiện URL */}

          <div className="meme-controls">
            <button
              className="meme-toggle-btn"
              onClick={() => setShowImageSelector(!showImageSelector)}
            >
              {showImageSelector
                ? getTranslation(language, "hideImages")
                : getTranslation(language, "showImages")}
            </button>
            <button
              className="random-meme-btn"
              onClick={() => setSelectedImage(getRandomImage())}
              title={getTranslation(language, "random")}
            >
              🎲 {getTranslation(language, "random")}
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
                title={getTranslation(language, "none")}
              >
                <span className="media-emoji">❌</span>
                <span className="media-name">
                  {getTranslation(language, "none")}
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="suggestions-section">
          <h3>
            <Sparkles
              size={18}
              style={{ display: "inline", marginRight: "8px" }}
            />
            {getTranslation(language, "aiSuggestions")}
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
          <div className="qr-canvas-container" style={{ position: "relative" }}>
            <canvas ref={canvasRef} style={{ display: "none" }} />

            {!qrData.trim() && (
              <div
                style={{
                  width: "300px",
                  height: "300px",
                  border: "2px dashed var(--border-color)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-secondary)",
                  fontSize: "0.9rem",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                Nhập nội dung để tạo mã QR
              </div>
            )}

            <canvas
              ref={overlayCanvasRef}
              className="qr-canvas-display"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "12px",
                boxShadow: "0 4px 12px var(--shadow-light)",
                transition: "all 0.2s ease",
                display: qrData.trim() ? "block" : "none",
              }}
            />
            {selectedImage && (
              <div className="meme-indicator">
                <Zap size={16} />
                <span>
                  {getTranslation(language, "enhancedWith")}:{" "}
                  {selectedImage.name}
                </span>
              </div>
            )}
            {isGenerating && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  background: "rgba(255,255,255,0.35)",
                  backdropFilter: "blur(2px)",
                  borderRadius: "12px",
                }}
              >
                <RefreshCw className="animate-spin" size={24} />
                <span>{getTranslation(language, "generating")}</span>
              </div>
            )}
          </div>
        </div>

        <div className="download-buttons">
          <button
            className="btn btn-primary"
            onClick={() => downloadQRCode("png")}
            disabled={!qrCodeUrl}
          >
            <Download size={18} />
            {getTranslation(language, "downloadPng")}
          </button>

          <button
            className="btn btn-secondary"
            onClick={copyToClipboard}
            disabled={!qrCodeUrl}
          >
            <Copy size={18} />
            {getTranslation(language, "copyToClipboard")}
          </button>
        </div>

        <div
          style={{
            marginTop: "20px",
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
            textAlign: "center",
          }}
        >
          <p>✨ {getTranslation(language, "features")}:</p>
          <ul style={{ listStyle: "none", padding: 0, margin: "10px 0" }}>
            {getTranslation(language, "featuresList").map((feature, index) => (
              <li key={index}>• {feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
