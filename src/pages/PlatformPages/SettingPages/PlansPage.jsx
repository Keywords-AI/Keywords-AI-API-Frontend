import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PageContent, PageParagraph } from "src/components/Sections";
import { SmallPricingCard } from "src/components/Cards";
import { createPaymentSession } from "src/services/stripe";
import {
    STRIPE_STATER_LOOKUP_KEY,
    STRIPE_TEAM_LOOKUP_KEY,
    STRIPE_TEAM_YEARLY_LOOKUP_KEY
} from "src/env.js";
import { SwitchButton } from "src/components/Buttons";

const mapStateToProps = (state) => ({
    organization: state.organization,
});

const mapDispatchToProps = {};

const Subheading = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ userCount = 3, price = 29, newMonth = "January 11, 2024" }) => {
    return (
        <div>
            {"You’re currently on the Team Monthly plan. Your organization of "}
            <span>{userCount}</span>
            {" users costs $"}
            {price} {" per month, and will renew on "}
            <span>{newMonth}</span>
        </div>
    );
});

export const PlansPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ organization }) => {
  const [isYearly, setIsYearly] = useState(true);
  const [teamPrice, setTeamPrice] = useState("29");
  const cards = [
    {
      title: "Starter",
      plan: "starter",
      subtitle: "Best for solo builders.",
      price: 0,
      billFrequency: "Free forever",
      featureTitle: "Free plan fretures",
      features: [
        "10,000 API requests",
        "1 developer seat",
        "1 proxy API key",
        "Usage analytics",
        "Status monitoring",
        "Dynamic LLM router",
        "OpenAI credits support",
        "Email support",
      ],
      downgradeParams: {
        buttonText: "Downgrade to starter",
        buttonVariant: "r4-black",
        buttonOnClick: () => {
          createPaymentSession([STRIPE_STATER_LOOKUP_KEY]);
        },
      },
      buttonParams: {
        buttonText: "Get started",
        buttonVariant: "r4-primary",
        buttonOnClick: () => {
          createPaymentSession([STRIPE_STATER_LOOKUP_KEY]);
        },
      },
    },
    {
      title: "Team",
      plan: "team",
      subtitle: "Best for startups and teams.",
      price: teamPrice,
      billFrequency: isYearly ? "Billed annually" : "Billed monthly",
      featureTitle: "Everything in Free, plus",
      features: [
        "Unlimited API requests",
        "Unlimited seats",
        "Unlimited proxy keys",
        "Advanced usage analytics",
        "Advanced model fallback",
        "Priority model access",
        "Admin roles",
        "CTO priority support",
      ],
      downgradeParams: {
        buttonText: "Downgrade to team",
        buttonVariant: "r4-black",
        buttonOnClick: () => {
          if (isYearly) {
            createPaymentSession([STRIPE_TEAM_YEARLY_LOOKUP_KEY]);
          } else {
            createPaymentSession([STRIPE_TEAM_LOOKUP_KEY]);
          }
        },
      },
      buttonParams: {
        buttonText: "Upgrade to team",
        buttonVariant: "r4-primary",
        buttonOnClick: () => {
          if (isYearly) {
            createPaymentSession([STRIPE_TEAM_YEARLY_LOOKUP_KEY]);
          } else {
            createPaymentSession([STRIPE_TEAM_LOOKUP_KEY]);
          }
        },
      },
    },
    {
      title: "Custom",
      plan: "custom",
      subtitle: "Fully tailored for your use case.",
      featureTitle: "Everything in Team, plus",
      features: [
        "Testing playground",
        "Integration assistance",
        "Use-case optimization",
        "Increased rate limit",
        "Volume discount",
      ],
      downgradeParams: {
        buttonText: "Book a demo",
        buttonVariant: "r4-black",
        buttonOnClick: () => {
          // To update to the correct link
          window.open("https://keywordsai.co", "_blank");
        },
      },
      buttonParams: {
        buttonText: "Book a demo",
        buttonVariant: "r4-black",
        buttonOnClick: () => {
          // To update to the correct link
          window.open("https://keywordsai.co", "_blank");
        },
      },
    },
  ];
  const currIndex = cards.indexOf(
    cards.find((card) => card.plan === organization?.organization_subscription?.plan)
  );
  const displayParams = (index, downgradeParams, buttonParams) => {
    if (index < currIndex) {
      return downgradeParams;
    } else if (index === currIndex) {
      return {
        buttonText: "Current plan",
        buttonVariant: "r4-black",
        buttonOnClick: () => {},
      };
    } else {
      return buttonParams;
    }
  };

    const handleSwitchChange = (checked) => {
        setIsYearly(checked);
        setTeamPrice(checked ? "29" : "39");
    };

  return (
    <PageContent
      title="Plans"
      subtitle={
        <Subheading
          price={cards[currIndex]?.price}
          userCount={organization?.users?.length}
        />
      }
    >
      <div className="flex flex-col w-full items-center gap-lg">
        <div className="flex justify-center items-center gap-sm">
          <span className="text-lg text-gray-4 text-center"> Monthly </span>
          <SwitchButton onCheckedChange={handleSwitchChange} checked={isYearly}/>
          <div>
            <span className="text-lg text-gray-4 text-center"> Yearly </span>
            <span className="text-lg text-primary text-center">
              {" "}
              (35% off){" "}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-sm self-stretch">
          {cards.map((card, index) => {
            return (
              <SmallPricingCard
                key={index}
                title={card.title}
                subtitle={card.subtitle}
                featureTitle={card.featureTitle}
                features={card.features}
                price={card.price}
                billFrequency={card.billFrequency}
                {...displayParams(
                  index,
                  card.downgradeParams,
                  card.buttonParams
                )}
              />
            );
          })}
        </div>
      </div>
    </PageContent>
  );
});
