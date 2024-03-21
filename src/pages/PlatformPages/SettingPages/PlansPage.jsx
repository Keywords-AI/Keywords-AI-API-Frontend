import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { PageContent, PageParagraph } from "src/components/Sections";
import { SmallPricingCard } from "src/components/Cards";
import { createPaymentSession } from "src/services/stripe";
import {
  STRIPE_STATER_LOOKUP_KEY,
  STRIPE_TEAM_MONTHLY_FLAT_LOOKUP_KEY,
  STRIPE_TEAM_MONTHLY_USAGE_LOOKUP_KEY,
  STRIPE_TEAM_YEARLY_FLAT_LOOKUP_KEY,
  STRIPE_TEAM_YEARLY_USAGE_LOOKUP_KEY,
  STRIPE_PRO_YEARLY_FLAT_LOOKUP_KEY,
  STRIPE_PRO_YEARLY_USAGE_LOOKUP_KEY,
  STRIPE_PRO_MONTHLY_FLAT_LOOKUP_KEY,
  STRIPE_PRO_MONTHLY_USAGE_LOOKUP_KEY,
} from "src/env";
import { SwitchButton } from "src/components/Buttons";
import { useTypedSelector } from "src/store/store";
import { Tag } from "src/components/Misc";
import TextSwitchButton from "src/components/Buttons/TextSwitchButton";
import { PricingTable } from "src/components/Tables";

const mapStateToProps = (state) => ({
  organization: state.organization,
  name: state.billings?.currentSubscription?.name,
  renewal_date: state.billings?.currentSubscription?.renewal_date,
  amount: state.billings?.currentSubscription?.amount,
  interval: state.billings?.currentSubscription?.interval,
});

const mapDispatchToProps = {
  createPaymentSession,
};

const Subheading = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    userCount = 4,
    price = 29,
    newMonth = "January 11, 2024",
    name,
    renewal_date,
    amount,
    interval,
  }) => {
    return (
      <div>
        You’re currently on the{" "}
        <span className="text-gray-5">{`${name} ${interval}`}ly</span> plan.
        Your organization of
        <span className="text-gray-5">{" " + userCount}</span>
        {" users costs "}
        <span className="text-gray-5">{amount}</span>
        {" per month, and will renew on "}
        <span className="text-gray-5">{renewal_date}</span>
      </div>
    );
  }
);

export const PlansPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ organization, createPaymentSession }) => {
  const [isYearly, setIsYearly] = useState(true);
  const [teamPrice, setTeamPrice] = useState("79");
  const models = Object.keys(useSelector((state) => state.models.models));
  const remaining = models.length || 20;
  const cards = [
    {
      title: "Starter",
      plan: "starter",
      subtitle: "Best for solo builders.",
      price: 0,
      billFrequency: "Free forever",
      featureTitle: "Starter plan features",
      features: [
        // "$10 free LLM credits",
        "10k requests / month",
        "2 seats",
        "Community support",
      ],
      downgradeParams: {
        buttonText: "Downgrade to starter",
        buttonVariant: "r4-gray-2",
        buttonOnClick: () => {
          createPaymentSession([STRIPE_STATER_LOOKUP_KEY]);
        },
      },
      buttonParams: {
        buttonText: "Get started free",
        buttonVariant: "r4-black",
        buttonOnClick: () => {
          createPaymentSession([STRIPE_STATER_LOOKUP_KEY]);
        },
      },
    },
    {
      title: isYearly ? (
        <div className="flex  items-center gap-xxs">
          Pro
          <Tag
            text="-20%"
            textColor="text-success"
            border=""
            borderRadious="rounded-sm"
            backgroundColor="bg-success/10"
          />
        </div>
      ) : (
        "Pro"
      ),
      plan: "team",
      subtitle: "Best for early stage startups.",
      price: teamPrice,
      billFrequency: isYearly ? "Billed annually" : "Billed monthly",
      featureTitle: "Everything in Starter, plus",
      features: [
        // "$100 free LLM credits",
        "1M requests / month",
        "5 seats",
        "Custom evaluations",
        "Founders 24/7 support",
      ],
      downgradeParams: {
        buttonText: "Downgrade to Pro",
        buttonVariant: "r4-gray-2",
        buttonOnClick: () => {
          if (isYearly) {
            createPaymentSession([
              STRIPE_PRO_YEARLY_FLAT_LOOKUP_KEY,
              STRIPE_PRO_YEARLY_USAGE_LOOKUP_KEY,
            ]);
          } else {
            createPaymentSession([
              STRIPE_PRO_MONTHLY_FLAT_LOOKUP_KEY,
              STRIPE_PRO_MONTHLY_USAGE_LOOKUP_KEY,
            ]);
          }
        },
      },
      buttonParams: {
        buttonText: "Upgrade to Pro",
        buttonVariant: "r4-white",
        buttonOnClick: () => {
          if (isYearly) {
            createPaymentSession([
              STRIPE_PRO_YEARLY_FLAT_LOOKUP_KEY,
              STRIPE_PRO_YEARLY_USAGE_LOOKUP_KEY,
            ]);
          } else {
            createPaymentSession([
              STRIPE_PRO_MONTHLY_FLAT_LOOKUP_KEY,
              STRIPE_PRO_MONTHLY_USAGE_LOOKUP_KEY,
            ]);
          }
        },
      },
    },
    {
      title: "Team",
      plan: "custom",
      price: 499,
      subtitle: "Built for scaling.",
      featureTitle: "Everything in Pro, plus",
      billFrequency: "Billed annually",
      features: [
        "Unlimited request",
        "Unlimited seats",
        "Increased rate limit",
        "SOC 2 compliance",
      ],
      downgradeParams: {
        buttonText: "Talk to founders",
        buttonVariant: "r4-gray-2",
        buttonOnClick: () => {
          // To update to the correct link
          window.open("https://keywordsai.co", "_blank");
        },
      },
      buttonParams: {
        buttonText: "Talk to founders",
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
    setTeamPrice(checked ? "79" : "99");
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
        {/* <div className={`flex items-center gap-xxs`}>
          {isYearly && <div className="w-[46px] h-[4px]"></div>}
          <TextSwitchButton
            checked={isYearly}
            leftValue="Monthly"
            rightValue="Annually"
            onCheckedChange={handleSwitchChange}
          />
          {isYearly && (
            <Tag
              text="-20%"
              textColor="text-success"
              border=""
              borderRadious="rounded-sm"
              backgroundColor="bg-success/10"
            />
          )}
        </div> */}
        {/* <div className="flex flex-row gap-sm self-stretch">
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
        </div> */}
        <div className="flex flex-col gap-xl items-center self-stretch w-full">
          <PricingTable />
        </div>
      </div>
    </PageContent>
  );
});
