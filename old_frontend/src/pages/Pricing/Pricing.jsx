import React from "react";
import PricingCard from "./components/PricingCard/PricingCard";
import { Arrow, Tick } from "src/assets/svgs";
import "./style.css";
import { createPaymentSession, cancelSubscription } from "src/services/stripe";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import CompareTable from "src/components/CompareTable/CompareTable";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {};

const plans = [
  { name: "Flex 8k", key: "f8k" },
  { name: "Flex 32k", key: "f32k" },
  { name: "Custom", key: "custom" },
];

const features = [
  {
    title: "Free trial tokens",
    f8K: "40k",
    f32K: "40k",
    custom: "-",
  },
  {
    title: "Context window",
    f8K: "8k",
    f32K: "32k",
    custom: "Up tp 32k",
  },
  {
    title: "input tokens",
    f8K: (
      <div className="flex-row">
        {"$0.02"}
        <span className="text-gray4">&nbsp;{"/ 1k tokens"}</span>
      </div>
    ),
    f32K: (
      <div className="flex-row">
        {"$0.04"}
        <span className="text-gray4">&nbsp;{"/ 1k tokens"}</span>
      </div>
    ),
    custom: "-",
  },
  {
    title: "output tokens",
    f8K: (
      <div className="flex-row">
        {"$0.04"}
        <span className="text-gray4">&nbsp;{"/ 1k tokens"}</span>
      </div>
    ),
    f32K: (
      <div className="flex-row">
        {"$0.08"}
        <span className="text-gray4">&nbsp;{"/ 1k tokens"}</span>
      </div>
    ),
    custom: "-",
  },
  {
    title: "Cost reduction vs GPT-4",
    f8K: "33%",
    f32K: "33%",
    custom: "Up to 40%",
  },
  {
    title: "Usage limit",
    f8K: "Unlimited",
    f32K: "Unlimited",
    custom: "Unlimited",
  },
  {
    title: "Rate limit",
    f8K: (
      <div className="flex-row">
        <span>{"40K tokens "}</span>
        <span className="text-gray4">&nbsp;{"/ min"}</span>
      </div>
    ),
    f32K: (
      <div className="flex-row">
        <span>{"40K tokens "}</span>
        <span className="text-gray4">&nbsp;{"/ min"}</span>
      </div>
    ),
    Custom: (
      <div className="flex-row">
        <span>{"Up to 120K tokens "}</span>
        <span className="text-gray4">&nbsp;{"/ min"}</span>
      </div>
    ),
  },
  {
    title: "API keys",
    f8K: "Unlimited",
    f32K: "Unlimited",
    custom: "Unlimited",
  },
  {
    title: "Users",
    f8K: "Unlimited",
    f32K: "Unlimited",
    custom: "Unlimited",
  },
  {
    title: "OpenAI-style integration",
    f8K: <Tick fill="var(--black)" />,
    f32K: <Tick fill="var(--black)" />,
    custom: <Tick fill="var(--black)" />,
  },
  {
    title: "Usage tracking",
    f8K: <Tick fill="var(--black)" />,
    f32K: <Tick fill="var(--black)" />,
    custom: <Tick fill="var(--black)" />,
  },
  {
    title: "Priority support",
    f8K: <Tick fill="var(--black)" />,
    f32K: <Tick fill="var(--black)" />,
    custom: <Tick fill="var(--black)" />,
  },
];

function Pricing({ user }) {
  const navigate = useNavigate();
  const cards = [
    {
      title: "Flex 8k",
      description:
        "Usage-based plan with a 8k context window, ideal for most AI applications.",
      price: "$0.02",
      priceDescription: (
        <span>
          {"First "}
          <span className="text-md t-medium text-black">40K</span>
          {" tokens free"}
        </span>
      ),
      featureTitle: "Flex 8k plan features:",
      button: {
        text: "Start free trial",
        className: "button-primary self-stretch",
        onClick: () => {
          if (!user.email) navigate("/signup?next=/platform/pricing");
          else {
            createPaymentSession({
              lookup_keys: [
                "keywordsai_flex_8k_input",
                "keywordsai_flex_8k_output",
              ],
            });
          }
        },
      },
      currentPlan: "View Usage Details",
      upgradeButton: {
        text: "Add subscription",
        className: "button-primary self-stretch",
        onClick: () => {
          if (!user.email) navigate("/signup?next=/platform/pricing");
          else {
            createPaymentSession({
              lookup_keys: [
                "keywordsai_flex_8k_input",
                "keywordsai_flex_8k_output",
              ],
            });
          }
        },
      },
      downgradeButton: {
        text: "Add subscription",
        className: "button-primary self-stretch",
        onClick: () => {
          if (!user.email) navigate("/signup?next=/platform/pricing");
          else {
            createPaymentSession({
              lookup_keys: [
                "keywordsai_flex_8k_input",
                "keywordsai_flex_8k_output",
              ],
            });
          }
        },
      },
      features: [
        "40K free trial tokens",
        "8K context window",
        "$0.02 / 1K input tokens",
        "$0.04 / 1K output tokens",
        "Testing playground",
        "Email support",
      ],
      plan: "flex_8k",
      rank: 2,
    },
    {
      title: "Flex 32k",
      description:
        "Usage-based plan with a 32k context window, perfect for context-rich AI products.",
      price: "$0.04",
      priceDescription: (
        <span>
          {"First "}
          <span className="text-md t-medium text-black">40K</span>
          {" tokens free"}
        </span>
      ),
      featureTitle: "Flex 32k plan features:",
      currentPlan: "View Usage Details",
      button: {
        text: "Start free trial",
        className: "button-primary self-stretch",
        onClick: () => {
          if (!user.email) navigate("/signup?next=/platform/pricing");
          else {
            createPaymentSession({
              lookup_keys: [
                "keywordsai_flex_32k_input",
                "keywordsai_flex_32k_output",
              ],
            });
          }
        },
      },
      upgradeButton: {
        text: "Add subscription",
        className: "button-primary self-stretch",
        onClick: () => {
          if (!user.email) navigate("/signup?next=/platform/pricing");
          else {
            createPaymentSession({
              lookup_keys: [
                "keywordsai_flex_32k_input",
                "keywordsai_flex_32k_output",
              ],
            });
          }
        },
      },
      downgradeButton: {
        text: "Add subscription",
        className: "button-primary self-stretch",
        onClick: () => {
          if (!user.email) navigate("/signup?next=/platform/pricing");
          else {
            createPaymentSession({
              lookup_keys: [
                "keywordsai_flex_32k_input",
                "keywordsai_flex_32k_output",
              ],
            });
          }
        },
      },
      features: [
        "40K free trial tokens",
        "32K context window",
        "$0.04 / 1K input tokens",
        "$0.08 / 1K output tokens",
        "Testing playground",
        "Email support",
      ],
      plan: "flex_32k",
      rank: 3,
    },
    {
      title: "Custom",
      description:
        "Design a custom package. For businesses with large volume or unique use cases.",
      featureTitle: "Custom plan features:",
      button: {
        text: "Talk to us",
        className: "button-secondary-black self-stretch",
        icon: <Arrow />,
        onClick: () => {
          window.open(
            "https://airtable.com/app5rlVP01ZZNXurS/shrEyS6G8lAoLX0E3",
            "_blank"
          );
        },
      },
      currentPlan: "View Usage Details",
      features: [
        "Volume discounts",
        "Custom usage plan",
        "Integration assistance",
        "Increased rate limit",
        "Testing playground",
        "CTO priority support",
      ],
      plan: "custom",
      rank: 4,
    },
  ];
  const pricingRef = React.useRef(null);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className="pricing main-section-bottom bg-white"
      style={{
        alignItems: "center",
      }}
    >
      <div className="flex-col justify-center items-center gap-md self-stretch main-container">
        <div className="display-lg">Plans and Pricing</div>
        <div className="text-lg text-gray4 t-c">
          Get started with a free trial: pay-by-usage plans with 8K or 32K
          context window options.
          <br />
          Prices are per 1,000 tokens, equivalent to about 750 words. This
          paragraph is about 60 tokens.
        </div>
      </div>
      <div
        className="flex-row self-stretch flex-1   space-between items-center"
        style={{
          justifyContent: "center",
          maxWidth: "1000px",
          alignSelf: "center",
        }}
      >
        <div className="pricing-wraper">
          {cards.map((card, index) => (
            <PricingCard {...card} key={index} />
          ))}
        </div>
      </div>
      <div className="main-container">
        <div className="flex-col justify-center items-start gap-md self-stretch">
          <div className="display-sm">Compare Plans and Features</div>
          <CompareTable plans={plans} features={features}/>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
