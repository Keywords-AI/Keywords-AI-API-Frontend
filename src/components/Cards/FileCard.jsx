import React from "react";
import { File } from "src/components/Icons";

export default function FileCard({
  fileName = "File name",
  fileType = "File type",
}) {
  return (
    <div className="bg-gray-2 border border-solid border-gray-3 w-[280px] px-xs py-xxs rounded-sm">
      <div className="flex-row justify-start items-center gap-xs w-full">
        <File />
        <div className="flex-col justify-start items-start flex-grow">
          <div className="text-sm text-gray-4 truncate w-3/5">{fileName + "abvbiidofjioasdjif"}</div>
          <div className="caption text-gray-3">{fileType}</div>
        </div>
      </div>
    </div>
  );
}
