import { Globe, Moon, Sun, Zap } from "lucide-react";
import QRCodeGenerator from "./components/QRCodeGenerator";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { getTranslation } from "./utils/translations";

function AppContent() {
  const { isDark, language, toggleTheme, toggleLanguage } = useTheme();
  const heroBadge = language === "vi" ? "Phiên bản 2025" : "2025 Edition";
  const heroTagline =
    language === "vi"
      ? "Trải nghiệm chuẩn doanh nghiệp với bộ công cụ mã QR hiện đại."
      : "Enterprise-grade polish with a modern QR creation suite.";
  const heroEyebrow =
    language === "vi" ? "Nền tảng QR thông minh" : "Intelligent QR platform";

  return (
    <div className={`App ${isDark ? "App--dark" : ""}`}>
      <div className="app-shell__decor" aria-hidden="true">
        <span className="app-shell__orb app-shell__orb--primary" />
        <span className="app-shell__orb app-shell__orb--secondary" />
        <span className="app-shell__grid" />
      </div>

      <div className="container app-shell__content">
        <header className="header">
          <div className="header-controls">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="language-toggle"
              onClick={toggleLanguage}
              title="Switch Language"
            >
              <Globe size={20} />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>

          <div className="hero-card">
            <div className="hero-card__meta">
              <span className="hero-card__badge">{heroBadge}</span>
              <span className="hero-card__tagline">{heroTagline}</span>
            </div>

            <div className="header-content hero-card__content">
              <div className="header-icon hero-card__icon">
                <Zap size={40} />
              </div>
              <div className="hero-card__text">
                <p className="hero-card__eyebrow">{heroEyebrow}</p>
                <h1>{getTranslation(language, "title")}</h1>
                <p>{getTranslation(language, "subtitle")}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="workspace">
          <QRCodeGenerator />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
