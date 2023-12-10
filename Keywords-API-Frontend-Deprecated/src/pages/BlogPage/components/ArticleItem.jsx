import React from "react";

export const ArticleItem = ({ title, link, time }) => {
  return (
    <div className="flex-col items-start gap-lg" style={{ width: "360px" }}>
      <div
        className="bg-gray4"
        style={{ width: "100%", height: "240px" }}
      ></div>
      <p className="self-stretch display-sm text-black flex-row m-0">{title}</p>
      <div className="flex-row space-between self-stretch">
        <button className="button-tertiary-primary">Career</button>
        <p className="text-sm text-black ">{time}</p>
      </div>
    </div>
  );
};
