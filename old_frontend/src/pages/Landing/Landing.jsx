import React from "react";
import "./static/css/style.css";
import {
  Arrow,
  Thought,
  Text,
  GlobeSearch,
  CloudLock,
  Vault,
  Lock,
  Link,
} from "src/assets/svgs";
import Expandable from "./components/Expandable/Expandable";
import FeatureCard from "./components/FeatureCard/FeatureCard";
import { useNavigate } from "react-router-dom";
import apiConfig from "src/services/apiConfig";
import KeywordsBarChart from "src/components/KeywordsBarChart/KeywordsBarChart";
import NewsBar from "src/components/NewsBar/NewsBar";
const data = [
  {
    model: "GPT-4",
    Score: 9.0,
  },
  {
    model: "Keywords AI",
    Score: 8.8,
  },
  {
    model: "Claude-v2",
    Score: 8.06,
  },
  {
    model: "GPT-3.5-turbo",
    Score: 7.94,
  },
  {
    model: "Claude-v1",
    Score: 7.9,
  },
  {
    model: "Claude-instant-v1",
    Score: 7.85,
  },
  {
    model: "Llama-2-7b-chat",
    Score: 6.27,
  },
];

const features = [
  {
    icon: <Thought />,
    title: "Advanced Reasoning",
    description:
      "With vast general knowledge and finely-tuned algorithms, our API comprehends intricate instructions in natural language and tackles tough challenges efficiently.",
  },
  {
    icon: <Text />,
    title: "Content Generation",
    description:
      "Unleash the creativity of our API for compelling copywriting, SEO-optimized articles, or even scriptwriting. Get quality that rivals GPT-4, but at a fraction of the cost.",
  },
  {
    icon: <GlobeSearch />,
    title: "Intelligent Search",
    description:
      "Enhance your search features with contextual understanding and semantic matching, improving both accuracy and user satisfaction.",
  },
];
const questionAnswers = [
  {
    question: "Are you GPT-4?",
    answer:
      "We're using GPT-4 as foundation and built our model to pre-process your queries, reducing your LLM costs while maintaining high performance.",
  },
  {
    question: "What sets your API apart from using GPT-4 directly?",
    answer:
      "We deliver a unique combination of performance and cost-efficiency. Our outputs are comparable to GPT-4, but you'll see substantial cost savings depending on your plan.",
  },
  {
    question:
      "How does your response speed and latency stack up against GPT-4?",
    answer:
      "Our model’s processing speed is ~1ms, offering virtually zero latency and giving you the speed you need without compromising on quality.",
  },
  {
    question: "How can we test it out?",
    answer:
      "You can either book a live demo to see our product in action or grab a starter plan on our website, which includes 250K tokens for your testing needs.",
  },
  {
    question: "How is my data handled? Is it secure?",
    answer:
      "Your data security is our top priority. We don't store or have permission to access your data. All transmissions are encrypted.",
  },
  {
    question: "Do you claim to always outperform GPT-4?",
    answer:
      "We don't claim to be universally better than GPT-4. However, MT-bench tests demonstrate that we do excel in specific areas. We offer substantial cost savings, making us a highly competitive alternative.",
  },
  {
    question: "What is the pricing model? Are there hidden fees?",
    answer:
      "We offer three subscription plans, each with a different token allocation. Once you exceed your limit, additional charges apply per 1,000 tokens. The rates vary by plan, and there are no hidden fees, see more on our pricing page.",
  },
  {
    question: "Which plan should I choose if I'm unsure about my token usage?",
    answer:
      "If you're unsure about your token usage, we recommend starting with our Starter Plan for initial testing. This allows you to gauge your needs and scale up later. ",
  },
  {
    question:
      "How do tokens convert to words, and what does that mean for my usage?",
    answer:
      "We calculate tokens the same way as GPT — about 1,000 tokens translate to roughly 750 words. Understanding this helps you estimate your content generation capabilities. For instance, our Starter Plan offers 170K tokens, allowing you to create approximately 127.5K words.",
  },
  {
    question:
      "Who should I contact if I run into issues or have more questions?",
    answer:
      "If you run into issues or have more questions, our support team is available to assist you. You can book a time with us by clicking the 'Book a Demo' button, or reach out via email at team@keywordsai.co. We're always interested in hearing your feedback.",
  },
];
export default function Landing() {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const navigate = useNavigate();
  const [hover, setHover] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [mtHover, setMthover] = React.useState(false);
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
    <div
      className="dark landing-container"
      style={{
        position: "relative",
      }}
    >
      <NewsBar
        message="We’re live on Product Hunt! "
        link={"https://www.producthunt.com/posts/keywords-ai"}
      />
      {/* <a href="https://www.producthunt.com/posts/keywords-ai">
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=419434&theme=light"
          alt="Keywords&#0032;AI - GPT&#0045;4&#0032;quality&#0032;LLM&#0032;API&#0032;at&#0032;a&#0032;fraction&#0032;of&#0032;the&#0032;cost | Product Hunt"
          style={{
            position: "absolute",
            top: "85px",
            width: "250px",
            height: "54px",

          }} />
      </a> */}
      <div
        className="main-section bg-white"
        style={{
          paddingTop: "120px",
        }}
      >
        <div className="main-container">
          <div className="flex-col items-center gap-xxl self-stretch">
            <div className="flex-col justify-center items-center gap-md self-stretch">
              <div
                className="text-lg text-black"
                style={{
                  fontWeight: screenWidth > 400 ? "600" : "500",
                  letterSpacing: "0.05em",
                }}
              >
                Keywords AI Beta Release
              </div>
              <span className="keywordsai-title display-xl text-primary t-c">
                {"Streamline Your AI Costs."}
                <br />
                {"Not Your Capabilities."}
              </span>
            </div>
            <span className="text-lg t-c t-medium keywordsai-description">
              {
                "Get the results you'd expect from high-cost AI models, but at a fraction of the price."
              }
              <br />
              {
                "We optimize your queries to deliver the most cost-effective, yet powerful, output."
              }
            </span>
          </div>
          <div className="button-container">
            <button
              className="button-primary"
              onClick={() => {
                window.open(
                  "https://airtable.com/app5rlVP01ZZNXurS/shrEyS6G8lAoLX0E3",
                  "_blank"
                );
              }}
            >
              Beta access
              <Arrow />
            </button>
            <button
              className="button-primary bg-trans text-black"
              style={{
                textDecoration: "underline",
              }}
              onClick={() => {
                window.open("https://zcal.co/keywords-ai/demo", "_blank");
              }}
            >
              Book a demo
            </button>
          </div>
        </div>
      </div>
      <div className="main-section bg-gray2">
        <div className="main-container">
          <div className="flex-col items-center gap-sm self-stretch">
            <div className="display-lg">
              {"Powerful AI Doesn't Have to Be Expensive"}
            </div>
            <div className="text-lg text-gray4">
              {"Enterprise-level AI capabilities at startup-friendly pricing."}
            </div>
          </div>
          <div className="feature-card-group">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
          <div className="button-container">
            <button
              className="button-primary"
              onClick={() => {
                navigate("/pricing");
              }}
            >
              Start building
              <Arrow />
            </button>
          </div>
        </div>
      </div>
      <div className="main-section bg-white">
        <div className="main-container">
          <div className="flex-col items-center gap-sm self-stretch">
            <div className="display-lg">{"Performance You Can Trust."}</div>
            <div className="text-lg text-gray4">
              {
                "Reliable results without compromise — experience our advantage."
              }
            </div>
          </div>

          <div className="flex-col items-start gap-sm self-stretch">
            <div
              className="flex-row gap-xs items-center"
              onMouseEnter={() => setMthover(true)}
              onMouseLeave={() => setMthover(false)}
            >
              <span className="display-sm">{"MT-Bench Score "}</span>
              <span className="flex-row justify-center" style={{ width: 24 }}>
                {mtHover && (
                  <Link link={"https://huggingface.co/spaces/lmsys/mt-bench"} />
                )}
              </span>
            </div>

            <div className="text-lg text-gray4 t-l">
              {
                "MT-Bench assesses AI models with 80 multi-turn questions designed to evaluate conversational flow, instruction-following, and diverse knowledge from STEM to humanities. At Keywords AI, our Score of 8.8 stands out – rivaling GPT-4 and outperforming models including GPT-3.5 and Claude 2."
              }
            </div>
          </div>
          <div className="flex-col items-center gap-lg self-stretch">
            <div className="display-xs">
              {"MT-Bench Score for Different Models"}
            </div>
            <KeywordsBarChart
              data={data}
              dataKeyY="Score"
              xLabel="Model"
              yLabel="MT-Bench Score"
              dataKeyX="model"
            />
          </div>
          <div className="button-container">
            <button
              className="button-primary"
              onClick={() => {
                navigate("/platform/mt-browser");
              }}
            >
              See more in MT-Bench Browser
              <Arrow />
            </button>
          </div>
        </div>
      </div>
      <div className="main-section bg-gray2">
        <div className="flex-col justify-center items-center gap-sm self-stretch">
          <h1 className="display-xl t-c">
            <span className="text-primary">GPT-4 Intelligence</span>
            <br />
            {" at a Fraction of the Cost."}
          </h1>
          <div className="text-lg text-gray4 t-c">
            {"Save "}
            <span className="text-primary">up to 40%</span>
            {" without sacrificing performance."}
          </div>
        </div>
        <button
          className="button-primary"
          onClick={() => {
            navigate("/pricing");
          }}
        >
          View Pricing
          <Arrow />
        </button>
        <div className="flex-col items-center gap-lg self-stretch">
          <div className="display-sm center">
            <span className="text-primary">Faster</span> than any competing models
            <br />
            offering similar capabilities.
          </div>
          <div className="display-sm center">
            The most <span className="text-primary">cost-effective solution</span>
            <br />
            for comparable performance.
          </div>
          <div className="display-sm center">
            Accurate outputs
            <br />
            guarantees{" "}
            <span className="text-primary">consistent reliability.</span>
          </div>
          <div className="display-sm center">
            <span className="text-primary">{"Easy integration "}</span>
            with
            <br />
            OpenAI style API call.
          </div>
        </div>
      </div>
      {screenWidth > 768 && (
        <div className="main-section bg-white">
          <div className="main-container">
            <div className="flex-col items-center gap-sm self-stretch">
              <div className="display-lg">
                {"Secure and Private, No Compromises."}
              </div>
              <div className="text-lg text-gray4">
                {"End-to-end safeguards in place to protect your company data."}
              </div>
            </div>
            <div className="feature-grid">
              <div className="feature-grid-row">
                <div className="grid-card-1 grid-text bg-black">
                  {
                    "We do not process your data or create custom models, ensuring your data remains private."
                  }
                </div>
                <div className="grid-card-2 grid-text bg-gray2">
                  <Lock />
                  {
                    "You own and control your business data— no training or learning from your usage."
                  }
                </div>
                <div className="grid-card-3 grid-text bg-primary">
                  {
                    "We're committed to leveraging OpenAI's comprehensive compliance and security protocols."
                  }
                </div>
              </div>
              <div className="feature-grid-row justify-center">
                <div className="grid-card-4 grid-text bg-primary flex-row">
                  <div className="flex-row gap-lg self-stretch items-center">
                    <span>
                      {
                        "OpenAI encrypts your data both at rest (AES-256) and in transit (TLS 1.2+)."
                      }
                    </span>
                    <CloudLock />
                  </div>
                </div>
                <div className="grid-card-5 grid-text bg-gray2">
                  <Vault />
                  {"Financial transactions securely processed by Stripe."}
                </div>
              </div>
              <div className="grid-card-6 grid-text bg-black gap-lg">
                <span>
                  {
                    "Your data's security and privacy are our utmost priority. Managed by OpenAI, we ensure top-tier safety protocols while granting you full control."
                  }
                </span>
                <button
                  className="button-tertiary-white "
                  onClick={() => {
                    navigate("/platform/organization/api-keys");
                  }}
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                >
                  Explore API
                  <Arrow fill={!hover ? "var(--black)" : "var(--white)"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="main-section bg-black">
        <div className="main-container">
          <div className="flex-col items-center gap-sm self-stretch">
            <div className="display-lg text-white">{"Questions? Answers."}</div>
            <div className="text-lg text-gray2">
              {"For anything else, please reach out to us at "}
              <a className="text-gray2" href="mailto:team@keywordsai.co">
                team@keywordsai.co
              </a>
              {"."}
            </div>
          </div>
          <div className="qa-body">
            {questionAnswers.map((qa, index) => (
              <Expandable
                key={index}
                question={qa.question}
                answer={qa.answer}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className="main-section-bottom bg-white"
        style={{
          minHeight: "auto",
        }}
      >
        <div className="main-container">
          <div className="flex-col items-center gap-sm self-stretch">
            <div className="display-lg">{"Stay Ahead with Keywords AI"}</div>
            <div className="text-lg text-gray4">
              {
                "Subscribe to our newsletter for updates, tips, and exclusive offers."
              }
            </div>
          </div>
          <div className="input-field">
            <label className="text-sm" htmlFor="email-field">
              Email
            </label>
            <form
              className="input-group"
              method="POST"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const email = form.email.value;
                fetch(`${apiConfig.apiURL}api/subscribe/`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email,
                  }),
                }).then(async (res) => {
                  if (res.ok) {
                    setSuccess(true);
                  }
                });
              }}
            >
              <input
                name="email"
                type="email"
                id="email-field"
                placeholder="example@keywordsai.co"
              />
              <button type="submit" className="button-primary">
                Sign up
              </button>
            </form>
            {error && <div className="t-error text-md">{error}</div>}
            {success && (
              <div className="t-success text-md">
                {"Signed up successfully."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
