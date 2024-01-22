import Markdown from "marked-react";
import { useRef, useState } from "react";

const helpText = `
Heading
=======

Sub-heading
-----------

### Another deeper heading

Paragraphs are separated
by a blank line.

Leave 2 spaces at the end of a line to do a
line break

Text attributes *italic*, **bold**,
\`monospace\`, ~~strikethrough~~ .

Shopping list:

  * apples
  * oranges
  * pears

Numbered list:

  1. apples
  2. oranges
  3. pears

The rain---not the reign---in
Spain.

 *[Herman Fassett](https://freecodecamp.com/hermanfassett)*
`;

function App() {
  const [text, setText] = useState("");
  const [isHelp, setIsHelp] = useState(false);
  const fileInputRef = useRef(null);

  const handleHelpClick = () => {
    setIsHelp(!isHelp);
  };

  const handleDownload = () => {
    if (!text) return false;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "markdown.md";
    link.click();
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        setText(fileContent);
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <div className="container">
      <h1>Markdown Previewer</h1>
      <div className="pages">
        <div className="page-left">
          <textarea
            disabled={isHelp}
            onChange={(e) => setText(e.target.value)}
            value={!isHelp ? text : helpText}
          />
        </div>
        <div className="page-right">
          <Markdown>{!isHelp ? text : helpText}</Markdown>
        </div>
      </div>
      <div className="help-button">
        <button onClick={handleHelpClick}>?</button>
      </div>
      <div>
        <button onClick={handleDownload} className="download-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </button>
      </div>

      <div>
        <button className="update-button" onClick={handleButtonClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
            />
          </svg>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

export default App;
