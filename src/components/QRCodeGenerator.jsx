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
  const [validationMessage, setValidationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  // Function to get contextual image suggestions based on content type
  const getContextualImages = (contentType) => {
    // For now, return all images but we could filter by content type in the future
    // This could be enhanced to show phone-related images for phone numbers, etc.
    switch (contentType) {
      case "phone":
      case "sms":
        // Could return contact/communication related images
        return imageCollection.slice(0, 10); // First 10 images as communication theme
      case "email":
        // Could return email/communication related images
        return imageCollection.slice(5, 15); // Different set for email
      case "url":
        // All images for URL
        return imageCollection;
      default:
        return imageCollection;
    }
  };

  // Helper function to check if text contains meaningful content
  const isMeaningfulContent = (text) => {
    if (!text?.trim()) return false;

    // Check if it's structured data (URL, email, phone, etc.)
    if (
      isURL(text) ||
      isEmail(text) ||
      isPhone(text) ||
      isSMS(text) ||
      isWiFi(text) ||
      isGeo(text)
    ) {
      return true;
    }

    // Check for repeated digit patterns (not meaningful)
    const repeatedDigitPatterns = [
      /^(\d)\1{6,}$/, // 7+ repeated digits like 1111111, 2222222
      /^\d{10,}$/, // Long strings of only digits
    ];

    if (repeatedDigitPatterns.some((pattern) => pattern.test(text))) {
      return false;
    }

    // Check for meaningful text patterns
    const meaningfulPatterns = [
      // Contains spaces (likely sentences)
      /\s+/,
      // Contains common words
      /(the|and|or|but|in|on|at|to|for|of|with|by|from|up|about|into|over|after|www|http|com|org|net|hello|hi|thank|you)/i,
      // Contains Vietnamese words
      /(và|hoặc|nhưng|trong|trên|tại|để|của|với|bởi|từ|lên|về|vào|qua|sau|xin|chào|cảm|ơn|tôi|bạn|là|có|được)/i,
      // Contains numbers with context (like addresses, dates)
      /\d+[\s\-\/]\w+|\w+[\s\-\/]\d+/,
      // Contains punctuation (likely sentences)
      /[.!?,:;]/,
      // Contains common prefixes/suffixes
      /(www\.|https?:\/\/|@|\+\d|#|\$)/i,
    ];

    // If text matches meaningful patterns, it's considered meaningful
    if (meaningfulPatterns.some((pattern) => pattern.test(text))) {
      return true;
    }

    // Check for random character sequences (not meaningful)
    const randomPatterns = [
      // Too many repeated characters
      /(.)\1{4,}/,
      // Random consonant clusters without vowels (more than 4 consonants in a row)
      /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{5,}/,
      // Only keyboard mashing patterns
      /^[qwertyuiopasdfghjklzxcvbnm]+$/i,
    ];

    // If text matches random patterns, it's not meaningful
    if (randomPatterns.some((pattern) => pattern.test(text))) {
      return false;
    }

    // For longer text, check if it has reasonable structure
    if (text.length >= 8) {
      // Check digit variety for number strings
      if (/^\d+$/.test(text)) {
        const uniqueDigits = new Set(text.split("")).size;
        if (uniqueDigits < 3) return false; // Need at least 3 different digits
      }

      // Check character variety for letter strings
      if (/^[a-zA-Z]+$/.test(text)) {
        const vowelCount = (text.match(/[aeiouAEIOU]/g) || []).length;
        const consonantCount = (
          text.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []
        ).length;

        // If extremely unbalanced vowel/consonant ratio, likely random
        if (vowelCount === 0 && consonantCount > 6) {
          return false;
        }
      }
    }

    return true; // Default to meaningful for other cases
  };

  // Validation functions for different content types
  const validateContent = (text) => {
    if (!text?.trim()) {
      setErrorMessage(getTranslation(language, "errors.emptyContent"));
      setValidationMessage("");
      return { isValid: false, type: "empty" };
    }

    if (text.length > 2000) {
      setErrorMessage(getTranslation(language, "errors.contentTooLong"));
      setValidationMessage("");
      return { isValid: false, type: "tooLong" };
    }

    setErrorMessage("");

    // Check different content types
    if (isURL(text)) {
      setValidationMessage(getTranslation(language, "validation.urlDetected"));
      return { isValid: true, type: "url", meaningful: true };
    }

    if (isEmail(text)) {
      setValidationMessage(
        getTranslation(language, "validation.emailDetected")
      );
      return { isValid: true, type: "email", meaningful: true };
    }

    if (isPhone(text)) {
      setValidationMessage(
        getTranslation(language, "validation.phoneDetected")
      );
      return { isValid: true, type: "phone", meaningful: true };
    }

    if (isSMS(text)) {
      setValidationMessage(getTranslation(language, "validation.smsDetected"));
      return { isValid: true, type: "sms", meaningful: true };
    }

    if (isWiFi(text)) {
      setValidationMessage(getTranslation(language, "validation.wifiDetected"));
      return { isValid: true, type: "wifi", meaningful: true };
    }

    if (isGeo(text)) {
      setValidationMessage(getTranslation(language, "validation.geoDetected"));
      return { isValid: true, type: "geo", meaningful: true };
    }

    // Check if content is meaningful
    const meaningful = isMeaningfulContent(text);

    if (!meaningful) {
      // Still valid for QR generation, but suggest better content
      setValidationMessage(
        language === "vi"
          ? "⚠️ Nội dung có vẻ như chữ/số ngẫu nhiên. Hãy thử nhập URL, email, số điện thoại hoặc văn bản có ý nghĩa"
          : "⚠️ Content appears random. Try entering URL, email, phone number, or meaningful text"
      );
      return { isValid: true, type: "text", meaningful: false };
    }

    // Valid and meaningful content
    setValidationMessage("");
    return { isValid: true, type: "text", meaningful: true };
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

  // Function to check if text is an email
  const isEmail = (text) => {
    if (!text) return false;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(text) || text.startsWith("mailto:");
  };

  // Function to check if text is a phone number
  const isPhone = (text) => {
    if (!text) return false;

    // Remove all spaces, dots, dashes for better validation
    const cleanText = text.replace(/[\s.-]/g, "");

    // Check for tel: prefix (always valid if properly formatted)
    if (text.startsWith("tel:")) {
      const phoneNumber = text.substring(4);
      return isValidPhoneNumber(phoneNumber);
    }

    return isValidPhoneNumber(cleanText);
  };

  // Helper function to validate phone number structure
  const isValidPhoneNumber = (phone) => {
    if (!phone || phone.length < 7) return false;

    // Check for repeated digits pattern (invalid phone numbers)
    const repeatedPatterns = [
      /^(\d)\1{6,}$/, // 7+ repeated digits like 1111111, 2222222
      /^(\d)\1{4,}(\d)\2{2,}$/, // Pattern like 11111222, 33333444
      /^(0)\1{8,}$/, // All zeros like 000000000
      /^(1)\1{8,}$/, // All ones like 111111111
      /^(9)\1{8,}$/, // All nines like 999999999
    ];

    if (repeatedPatterns.some((pattern) => pattern.test(phone))) {
      return false;
    }

    // Check for sequential patterns (like 123456789, 987654321)
    const sequentialUp = phone
      .split("")
      .every(
        (digit, i) =>
          i === 0 || parseInt(digit) === (parseInt(phone[i - 1]) + 1) % 10
      );
    const sequentialDown = phone
      .split("")
      .every(
        (digit, i) =>
          i === 0 || parseInt(digit) === (parseInt(phone[i - 1]) - 1 + 10) % 10
      );

    if (phone.length >= 8 && (sequentialUp || sequentialDown)) {
      return false;
    }

    // Enhanced phone patterns for different valid formats
    const phonePatterns = [
      /^(\+?\d{1,4})[\s.-]?\(?\d{3,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,6}$/, // International format
      /^0[3-9]\d{8,9}$/, // Vietnam domestic format (starts with 0, followed by 3-9)
      /^\+\d{10,15}$/, // Simple international with +
      /^\d{10,11}$/, // Simple domestic (but needs variety check)
      /^(\+84|84)[3-9]\d{8}$/, // Vietnam international
      /^(\+1)[2-9]\d{2}[2-9]\d{2}\d{4}$/, // US format
      /^(\+44)[1-9]\d{8,9}$/, // UK format
    ];

    // Additional check for domestic numbers - ensure digit variety
    if (/^\d{10,11}$/.test(phone)) {
      const uniqueDigits = new Set(phone.split("")).size;
      if (uniqueDigits < 3) return false; // Need at least 3 different digits
    }

    return phonePatterns.some((pattern) => pattern.test(phone));
  };

  // Function to check if text is SMS format
  const isSMS = (text) => {
    if (!text) return false;
    const smsPattern = /^sms:[+]?\d+(:.*)?$/;
    return smsPattern.test(text);
  };

  // Function to check if text is WiFi format
  const isWiFi = (text) => {
    if (!text) return false;
    const wifiPattern = /^WIFI:T:[^;]*;S:[^;]*;P:[^;]*;H?:[^;]*;?$/i;
    return wifiPattern.test(text);
  };

  // Function to check if text is geo location
  const isGeo = (text) => {
    if (!text) return false;
    const geoPattern = /^geo:[-+]?\d+\.?\d*,[-+]?\d+\.?\d*$/;
    return geoPattern.test(text);
  };

  // Function to get content examples based on error type
  const getContentExample = (errorMessage) => {
    const examples = {
      en: {
        invalidUrl: "https://example.com",
        invalidEmail: "user@example.com",
        invalidPhone: "+1234567890",
        invalidSms: "sms:+1234567890:Hello!",
        invalidWifi: "WIFI:T:WPA;S:MyNetwork;P:password;;",
        invalidGeo: "geo:37.7749,-122.4194",
      },
      vi: {
        invalidUrl: "https://example.com",
        invalidEmail: "user@example.com",
        invalidPhone: "+84987654321",
        invalidSms: "sms:+84987654321:Xin chào!",
        invalidWifi: "WIFI:T:WPA;S:MyNetwork;P:matkhau;;",
        invalidGeo: "geo:21.0285,105.8542",
      },
    };

    const langExamples = examples[language] || examples.en;

    if (errorMessage.includes("URL")) {
      return ` Ví dụ: ${langExamples.invalidUrl}`;
    } else if (errorMessage.includes("email")) {
      return ` Ví dụ: ${langExamples.invalidEmail}`;
    } else if (
      errorMessage.includes("phone") ||
      errorMessage.includes("số điện thoại")
    ) {
      return ` Ví dụ: ${langExamples.invalidPhone}`;
    } else if (errorMessage.includes("SMS")) {
      return ` Ví dụ: ${langExamples.invalidSms}`;
    } else if (errorMessage.includes("WiFi")) {
      return ` Ví dụ: ${langExamples.invalidWifi}`;
    } else if (
      errorMessage.includes("location") ||
      errorMessage.includes("vị trí")
    ) {
      return ` Ví dụ: ${langExamples.invalidGeo}`;
    }

    return "";
  };

  // Function to get success message based on content type
  const getSuccessMessage = (contentType) => {
    const messages = {
      url:
        language === "vi"
          ? "🔗 URL phát hiện! Gallery hình ảnh đã mở tự động"
          : "🔗 URL detected! Image gallery opened automatically",
      email:
        language === "vi"
          ? "📧 EMAIL phát hiện! Gallery hình ảnh đã mở cho bạn"
          : "📧 EMAIL detected! Image gallery opened for you",
      phone:
        language === "vi"
          ? "📞 SỐ ĐIỆN THOẠI phát hiện! Gallery hình ảnh đã mở để thêm ảnh liên hệ"
          : "📞 PHONE detected! Image gallery opened to add contact image",
      sms:
        language === "vi"
          ? "💬 SMS phát hiện! Gallery hình ảnh đã mở để thêm ảnh tin nhắn"
          : "💬 SMS detected! Image gallery opened to add message image",
      wifi:
        language === "vi"
          ? "📶 WIFI phát hiện! Có thể thêm hình ảnh meme"
          : "📶 WIFI detected! You can add meme images",
      geo:
        language === "vi"
          ? "📍 VỊ TRÍ phát hiện! Có thể thêm hình ảnh bản đồ"
          : "📍 LOCATION detected! You can add map images",
      text:
        language === "vi"
          ? "✅ Nội dung hợp lệ! Có thể thêm hình ảnh meme"
          : "✅ Valid content! You can add meme images",
    };

    return messages[contentType] || messages.text;
  };

  // Helper function to handle URL content
  const handleUrlContent = React.useCallback(() => {
    if (!prevIsUrlRef.current) {
      setShowImageSelector(true);
      const randomImage = getRandomImage();
      setSelectedImage(randomImage);
    }
  }, []);

  // Helper function to handle other valid content types
  const handleOtherValidContent = React.useCallback(
    (validation, text) => {
      // Only auto-open gallery for meaningful content
      if (validation.meaningful === false) {
        return; // Don't auto-open gallery for non-meaningful content
      }

      const shouldAutoOpenGallery = ["phone", "sms", "email"].includes(
        validation.type
      );

      if (shouldAutoOpenGallery && !showImageSelector) {
        setShowImageSelector(true);
        console.log(`Auto-opened gallery for ${validation.type}: ${text}`);

        if (!selectedImage) {
          setTimeout(() => {
            const contextualImages = getContextualImages(validation.type);
            const suggestedImage =
              contextualImages[
                Math.floor(Math.random() * contextualImages.length)
              ];
            setSelectedImage(suggestedImage);
            console.log(
              `Auto-suggested image for ${validation.type}: ${suggestedImage.name}`
            );
          }, 500);
        }
      }
    },
    [showImageSelector, selectedImage]
  );

  // Helper function to reset states
  const resetStates = React.useCallback(() => {
    setErrorMessage("");
    setValidationMessage("");
    setSuccessMessage("");
    setShowImageSelector(false);
    setSelectedImage(null);
    setQrCodeUrl(""); // Reset QR code URL to show placeholder
    prevIsUrlRef.current = false;
  }, []);

  // Auto validation and image selection when content changes
  React.useEffect(() => {
    const text = qrData.trim();

    if (text) {
      const validation = validateContent(text);
      const nowIsUrl = validation.type === "url";
      const isValidContent = validation.isValid && validation.type !== "empty";

      // Set success message for valid content
      setSuccessMessage(
        isValidContent ? getSuccessMessage(validation.type) : ""
      );

      if (nowIsUrl) {
        handleUrlContent();
      } else if (isValidContent) {
        handleOtherValidContent(validation, text);
      }

      prevIsUrlRef.current = nowIsUrl;
    } else {
      resetStates();
    }
  }, [qrData, handleUrlContent, handleOtherValidContent, resetStates]);

  // Removed auto-generation - now only manual generation

  // Suggestions for QR code content
  const suggestions = getTranslation(language, "suggestions");

  const generateQRCode = useCallback(async () => {
    if (!qrData.trim()) {
      setQrCodeUrl("");
      return;
    }

    // Validate content before generating
    const validation = validateContent(qrData);
    if (!validation.isValid) {
      return; // Error message already set by validateContent
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

        // Load and draw image
        const img = new Image();
        img.onload = () => {
          overlayCtx.save();

          // Create circular clipping path for image
          overlayCtx.beginPath();
          overlayCtx.arc(centerX, centerY, imageSize * 0.8, 0, 2 * Math.PI);
          overlayCtx.clip();

          // Calculate image dimensions to fit in circle (không có shadow và background)
          const imgSize = imageSize * 1.6;
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

      // Show specific error messages based on error type
      let errorMessage;
      if (error.message.includes("canvas")) {
        errorMessage = getTranslation(language, "errors.canvasError");
      } else if (
        error.message.includes("network") ||
        error.message.includes("fetch")
      ) {
        errorMessage = getTranslation(language, "errors.networkError");
      } else if (
        error.message.includes("too large") ||
        error.message.includes("too long")
      ) {
        errorMessage = getTranslation(language, "errors.contentTooLong");
      } else {
        errorMessage =
          getTranslation(language, "errorGenerating") + error.message;
      }

      setErrorMessage(errorMessage);
      alert(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  }, [qrData, qrOptions, selectedImage]);

  // Removed auto-generation useEffect - now manual only

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
      // Check if clipboard API is supported
      if (!navigator.clipboard) {
        throw new Error(getTranslation(language, "errors.unsupportedBrowser"));
      }

      const response = await fetch(qrCodeUrl);
      if (!response.ok) {
        throw new Error(getTranslation(language, "errors.networkError"));
      }

      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      alert(getTranslation(language, "qrCopied"));
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);

      let errorMessage;
      if (
        error.message.includes("unsupported") ||
        error.message.includes("not supported")
      ) {
        errorMessage = getTranslation(language, "errors.unsupportedBrowser");
      } else if (
        error.message.includes("network") ||
        error.message.includes("fetch")
      ) {
        errorMessage = getTranslation(language, "errors.networkError");
      } else {
        errorMessage = getTranslation(language, "copyFailed");
      }

      alert(errorMessage);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQrData(suggestion);
  };

  const getPlaceholderText = () => {
    if (!qrData.trim()) {
      return language === "vi"
        ? "Nhập nội dung vào ô trên và bấm 'Tạo Mã QR'"
        : "Enter content above and click 'Generate QR Code'";
    }

    if (qrCodeUrl) {
      return language === "vi"
        ? "Bấm 'Tạo Mã QR' để tạo lại mã mới"
        : "Click 'Generate QR Code' to recreate code";
    }

    return language === "vi"
      ? "Bấm 'Tạo Mã QR' để tạo mã"
      : "Click 'Generate QR Code' to create code";
  };

  const handleGenerateQR = () => {
    if (!qrData.trim()) {
      setErrorMessage(getTranslation(language, "errors.emptyContent"));
      return;
    }

    // Validate before generating
    const validation = validateContent(qrData);
    if (!validation.isValid) {
      return; // Error message already set by validateContent
    }

    // Clear any previous QR code and generate new one
    setQrCodeUrl("");
    generateQRCode();
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
            onChange={(e) => {
              const newValue = e.target.value;
              setQrData(newValue);

              // Tự động reset QR code khi xóa hết nội dung
              if (!newValue.trim()) {
                setQrCodeUrl("");
              }
            }}
            placeholder={getTranslation(language, "qrContentPlaceholder")}
            rows={3}
          />

          {/* Action Buttons */}
          <div
            className="action-buttons"
            style={{
              marginTop: "12px",
              display: "flex",
              gap: "8px",
            }}
          >
            <button
              className="btn btn-primary"
              onClick={handleGenerateQR}
              disabled={!qrData.trim() || isGenerating}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                minHeight: "44px",
              }}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  {getTranslation(language, "generating")}
                </>
              ) : (
                <>
                  <Zap size={18} />
                  {getTranslation(language, "generateQR")}
                </>
              )}
            </button>

            {(qrData.trim() || qrCodeUrl) && (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  // Smooth reset with animation
                  const overlayCanvas = overlayCanvasRef.current;
                  if (overlayCanvas) {
                    overlayCanvas.style.opacity = "0";
                    setTimeout(() => {
                      setQrData("");
                      resetStates();
                      if (overlayCanvas) {
                        overlayCanvas.style.opacity = "1";
                      }
                    }, 200);
                  } else {
                    setQrData("");
                    resetStates();
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  minHeight: "44px",
                  minWidth: "80px",
                }}
                title={language === "vi" ? "Xóa tất cả" : "Clear all"}
              >
                ❌ {language === "vi" ? "Xóa" : "Clear"}
              </button>
            )}
          </div>

          {/* Validation and Error Messages */}
          {validationMessage && (
            <div className="validation-message success">
              {validationMessage}
            </div>
          )}
          {errorMessage && (
            <div className="validation-message error">
              {errorMessage}
              {getContentExample(errorMessage)}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="validation-message success">{successMessage}</div>
          )}
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

        {/* Image Selector Section - cho tất cả loại nội dung hợp lệ */}
        <div className={`meme-section ${!qrData.trim() ? "disabled" : ""}`}>
          <h3>🖼️ {getTranslation(language, "chooseMemeImage")}</h3>

          {/* Thông báo dựa trên trạng thái nội dung */}
          {!qrData.trim() && (
            <div
              style={{
                background: "var(--warning-color)",
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
              ⚠️ {getTranslation(language, "enterContentFirst")}
            </div>
          )}

          {successMessage && (
            <div
              style={{
                background: "var(--success-color)",
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
              {successMessage}
            </div>
          )}

          <div className="meme-controls">
            <button
              className="meme-toggle-btn"
              onClick={() => setShowImageSelector(!showImageSelector)}
              disabled={!qrData.trim()}
              style={{
                opacity: !qrData.trim() ? 0.5 : 1,
                cursor: !qrData.trim() ? "not-allowed" : "pointer",
              }}
            >
              {showImageSelector
                ? getTranslation(language, "hideImages")
                : getTranslation(language, "showImages")}
            </button>
            <button
              className="random-meme-btn"
              onClick={() => setSelectedImage(getRandomImage())}
              title={getTranslation(language, "random")}
              disabled={!qrData.trim()}
              style={{
                opacity: !qrData.trim() ? 0.5 : 1,
                cursor: !qrData.trim() ? "not-allowed" : "pointer",
              }}
            >
              🎲 {getTranslation(language, "random")}
            </button>
          </div>

          {showImageSelector && qrData.trim() && (
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

            {!qrCodeUrl && (
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
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Zap size={32} style={{ opacity: 0.5 }} />
                <span>{getPlaceholderText()}</span>
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
                display: qrCodeUrl ? "block" : "none",
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
