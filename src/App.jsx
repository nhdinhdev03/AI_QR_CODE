import QRCodeGenerator from "./components/QRCodeGenerator";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>AI QR Code Generator</h1>
          <p>
            Create beautiful, customizable QR codes with AI-powered suggestions
          </p>
        </header>
        <QRCodeGenerator />
      </div>
    </div>
  );
}

export default App;
