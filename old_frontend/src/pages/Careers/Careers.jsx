import React from "react";
import "./static/css/style.css";

import { useNavigate } from "react-router-dom";
import FeatureCard from "./components/FeatureCard/FeatureCard";

// import {
//     Arrow,
//     Text,
//     GlobeSearch,
//     CloudLock,
//     Vault,
//     Lock,
//     Link
// } from "src/assets/svgs"

import apiConfig from "src/services/apiConfig";
import KeywordsBarChart from "src/components/KeywordsBarChart/KeywordsBarChart";
import { Computer, DoubleCircle, Flag } from "../../assets/svgs";

const features = [
  {
    icon: <Computer />,
    title: "Remote & Flexible Work",
    description:
      "We're strong believers in remote and flexible working hours — ensuring you have the freedom to work where and how you perform best.",
  },

  {
    icon: <DoubleCircle />,
    title: "Dynamic Opportunities",
    description:
      "Being part of a fast-growing startup means you're not limited to one role. Here, you can wear multiple hats and discover what you love. ",
  },

  {
    icon: <Flag />,
    title: "Ownership & Impact",
    description:
      "Your work here goes beyond tasks and timelines. You'll take ownership of projects and make decisions that have a real, meaningful impact.",
  },
];

export default function Careers() {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const navigate = useNavigate();
  const [hover, setHover] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setScreenWidth(window.innerWidth);
      });
    };
  }, []);
  return (
    <>
      <div
        className="main-section bg-white"
        // style={{
        //   paddingTop: "calc(80px + 72px)",
        // }}
      >
        <div className="max-width-container">
          <div className="flex-co items-center gap-xxl self-stretch">
            <div className="flex-col items-center gap-sm self-stretch">
              <span className="keywordsai-title display-lg text-black t-l">
                {"Careers at Keywords AI"}
              </span>
              <div className="text-lg text-gray4">
                We’re on the lookout for motivated, curious, and creative
                people. Let’s build something spectacular together.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-section bg-gray2">
        <div className="main-container">
          <div className="flex-row justify-start items-start gap-xxl self-stretch">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className="main-section-bottom bg-white"
        style={{ minHeight: "auto" }}
      >
        <div className="max-width-container">
          <div className="button-container flex-col items-start gap-sm self-stretch">
            <span className="display-sm text-black t-l">{"Open Positions"}</span>
            <div className="flex-col justify-start items-start self-stretch">
              <div
                className="flex-col items-start gap-sm self-stretch"
                style={{
                  borderBottom: "1px solid var(--gray3)",
                  padding: "12px 0px 12px 0px",
                }}
              >
                {" "}
                <button
                  className="button bg-trans text-primary text-md t-medium t-l"
                  style={{
                    padding: "0px 0px 0px 0px",
                  }}
                  onClick={() => {
                    window.open(
                      "https://airtable.com/app6gWem5hVb7CGoe/shr58QijtPdxQ9BHN",
                      "_blank"
                    );
                  }}
                >
                  Founding Engineer (Full-time)
                </button>
              </div>
              <div
                className="flex-col items-start gap-sm self-stretch"
                style={{
                  borderBottom: "1px solid var(--gray3)",
                  padding: "12px 0px 12px 0px",
                }}
              >
                <button
                  className="button bg-trans text-primary text-md t-medium t-l"
                  style={{
                    padding: "0px 0px 0px 0px",
                  }}
                  onClick={() => {
                    window.open(
                      "https://airtable.com/app6gWem5hVb7CGoe/shr1e9YhFhskFCHHy",
                      "_blank"
                    );
                  }}
                >
                  Software Engineer - Frontend (Intern, Part-time)
                </button>
              </div>
              <div
                className="flex-col items-start gap-sm self-stretch"
                style={{
                  borderBottom: "1px solid var(--gray3)",
                  padding: "12px 0px 12px 0px",
                }}
              >
                <button
                  className="button bg-trans text-primary text-md t-medium t-l"
                  style={{
                    padding: "0px 0px 0px 0px",
                  }}
                  onClick={() => {
                    window.open(
                      "https://airtable.com/app6gWem5hVb7CGoe/shr8MQ6kSvLPJOXOr",
                      "_blank"
                    );
                  }}
                >
                  Machine Learning Engineer (Intern, Part-time)
                </button>
              </div>
              <div
                className="flex-col items-start gap-sm self-stretch"
                style={{
                  borderBottom: "1px solid var(--gray3)",
                  padding: "12px 0px 12px 0px",
                }}
              >
                <button
                  className="button bg-trans text-primary text-md t-medium t-l"
                  style={{
                    padding: "0px 0px 0px 0px",
                  }}
                  onClick={() => {
                    window.open(
                      "https://airtable.com/app6gWem5hVb7CGoe/shrfH7UhEq8cOmaZ1",
                      "_blank"
                    );
                  }}
                >
                  Business Development (Intern, Part-time)
                </button>
              </div>
              <div
                className="flex-col items-start gap-sm self-stretch"
                style={{
                  borderBottom: "1px solid var(--gray3)",
                  padding: "12px 0px 12px 0px",
                }}
              >
                <button
                  className="button bg-trans text-primary text-md t-medium t-l"
                  style={{
                    padding: "0px 0px 0px 0px",
                  }}
                  onClick={() => {
                    window.open(
                      "https://airtable.com/app6gWem5hVb7CGoe/shrSDKEKZpi7WO63H",
                      "_blank"
                    );
                  }}
                >
                  General Interest Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
