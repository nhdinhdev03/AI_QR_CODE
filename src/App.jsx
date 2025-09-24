import { Globe, Moon, Sun, Zap } from "lucide-react";
import QRCodeGenerator from "./components/QRCodeGenerator";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { getTranslation } from "./utils/translations";

function AppContent() {
  const { isDark, language, toggleTheme, toggleLanguage } = useTheme();

  return (
    <div className="App">
      <div className="container">
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

          <div className="header-content">
            <div className="header-icon">
              <Zap size={40} />
            </div>
            <h1>{getTranslation(language, "title")}</h1>
            <p>{getTranslation(language, "subtitle")}</p>
          </div>
        </header>
        <QRCodeGenerator />
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
