import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PageContent, PageParagraph } from "src/components/Sections";
import { SmallPricingCard } from "src/components/Cards";
import { createPaymentSession } from "src/services/stripe";
import {
  STRIPE_STATER_LOOKUP_KEY,
  STRIPE_TEAM_MONTHLY_FLAT_LOOKUP_KEY,
  STRIPE_TEAM_MONTHLY_USAGE_LOOKUP_KEY,
  STRIPE_TEAM_YEARLY_FLAT_LOOKUP_KEY,
  STRIPE_TEAM_YEARLY_USAGE_LOOKUP_KEY,
} from "src/env";
import { SwitchButton } from "src/components/Buttons";
import { useTypedSelector } from "src/store/store";
import { models } from "src/utilities/constants";

const mapStateToProps = (state) => ({
  organization: state.organization,
});

const mapDispatchToProps = {
  createPaymentSession,
};

const Subheading = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ userCount = 4, price = 29, newMonth = "January 11, 2024" }) => {
  const { name, renewal_date, amount, interval } = useTypedSelector(
    (state) => state.billings?.currentSubscription || {}
  );
  return (
    <div>
      You’re currently on the{" "}
      <span className="text-gray-5">{`${name} ${interval}`}</span> plan. Your
      organization of
      <span className="text-gray-5">{" " + userCount}</span>
      {" users costs "}
      <span className="text-gray-5">{amount} </span>
      {" per month, and will renew on "}
      <span className="text-gray-5">{renewal_date}</span>
    </div>
  );
});

export const PlansPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ organization, createPaymentSession }) => {
  const [isYearly, setIsYearly] = useState(true);
  const [teamPrice, setTeamPrice] = useState("29");
  const remaining = models.length;
  const cards = [
    {
      title: "Starter",
      plan: "starter",
      subtitle: "Best for solo builders.",
      price: 0,
      billFrequency: "",
      featureTitle: "Starter plan features",
      features: [
        "10,000 API requests",
        "1 developer seat",
        "1 proxy API key",
        "Usage analytics",
        "Status monitoring",
        "Dynamic LLM router",
        "OpenAI models",
        "Email support",
      ],
      downgradeParams: {
        buttonText: "Downgrade to starter",
        buttonVariant: "r4-gray-2",
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
      featureTitle: "Everything in Starter, plus",
      features: [
        "Unlimited API requests",
        "Unlimited seats",
        "Unlimited proxy keys",
        "Advanced usage analytics",
        "Admin roles",
        "Advanced model fallback",
        `Mistral, Anthropic, and ${remaining} more models`,
        "CTO priority support",
      ],
      downgradeParams: {
        buttonText: "Downgrade to team",
        buttonVariant: "r4-gray-2",
        buttonOnClick: () => {
          if (isYearly) {
            createPaymentSession([
              STRIPE_TEAM_YEARLY_FLAT_LOOKUP_KEY,
              STRIPE_TEAM_YEARLY_USAGE_LOOKUP_KEY,
            ]);
          } else {
            createPaymentSession([
              STRIPE_TEAM_MONTHLY_FLAT_LOOKUP_KEY,
              STRIPE_TEAM_MONTHLY_USAGE_LOOKUP_KEY,
            ]);
          }
        },
      },
      buttonParams: {
        buttonText: "Upgrade to Team",
        buttonVariant: "r4-primary",
        buttonOnClick: () => {
          if (isYearly) {
            createPaymentSession([
              STRIPE_TEAM_YEARLY_FLAT_LOOKUP_KEY,
              STRIPE_TEAM_YEARLY_USAGE_LOOKUP_KEY,
            ]);
          } else {
            createPaymentSession([
              STRIPE_TEAM_MONTHLY_FLAT_LOOKUP_KEY,
              STRIPE_TEAM_MONTHLY_USAGE_LOOKUP_KEY,
            ]);
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
        buttonVariant: "r4-gray-2",
        buttonOnClick: () => {
          // To update to the correct link
          window.open("https://keywordsai.co", "_blank");
        },
      },
      buttonParams: {
        buttonText: "Book a demo",
        buttonVariant: "r4-gray-2",
        buttonOnClick: () => {
          // To update to the correct link
          window.open("https://zcal.co/keywords-ai", "_blank");
        },
      },
    },
  ];
  const currIndex = cards.indexOf(
    cards.find(
      (card) => card.plan === organization?.organization_subscription?.plan
    )
  );
  const displayParams = (index, downgradeParams, buttonParams) => {
    if (index < currIndex) {
      return downgradeParams;
    } else if (index === currIndex) {
      return {
        buttonText: "Current plan",
        buttonVariant: "r4-gray-2",
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
      <div className="flex flex-col w-full items-center gap-sm">
        <div className="flex justify-center items-center gap-xs">
          <span className="text-sm-md text-gray-4">Monthly</span>
          <SwitchButton
            onCheckedChange={handleSwitchChange}
            checked={isYearly}
          />
          <div>
            <span className="text-sm-md text-gray-4">Yearly</span>
            <span className="text-sm-md text-primary"> (35% off) </span>
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
                plan={card.plan}
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
