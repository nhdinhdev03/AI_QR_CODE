/**
 * 🌐 Translation System for Multi-language Support
 * Supports: English (en) and Vietnamese (vi)
 * Complete UI translation for QR Code Generator App
 */
export const translations = {
  en: {
    // 📱 App Header & Branding
    title: "QR Code Generator",
    subtitle: "Create beautiful, customizable QR codes with smart suggestions",

    // 🎛️ Control Panel
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

    // 🖼️ Image & Meme Section
    chooseMemeImage: "Choose Meme Image",
    autoSelected: "Auto-selected",
    forYourUrl: "for your URL!",
    hideImages: "Hide Images",
    showImages: "Show Images",
    random: "Random",
    randomSelected: "Random image selected!",
    none: "None",
    noImageSelected: "No image selected",
    selectAnImage: "Select an image",
    imageCleared: "Image selection cleared",
    urlDetected: "URL detected! Image gallery opened automatically",
    enterContentFirst: "Please enter content first to add images",

    // 💡 Smart Suggestions & AI Help
    aiSuggestions: "Smart Suggestions",
    suggestions: [
      "Visit our website: https://example.com",
      "Contact us: tel:+1234567890",
      "Email us: mailto:hello@example.com",
      "WiFi Access: WIFI:T:WPA;S:MyNetwork;P:password;;",
      "Send SMS: sms:+1234567890:Hello!",
      "Location: geo:37.7749,-122.4194",
      "WhatsApp Chat: https://wa.me/1234567890",
      "LinkedIn Profile: https://linkedin.com/in/username",
      "Instagram: https://instagram.com/username",
      "Twitter: https://twitter.com/username",
      "YouTube Channel: https://youtube.com/@channel",
      "Discord Server: https://discord.gg/invite",
    ],

    // ⚡ Action Buttons & Operations
    generateQR: "Generate QR Code",
    downloadPng: "Download PNG",
    copyToClipboard: "Copy to Clipboard",
    generating: "Generating Awesome QR Code...",
    enhancedWith: "Enhanced with",

    // ✨ App Features & Capabilities
    features: "Key Features",
    featuresList: [
      "🎨 Customizable colors and sizes",
      "🛡️ Multiple error correction levels",
      "🤖 Smart content suggestions",
      "📸 High-quality PNG export",
      "📋 Copy to clipboard support",
      "🌙 Dark mode support",
      "🌐 Multi-language interface",
      "🖼️ Meme image overlays",
      "📱 Mobile-responsive design",
    ],

    // 💬 User Feedback Messages
    qrCopied: "✅ QR code copied to clipboard successfully!",
    copyFailed: "❌ Failed to copy to clipboard. Please try again.",
    errorGenerating: "⚠️ Error generating QR code: ",

    // 🚨 Error Messages & Troubleshooting
    errors: {
      invalidUrl:
        "❌ Invalid URL format. Please enter a valid URL starting with http:// or https://",
      invalidEmail:
        "❌ Invalid email format. Please enter a valid email address like user@example.com",
      invalidPhone:
        "❌ Invalid phone number format. Please enter a valid phone number with proper country code",
      invalidSms: "❌ Invalid SMS format. Use: sms:+1234567890:Your message",
      invalidWifi:
        "❌ Invalid WiFi format. Use: WIFI:T:WPA;S:NetworkName;P:password;;",
      invalidGeo: "❌ Invalid location format. Use: geo:latitude,longitude",
      emptyContent: "⚠️ Please enter content to generate QR code",
      contentTooLong:
        "⚠️ Content is too long for QR code generation (max 2000 characters)",
      unsupportedBrowser:
        "⚠️ Your browser doesn't support this feature. Please try a modern browser.",
      networkError:
        "🌐 Network error. Please check your internet connection and try again.",
      canvasError:
        "🖼️ Canvas rendering error. Please refresh the page and try again.",
      invalidImageUrl: "❌ Invalid URL or not an image",
      imageLoadFailed: "❌ Failed to load image. Check URL.",
      corsError:
        "❌ CORS error loading image. Try image from different source.",
    },

    // ✅ Content Validation Messages
    validation: {
      urlDetected: "🔗 Valid URL detected - Perfect for sharing links!",
      emailDetected: "📧 Valid email detected - Great for contact info!",
      phoneDetected: "📞 Valid phone number detected - Ideal for quick calls!",
      smsDetected: "💬 Valid SMS format detected - Ready for messaging!",
      wifiDetected:
        "📶 Valid WiFi configuration detected - Easy network sharing!",
      geoDetected:
        "📍 Valid location coordinates detected - Perfect for navigation!",
    },

    // 🖼️ Image URL Feature
    imageUrl: {
      title: "Image URL",
      inputTitle: "Enter Image URL",
      placeholder: "Paste image URL from Google, Facebook, Instagram...",
      loadButton: "Load",
      loading: "Loading...",
      successMessage: "✅ Successfully loaded image from URL!",
      supported:
        "Supports images from: Google Images, Facebook, Instagram, Imgur, Unsplash...",
      tooltip: "Enter image URL from Google, Facebook...",
    },
  },

  vi: {
    // 📱 Tiêu Đề & Thương Hiệu Ứng Dụng
    title: "Trình Tạo Mã QR",
    subtitle: "Tạo mã QR đẹp, tùy chỉnh với gợi ý thông minh và hình ảnh meme",

    // 🎛️ Bảng Điều Khiển
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

    // 🖼️ Phần Hình Ảnh & Meme
    chooseMemeImage: "Chọn Hình Ảnh Meme",
    autoSelected: "Tự động chọn",
    forYourUrl: "cho URL của bạn!",
    hideImages: "Ẩn Hình Ảnh",
    showImages: "Hiện Hình Ảnh",
    random: "Ngẫu Nhiên",
    randomSelected: "Đã chọn hình ảnh ngẫu nhiên!",
    none: "Không",
    noImageSelected: "Chưa chọn hình ảnh",
    selectAnImage: "Chọn một hình ảnh",
    imageCleared: "Đã xóa lựa chọn hình ảnh",
    urlDetected: "🔗 Phát hiện URL! Gallery hình ảnh đã mở tự động",
    enterContentFirst: "Vui lòng nhập nội dung trước để thêm hình ảnh",

    // 💡 Gợi Ý Thông Minh & Trợ Giúp AI
    aiSuggestions: "Gợi Ý Thông Minh",
    suggestions: [
      "Truy cập website: https://example.com",
      "Liên hệ: tel:+84987654321",
      "Email: mailto:hello@example.com",
      "Truy cập WiFi: WIFI:T:WPA;S:MyNetwork;P:password;;",
      "Gửi SMS: sms:+84987654321:Xin chào!",
      "Vị trí: geo:21.0285,105.8542",
      "Chat WhatsApp: https://wa.me/84987654321",
      "Hồ sơ LinkedIn: https://linkedin.com/in/hoso",
      "Instagram: https://instagram.com/tentaikhoan",
      "Twitter: https://twitter.com/tentaikhoan",
      "Kênh YouTube: https://youtube.com/@kenh",
      "Server Discord: https://discord.gg/loimoi",
    ],

    // ⚡ Nút Hành Động & Thao Tác
    generateQR: "Tạo Mã QR",
    downloadPng: "Tải PNG",
    copyToClipboard: "Sao Chép",
    generating: "Đang Tạo Mã QR Tuyệt Vời...",
    enhancedWith: "Nâng cao với",

    // ✨ Tính Năng & Khả Năng Ứng Dụng
    features: "Tính Năng Nổi Bật",
    featuresList: [
      "🎨 Tùy chỉnh màu sắc và kích thước",
      "🛡️ Nhiều mức độ sửa lỗi",
      "🤖 Gợi ý nội dung thông minh",
      "📸 Xuất PNG chất lượng cao",
      "📋 Hỗ trợ sao chép clipboard",
      "🌙 Hỗ trợ chế độ tối",
      "🌐 Giao diện đa ngôn ngữ",
      "🖼️ Hình ảnh meme phủ lên",
      "📱 Thiết kế tương thích mobile",
    ],

    // 💬 Thông Báo Phản Hồi Người Dùng
    qrCopied: "✅ Đã sao chép mã QR vào clipboard thành công!",
    copyFailed: "❌ Không thể sao chép vào clipboard. Vui lòng thử lại.",
    errorGenerating: "⚠️ Lỗi tạo mã QR: ",

    // 🚨 Thông Báo Lỗi & Khắc Phục Sự Cố
    errors: {
      invalidUrl:
        "❌ Định dạng URL không hợp lệ. Vui lòng nhập URL hợp lệ bắt đầu bằng http:// hoặc https://",
      invalidEmail:
        "❌ Định dạng email không hợp lệ. Vui lòng nhập địa chỉ email hợp lệ như user@example.com",
      invalidPhone:
        "❌ Định dạng số điện thoại không hợp lệ. Vui lòng nhập số điện thoại hợp lệ với mã quốc gia",
      invalidSms:
        "❌ Định dạng SMS không hợp lệ. Sử dụng: sms:+84987654321:Tin nhắn của bạn",
      invalidWifi:
        "❌ Định dạng WiFi không hợp lệ. Sử dụng: WIFI:T:WPA;S:TênMạng;P:mật khẩu;;",
      invalidGeo:
        "❌ Định dạng vị trí không hợp lệ. Sử dụng: geo:vĩ độ,kinh độ",
      emptyContent: "⚠️ Vui lòng nhập nội dung để tạo mã QR",
      contentTooLong: "⚠️ Nội dung quá dài để tạo mã QR (tối đa 2000 ký tự)",
      unsupportedBrowser:
        "⚠️ Trình duyệt của bạn không hỗ trợ tính năng này. Vui lòng sử dụng trình duyệt hiện đại.",
      networkError:
        "🌐 Lỗi mạng. Vui lòng kiểm tra kết nối internet và thử lại.",
      canvasError: "🖼️ Lỗi hiển thị canvas. Vui lòng tải lại trang và thử lại.",
      invalidImageUrl: "❌ URL không hợp lệ hoặc không phải là ảnh",
      imageLoadFailed: "❌ Không thể tải ảnh. Kiểm tra lại URL.",
      corsError: "❌ Có lỗi CORS khi tải ảnh. Thử ảnh từ nguồn khác.",
    },

    // ✅ Thông Báo Xác Thực Nội Dung
    validation: {
      urlDetected: "🔗 Phát hiện URL hợp lệ - Hoàn hảo để chia sẻ liên kết!",
      emailDetected:
        "📧 Phát hiện email hợp lệ - Tuyệt vời cho thông tin liên hệ!",
      phoneDetected:
        "📞 Phát hiện số điện thoại hợp lệ - Lý tưởng để gọi nhanh!",
      smsDetected: "💬 Phát hiện định dạng SMS hợp lệ - Sẵn sàng để nhắn tin!",
      wifiDetected: "📶 Phát hiện cấu hình WiFi hợp lệ - Dễ dàng chia sẻ mạng!",
      geoDetected:
        "📍 Phát hiện tọa độ vị trí hợp lệ - Hoàn hảo cho điều hướng!",
    },

    // 🖼️ Tính Năng URL Ảnh
    imageUrl: {
      title: "URL Ảnh",
      inputTitle: "Nhập URL Hình Ảnh",
      placeholder: "Dán URL ảnh từ Google, Facebook, Instagram...",
      loadButton: "Tải",
      loading: "Đang tải...",
      successMessage: "✅ Đã tải ảnh từ URL thành công!",
      supported:
        "Hỗ trợ ảnh từ: Google Images, Facebook, Instagram, Imgur, Unsplash...",
      tooltip: "Nhập URL ảnh từ Google, Facebook...",
    },
  },
};

/**
 * 🔧 Enhanced Translation Helper Function
 * @param {string} language - Language code ('en' or 'vi')
 * @param {string} key - Translation key with dot notation (e.g., 'errors.invalidUrl')
 * @returns {string|Array} - Translated text or fallback
 */
export const getTranslation = (language, key) => {
  const keys = key.split(".");
  let value = translations[language];

  // Navigate through nested keys
  for (const k of keys) {
    value = value?.[k];
  }

  // If translation found, return it
  if (value !== undefined && value !== null) {
    return value;
  }

  // Fallback to English if current language doesn't have the key
  if (language !== "en") {
    let fallbackValue = translations.en;
    for (const k of keys) {
      fallbackValue = fallbackValue?.[k];
    }
    if (fallbackValue !== undefined && fallbackValue !== null) {
      console.warn(
        `🌐 Missing translation for "${key}" in "${language}", using English fallback`
      );
      return fallbackValue;
    }
  }

  // Ultimate fallback: return the key itself
  console.warn(
    `🌐 Translation missing for key: "${key}" in language: "${language}"`
  );
  return key;
};

/**
 * 🌍 Get available languages
 * @returns {Array} - Array of available language codes
 */
export const getAvailableLanguages = () => {
  return Object.keys(translations);
};

/**
 * 📊 Get translation statistics
 * @param {string} language - Language code to analyze
 * @returns {Object} - Translation statistics
 */
export const getTranslationStats = (language) => {
  const countKeys = (obj) => {
    let count = 0;
    for (const key in obj) {
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        count += countKeys(obj[key]);
      } else {
        count++;
      }
    }
    return count;
  };

  const langTranslations = translations[language];
  if (!langTranslations) {
    return { language, totalKeys: 0, exists: false };
  }

  return {
    language,
    totalKeys: countKeys(langTranslations),
    exists: true,
    sections: Object.keys(langTranslations).length,
  };
};
