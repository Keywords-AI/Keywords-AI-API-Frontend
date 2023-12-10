import React from "react";
import { useNavigate } from "react-router-dom";
import "./static/css/style.css";
import PlatformCard from "../../components/PlatformCard/PlatformCard";
import { Document, LargeMsgDraw, Playground, APIKeys } from "src/assets/svgs";
import LargeTextTitle from "src/components/Titles/LargeTextTitle/LargeTextTitle";

const cards = [
  {
    icon: <Document />,
    themeColor: "var(--green-light)",
    darkTheme: "var(--green-dark)",
    title: "Documentation",
    text: "Read our quick start documentation for effortless API integration.",
    link: "/platform/documentation",
    loginRequired: false,
  },
  {
    icon: <LargeMsgDraw />,
    themeColor: "var(--purple-light)",
    darkTheme: "var(--purple-dark)",
    title: "Examples",
    text: "Explore the scope of our API's versatility through various example tasks.",
    link: "/platform/examples",
    loginRequired: true,
  },
  {
    icon: <Playground />,
    themeColor: "var(--teal-light)",
    darkTheme: "var(--teal-dark)",
    title: "Playground",
    text: "Play around, test, and validate API calls with our chatbot and playground.",
    link: "/platform/playground",
    loginRequired: true,
  },
  {
    icon: <APIKeys />,
    themeColor: "var(--primary100)",
    darkTheme: "var(--primary)",
    title: "API Keys",
    text: "Manage API keys, monitor usage, and access billing information.",
    link: "/platform/organization/api-keys",
    loginRequired: true,
  },
];

export default function Overview() {
  const navigate = useNavigate();
  return (
    <div className="bg-white items-start main-section flex-1  " >
      <div className="max-width-container items-start">
        <LargeTextTitle
          title="Platform Overview"
          text="Learn how to get started, explore examples, experiment, and manage API keys."
        />
        <div className="flex-row gap-md self-stretch">
          {cards.map((card, index) => (
            <PlatformCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}
