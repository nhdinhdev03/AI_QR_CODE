import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Prevent flash of wrong theme by checking saved theme immediately
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") {
        // Set the theme attribute immediately to prevent flash
        document.documentElement.setAttribute("data-theme", saved);
        return saved === "dark";
      }
    } catch (error) {
      console.warn("Error reading theme from localStorage:", error);
    }

    // Default to dark theme
    document.documentElement.setAttribute("data-theme", "dark");
    return true;
  });

  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem("language");
      if (saved === "en" || saved === "vi") {
        return saved;
      }
    } catch (error) {
      console.warn("Error reading language from localStorage:", error);
    }

    // Fallback to browser language
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith("vi") ? "vi" : "en";
  });

  useEffect(() => {
    try {
      const theme = isDark ? "dark" : "light";
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);

      // Add smooth transition class after initial load
      if (!document.documentElement.classList.contains("theme-loaded")) {
        document.documentElement.classList.add("theme-loaded");
      }
    } catch (error) {
      console.warn("Error saving theme to localStorage:", error);
    }
  }, [isDark]);

  useEffect(() => {
    try {
      localStorage.setItem("language", language);
    } catch (error) {
      console.warn("Error saving language to localStorage:", error);
    }
  }, [language]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "vi" : "en"));
  };

  const contextValue = useMemo(
    () => ({
      isDark,
      language,
      toggleTheme,
      toggleLanguage,
      setLanguage,
    }),
    [isDark, language]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
