import React from 'react'
import "./static/css/style.css"
import { LanguageSelection, Copy } from 'src/assets/svgs';

/* codeObjs: [{
    language: "python",
    code: "what ever code you want to display"
}] */
export default function CodeBox({ codeObjs }) {
  const [dispIdx, setDispIdx] = React.useState(0);
  const [copyText, setCopyText] = React.useState("Copy code");
  const [showLang, setShowLang] = React.useState(false);
  const handleCopy = (e) => {
    navigator.clipboard.writeText(codeObjs[dispIdx].code)
      .then(() => {
        setCopyText("Copied!");
        setTimeout(() => {
          setCopyText("Copy code");
        }, 2000);
      });
  }
  return (
    <div className="code-box">
      <div className="header">
        <div className="language-choices">
          <div className="flex-col justify-start items-start self-stretch"
            style={{
              position: "relative",
            }}
          >
            <div className="flex-row justify-start items-center gap-xxs self-stretch"
              onClick={() => {
                setShowLang(!showLang);
              }}
            >
              <div className="text-sm text-white">
                {codeObjs?.length > dispIdx - 1 && codeObjs[dispIdx]?.language}
              </div>
              <LanguageSelection />
            </div>
            {showLang &&
              <div className="flex-col flex-1  " 
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  zIndex: 100,
                }}
              >
                {codeObjs?.length > 0 && codeObjs.map((codeObj, index) => (
                  <button className="button-primary" key={index}
                    onClick={() => {
                      setDispIdx(index);
                      setShowLang(false);
                    }}
                    style={{
                      backgroundColor: dispIdx === index ? "var(--gray2)" : "var(--white)",
                      color: "var(--black)",
                    }}
                  >
                    {codeObj.language}
                  </button>
                ))}
              </div>}
          </div>
        </div>
        <div className="flex-row justify-start items-center gap-xxs self-stretch text-white text-sm"
          style={{
            cursor: "pointer",
          }}
          onClick={handleCopy}
        >
          <Copy />
          {copyText}
        </div>
      </div>
      <pre style={{
        padding: "20px",
        margin: 0,
      }}>
        <code className="code-display code"
        >
          {codeObjs?.length > 0 && codeObjs[dispIdx].code}
        </code>
      </pre>
    </div>
  )
}
