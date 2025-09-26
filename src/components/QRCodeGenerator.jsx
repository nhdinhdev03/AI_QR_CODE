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

    // Check for meaningful text patterns FIRST
    const meaningfulPatterns = [
      // Contains spaces (likely sentences)
      /\s+/,
      // Contains common English words
      /\b(the|and|or|but|in|on|at|to|for|of|with|by|from|up|about|into|over|after|www|http|com|org|net|hello|hi|thank|you|this|that|what|when|where|why|how|yes|no)\b/i,
      // Contains Vietnamese words
      /\b(và|hoặc|nhưng|trong|trên|tại|để|của|với|bởi|từ|lên|về|vào|qua|sau|xin|chào|cảm|ơn|tôi|bạn|là|có|được|một|hai|ba|bốn|năm|sáu|bảy|tám|chín|mười)\b/i,
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

    // Enhanced check for random character sequences (not meaningful)
    const randomPatterns = [
      // Too many repeated characters (3+ same chars in a row)
      /(.)\1{2,}/,
      // Random consonant clusters without vowels (4+ consonants in a row)
      /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{4,}/i,
      // Keyboard mashing patterns
      /^[qwertyuiop]+$|^[asdfghjkl]+$|^[zxcvbnm]+$/i,
      // Vietnamese keyboard mashing with diacritics
      /^[áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]+$/i,
      // Mixed random patterns
      /^[a-zA-Záàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]{1,}[a-zA-Záàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]*$/,
    ];

    // For short text (less than 4 chars), be more lenient but still check patterns
    if (text.length < 4) {
      return !randomPatterns.slice(0, 2).some((pattern) => pattern.test(text));
    }

    // For medium text (4-7 chars), check for patterns and character variety
    if (text.length >= 4 && text.length < 8) {
      // If matches obvious random patterns, not meaningful
      if (randomPatterns.some((pattern) => pattern.test(text))) {
        return false;
      }

      // Check character variety - need at least 2 unique characters for short text
      const uniqueChars = new Set(text.toLowerCase().split("")).size;
      if (uniqueChars < 2) return false;

      // Check vowel/consonant balance for letter-only strings
      if (
        /^[a-zA-Záàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]+$/i.test(
          text
        )
      ) {
        const vowelCount = (
          text.match(
            /[aeiouáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]/i
          ) || []
        ).length;
        const totalChars = text.length;

        // If no vowels or too few vowels (less than 25% for short strings), likely not meaningful
        if (vowelCount === 0 || vowelCount / totalChars < 0.15) {
          return false;
        }
      }

      return true; // Short text that passed basic checks
    }

    // For longer text (8+ chars), be more strict
    if (text.length >= 8) {
      // If matches random patterns, not meaningful
      if (randomPatterns.some((pattern) => pattern.test(text))) {
        return false;
      }

      // Check digit variety for number strings
      if (/^\d+$/.test(text)) {
        const uniqueDigits = new Set(text.split("")).size;
        if (uniqueDigits < 3) return false; // Need at least 3 different digits
      }

      // Check character variety for letter strings
      if (
        /^[a-zA-Záàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]+$/i.test(
          text
        )
      ) {
        const uniqueChars = new Set(text.toLowerCase().split("")).size;
        const vowelCount = (
          text.match(
            /[aeiouáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]/i
          ) || []
        ).length;
        const totalChars = text.length;

        // Need reasonable character variety (at least 3 unique chars for 8+ char strings)
        if (uniqueChars < 3) return false;

        // Need some vowels (at least 15% vowels)
        if (vowelCount === 0 || vowelCount / totalChars < 0.15) {
          return false;
        }
      }
    }

    // If none of the meaningful patterns match and it's not obviously random,
    // default to NOT meaningful for safety
    return false;
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
          ? "⚠️ Nội dung không có ý nghĩa. Vui lòng nhập URL, email, số điện thoại hoặc văn bản thực tế"
          : "⚠️ Content appears meaningless. Please enter URL, email, phone number, or real text"
      );
      return { isValid: true, type: "text", meaningful: false };
    }

    // Valid and meaningful content
    setValidationMessage("");
    return { isValid: true, type: "text", meaningful: true };
  };

  // Function to check if text is a URL
  const isURL = (text) => {
    if (!text) return false;

    try {
      const url = new URL(text);
      // Valid URL object created, do additional checks
      return isValidURL(url);
    } catch {
      // Not a valid URL format, check for common URL patterns
      const lowerText = text.toLowerCase().trim();

      // Must have at least a domain pattern
      if (!/\w+\.\w{2,}/.test(text)) return false;

      return (
        lowerText.startsWith("http://") ||
        lowerText.startsWith("https://") ||
        lowerText.startsWith("www.") ||
        /\w+\.(com|org|net|edu|gov|io|co|vn|uk|de|fr|jp|cn|in|br|au|ca|us)(\/.*)?\b/i.test(
          text
        )
      );
    }
  };

  // Helper function to validate URL structure
  const isValidURL = (url) => {
    // Check for valid protocols
    const validProtocols = ["http:", "https:", "ftp:", "ftps:"];
    if (!validProtocols.includes(url.protocol)) return false;

    // Check for valid hostname
    if (!url.hostname || url.hostname.length < 3) return false;
    if (url.hostname === "localhost" && !url.port) return false;

    // Check for realistic domain patterns
    if (!/^[a-zA-Z0-9.-]+$/.test(url.hostname)) return false;
    if (url.hostname.startsWith(".") || url.hostname.endsWith("."))
      return false;
    if (url.hostname.includes("..")) return false;

    return true;
  };

  // Function to check if text is an email
  const isEmail = (text) => {
    if (!text) return false;

    // Handle mailto: prefix
    if (text.startsWith("mailto:")) {
      const emailPart = text.substring(7);
      return isValidEmail(emailPart);
    }

    return isValidEmail(text);
  };

  // Helper function to validate email structure
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) return false;

    const [localPart, domain] = email.split("@");

    // Check for invalid patterns in local part
    if (localPart.length < 1 || localPart.length > 64) return false;
    if (localPart.startsWith(".") || localPart.endsWith(".")) return false;
    if (localPart.includes("..")) return false;

    // Check for invalid patterns in domain
    if (domain.length < 3 || domain.length > 255) return false;
    if (domain.startsWith("-") || domain.endsWith("-")) return false;
    if (domain.startsWith(".") || domain.endsWith(".")) return false;

    // Check for realistic domain extensions
    const domainParts = domain.split(".");
    const tld = domainParts[domainParts.length - 1].toLowerCase();
    const validTlds = [
      "com",
      "org",
      "net",
      "edu",
      "gov",
      "mil",
      "int",
      "co",
      "io",
      "me",
      "tv",
      "cc",
      "info",
      "biz",
      "name",
      "asia",
      "vn",
      "uk",
      "de",
      "fr",
      "jp",
      "cn",
      "in",
      "br",
      "au",
      "ca",
      "us",
    ];

    if (!validTlds.includes(tld) && tld.length < 2) return false;

    // Check for repetitive patterns that might be fake
    const emailLower = email.toLowerCase();
    if (/(.{2,})\1{2,}/.test(emailLower)) return false; // Repeated patterns
    if (/^[a-z]\1{4,}@/.test(emailLower)) return false; // Repeated letters in local part

    return true;
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

  // Helper function to validate phone number structure with strict rules
  const isValidPhoneNumber = (phone) => {
    if (!phone || phone.length < 7) return false;

    // Check for obviously invalid patterns first
    const invalidPatterns = [
      /^(\d)\1{6,}$/, // 7+ repeated digits like 1111111, 2222222
      /^(\d)\1{4,}(\d)\2{2,}$/, // Pattern like 11111222, 33333444
      /^0{2,}|\d*0{4,}/, // Multiple zeros (starting with 00 or 4+ zeros anywhere)
      /^1{7,}|\d*1{5,}/, // Too many 1s (7+ at start or 5+ anywhere)
      /^(\d{2,3})\1{2,}$/, // Repeated patterns like 123123123, 12121212
      /^(\d)\1(\d)\2(\d)\3+$/, // Alternating patterns like 121212, 131313
      /^(\d)\1{2,}/, // 3+ same digits at start
      /(\d)\1{3,}/, // 4+ same digits anywhere
    ];

    if (invalidPatterns.some((pattern) => pattern.test(phone))) {
      return false;
    }

    // Check for sequential patterns (like 123456789, 987654321)
    if (phone.length >= 7) {
      const isSequentialUp = phone
        .split("")
        .every(
          (digit, i) =>
            i === 0 || parseInt(digit) === (parseInt(phone[i - 1]) + 1) % 10
        );
      const isSequentialDown = phone
        .split("")
        .every(
          (digit, i) =>
            i === 0 ||
            parseInt(digit) === (parseInt(phone[i - 1]) - 1 + 10) % 10
        );

      if (isSequentialUp || isSequentialDown) {
        return false;
      }
    }

    // Specific phone format validation with strict country-based rules
    let isValidFormat = false;

    // Vietnam phone number validation (very specific)
    if (/^(\+84|84|0)/.test(phone)) {
      const cleanPhone = phone.replace(/^(\+84|84)/, "0");

      // Vietnam mobile prefixes (updated 2024)
      const vietnamMobilePrefixes = [
        "032",
        "033",
        "034",
        "035",
        "036",
        "037",
        "038",
        "039", // Viettel
        "056",
        "058",
        "059", // Vietnamobile
        "070",
        "076",
        "077",
        "078",
        "079", // Mobifone
        "081",
        "082",
        "083",
        "084",
        "085",
        "086",
        "088",
        "089", // Vinaphone
        "090",
        "091",
        "092",
        "093",
        "094",
        "096",
        "097",
        "098",
        "099", // Mobifone, Viettel, Vinaphone
      ];

      // Vietnam landline prefixes
      const vietnamLandlinePrefixes = [
        "024",
        "028",
        "020",
        "023",
        "025",
        "026",
        "027",
        "029",
      ];

      const prefix = cleanPhone.substring(0, 3);

      if (vietnamMobilePrefixes.includes(prefix) && cleanPhone.length === 10) {
        isValidFormat = true;
      } else if (
        vietnamLandlinePrefixes.includes(prefix) &&
        cleanPhone.length === 10
      ) {
        isValidFormat = true;
      }
    }
    // US phone number validation
    else if (/^(\+1|1)?/.test(phone)) {
      const cleanPhone = phone.replace(/^(\+1|1)/, "");
      // US format: Area code (2-9) + Exchange (2-9) + Number (4 digits)
      if (/^[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(cleanPhone)) {
        isValidFormat = true;
      }
    }
    // UK phone number validation
    else if (/^(\+44|44|0)/.test(phone)) {
      const cleanPhone = phone.replace(/^(\+44|44)/, "0");
      if (/^0[1-9]\d{8,9}$/.test(cleanPhone)) {
        isValidFormat = true;
      }
    }
    // Other international numbers (with country code)
    else if (/^\+/.test(phone)) {
      // Must have country code (1-3 digits) + national number (6-15 digits)
      if (/^\+\d{1,3}[1-9]\d{6,14}$/.test(phone)) {
        isValidFormat = true;
      }
    }
    // Reject numbers without clear country context if they're just digits
    else if (/^\d+$/.test(phone)) {
      // Only accept if it looks like a valid national number format
      // Most countries: 7-15 digits, not starting with 0
      if (/^[1-9]\d{6,14}$/.test(phone)) {
        isValidFormat = true;
      }
    }

    if (!isValidFormat) {
      return false;
    }

    // Additional validation for digit variety and realistic distribution
    const digits = phone.replace(/^\+\d{1,3}/, "").replace(/^0/, ""); // Remove country code and leading zero
    if (digits.length >= 7) {
      const uniqueDigits = new Set(digits.split("")).size;

      // Must have at least 3 different digits for phone numbers
      if (uniqueDigits < 3) return false;

      // Check digit distribution - no digit should appear more than 50% of the time
      const digitCounts = {};
      for (const digit of digits) {
        digitCounts[digit] = (digitCounts[digit] || 0) + 1;
      }
      const maxCount = Math.max(...Object.values(digitCounts));
      if (maxCount / digits.length > 0.5) return false;

      // Check for too many consecutive same digits (max 2 in a row)
      for (let i = 0; i < digits.length - 2; i++) {
        if (digits[i] === digits[i + 1] && digits[i + 1] === digits[i + 2]) {
          return false; // No 3+ consecutive same digits
        }
      }
    }

    return true;
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

  // Function to get success message based on content type and meaningfulness
  const getSuccessMessage = (contentType, meaningful = true) => {
    // Don't show success message for non-meaningful content
    if (meaningful === false) {
      return "";
    }

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
          ? "✅ Nội dung có ý nghĩa! Có thể thêm hình ảnh meme"
          : "✅ Meaningful content! You can add meme images",
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

      // Set success message only for meaningful content
      setSuccessMessage(
        isValidContent && validation.meaningful !== false
          ? getSuccessMessage(validation.type, validation.meaningful)
          : ""
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

    // Auto-select random image if none selected and content is valid
    let imageToUse = selectedImage;
    if (!selectedImage && validation.isValid) {
      const randomImage = getRandomImage();
      setSelectedImage(randomImage);
      imageToUse = randomImage;
      console.log(
        "Auto-selected random image for QR generation:",
        randomImage?.name
      );

      // Auto-open image selector to show the selected image
      if (!showImageSelector) {
        setShowImageSelector(true);
      }

      // Show brief message about auto-selection
      setSuccessMessage(
        language === "vi"
          ? `🎲 Tự động chọn ảnh: ${randomImage?.name}`
          : `🎲 Auto-selected image: ${randomImage?.name}`
      );
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    }

    console.log("Generating QR Code with data:", qrData);
    console.log("Selected image:", imageToUse);

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
      if (imageToUse) {
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
            imageToUse?.content,
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
        img.src = imageToUse.content;
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
  }, [
    qrData,
    qrOptions,
    selectedImage,
    getRandomImage,
    language,
    showImageSelector,
  ]);

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
