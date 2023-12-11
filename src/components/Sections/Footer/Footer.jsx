import React from "react";
import "./static/css/style.css";
import { SmallDot } from "./static/img/svgs.jsx";
import { useNavigate } from "react-router-dom";
import apiConfig from "src/services/apiConfig";

export default function Footer() {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  const downloadFile = ({ fileLink }) => {
    const link = document.createElement("a");
    link.href = fileLink;
    link.download = fileLink;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="footer-container bg-white">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          maxWidth: "1200px",
          width: "100%",
          alignSelf: "center",
          gap: 8,
        }}
      >
        <div className="line"></div>
        <div className="flex-row self-stretch flex-1   space-between items-center text-sm">
          <div className="caption text-gray4">
            {"Copyright © 2023 Keywords AI Inc. All rights reserved."}
          </div>
          {windowSize > 768 && (
            <div className="flex-row items-center gap-xxs text-gray4">
              <span
                className="caption text-gray4"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/privacy-policy")}
              >
                Privacy Policy
              </span>
              <SmallDot />
              <span
                className="caption text-gray4"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/terms-of-use")}
              >
                Terms of Use
              </span>
              <SmallDot />
              <span
                className="caption text-gray4"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/dpa")}
              >
                DPA
              </span>
              <SmallDot />
              <span
                className="caption text-gray4"
                style={{ cursor: "pointer" }}
                onClick={() => window.open("mailto:team@keywordsai.co")}
              >
                Contact Us
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
