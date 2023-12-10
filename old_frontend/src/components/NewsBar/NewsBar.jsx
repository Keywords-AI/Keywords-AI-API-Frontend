import React from "react";
import "./static/css/style.css";

export default function NewsBar({ message = "", link = "" }) {
  return (
    <div className="news-bar bg-gray2">
      <div className="text-sm text-black">
        {message}
        <a
          className="text-sm text-primary"
          href={link}
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          Read Launch &gt;
        </a>
      </div>
    </div>
  );
}
