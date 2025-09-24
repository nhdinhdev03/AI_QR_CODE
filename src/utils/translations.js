// Translation system for multi-language support
export const translations = {
  en: {
    // Header
    title: "QR Code Generator",
    subtitle: "Create beautiful, customizable QR codes with smart suggestions",

    // Controls
    qrContent: "QR Code Content",
    qrContentPlaceholder: "Enter text, URL, or data to encode...",
    errorCorrection: "Error Correction Level",
    errorLevels: {
      L: "Low (~7%)",
      M: "Medium (~15%)",
      Q: "Quartile (~25%)",
      H: "High (~30%)",
    },
    foregroundColor: "Foreground Color",
    backgroundColor: "Background Color",
    size: "Size",
    margin: "Margin",

    // Meme Section
    chooseMemeImage: "Choose Meme Image",
    autoSelected: "Auto-selected",
    forYourUrl: "for your URL!",
    hideImages: "Hide Images",
    showImages: "Show Images",
    random: "Random",
    none: "None",
    urlDetected: "URL detected! Image gallery opened automatically",

    // Suggestions
    aiSuggestions: "Suggestions",
    suggestions: [
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
    ],

    // Actions
    downloadPng: "Download PNG",
    copyToClipboard: "Copy to Clipboard",
    generating: "Generating Awesome QR Code...",
    enhancedWith: "Enhanced with",

    // Features
    features: "Features",
    featuresList: [
      "Customizable colors and sizes",
      "Multiple error correction levels",
      "Smart content suggestions",
      "High-quality PNG export",
      "Copy to clipboard support",
      "Dark mode support",
      "Multi-language interface",
    ],

    // Messages
    qrCopied: "QR code copied to clipboard!",
    copyFailed: "Failed to copy to clipboard",
    errorGenerating: "Error generating QR code: ",
  },

  vi: {
    // Header
    title: "Trình Tạo Mã QR",
    subtitle: "Tạo mã QR đẹp, tùy chỉnh với gợi ý thông minh",

    // Controls
    qrContent: "Nội Dung Mã QR",
    qrContentPlaceholder: "Nhập văn bản, URL hoặc dữ liệu để mã hóa...",
    errorCorrection: "Mức Độ Sửa Lỗi",
    errorLevels: {
      L: "Thấp (~7%)",
      M: "Trung Bình (~15%)",
      Q: "Cao (~25%)",
      H: "Rất Cao (~30%)",
    },
    foregroundColor: "Màu Nền Trước",
    backgroundColor: "Màu Nền Sau",
    size: "Kích Thước",
    margin: "Lề",

    // Meme Section
    chooseMemeImage: "Chọn Hình Ảnh Meme",
    autoSelected: "Tự động chọn",
    forYourUrl: "cho URL của bạn!",
    hideImages: "Ẩn Hình Ảnh",
    showImages: "Hiện Hình Ảnh",
    random: "Ngẫu Nhiên",
    none: "Không",
    urlDetected: "🔗 Phát hiện URL! Gallery hình ảnh đã mở tự động",

    // Suggestions
    aiSuggestions: "Gợi Ý",
    suggestions: [
      "Truy cập website: https://example.com",
      "Liên hệ: tel:+1234567890",
      "Email: mailto:hello@example.com",
      "WiFi: WIFI:T:WPA;S:MyNetwork;P:password;;",
      "Gửi SMS: sms:+1234567890:Xin chào!",
      "Vị trí: geo:37.7749,-122.4194",
      "WhatsApp: https://wa.me/1234567890",
      "LinkedIn: https://linkedin.com/in/username",
      "Instagram: https://instagram.com/username",
      "Twitter: https://twitter.com/username",
    ],

    // Actions
    downloadPng: "Tải PNG",
    copyToClipboard: "Sao Chép",
    generating: "Đang Tạo Mã QR Tuyệt Vời...",
    enhancedWith: "Nâng cao với",

    // Features
    features: "Tính Năng",
    featuresList: [
      "Tùy chỉnh màu sắc và kích thước",
      "Nhiều mức độ sửa lỗi",
      "Gợi ý nội dung thông minh",
      "Xuất PNG chất lượng cao",
      "Hỗ trợ sao chép clipboard",
      "Hỗ trợ chế độ tối",
      "Giao diện đa ngôn ngữ",
    ],

    // Messages
    qrCopied: "Đã sao chép mã QR vào clipboard!",
    copyFailed: "Không thể sao chép vào clipboard",
    errorGenerating: "Lỗi tạo mã QR: ",
  },
};

export const getTranslation = (language, key) => {
  const keys = key.split(".");
  let value = translations[language];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
};
