import React from "react";
import { Arrow } from "../../assets/svgs";
import FooterPage from "../FooterPage/FooterPage";

export const DPA = () => {
  const Data = {
    title: "Data Processing Agreement",
    date: "Updated 10/19/2023",
    content: `
    To use our API services, you're required to accept the Keywords AI Data Processing Agreement (DPA), available via the link below. By agreeing to our Terms of Service, you're also automatically consenting to our DPA, eliminating the need for a separate signature.
    `,
  };

  return (
    <FooterPage
      title={Data.title}
      subtitle={Data.date}
      content={Data.content}
      actions={<button
        className="button-primary"
        onClick={() => window.open("mailto:team@keywordsai.co")}
      >
        Request signed DPA <Arrow />
      </button>}
    />
  );
};
