import React from "react";
import "./style.css";
import { File } from "./icons";

export default function FileCard({
  fileName = "File name",
  fileType = "File type",
}) {
  return (
    <div className="file-card bg-gray-2 border border-solid border-gray-3" style={{ maxWidth: 280 }}>
      <div className="flex-row justify-start items-center gap-xs self-stretch">
        <File />
        <div className="flex-col justify-start items-start self-stretch">
          <div className="text-sm text-gray4">{fileName}</div>
          <div className="caption text-gray3">{fileType}</div>
        </div>
      </div>
    </div>
  );
}
