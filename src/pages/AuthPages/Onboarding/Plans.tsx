import React, { useEffect, useState } from "react";
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
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { PricingCardParams, PricingButtonParams } from "src/types";
import { TitleStaticHeading } from "src/components/Titles";
import { useNavigate } from "react-router-dom";
import { REDIRECT_URI } from "src/utilities/navigation";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "src/types";

export const StartWithPlan = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const memoSelector = createSelector(
    [(state: RootState) => state.organization, (state) => state.user],
    (organization, user) => ({ organization, user })
  ); // This creates a memorized selector callback
  const { organization, user } = useTypedSelector(memoSelector);
  useEffect(() => {
    // If subscribed users stumbled on this page, redirect them
    console.log("organization", organization);
    if (organization?.active_subscription) {
      if (organization?.onboarded) {
        navigate(REDIRECT_URI);
      } else {
        navigate("/onboarding/get-started");
      }
    }
  }, [organization]);
  const [isYearly, setIsYearly] = useState(true);
  const [teamPrice, setTeamPrice] = useState("79");

  const cards: PricingCardParams[] = [
    {
      title: "Free",
      plan: "starter",
      subtitle: "Best for solo builders.",
      price: "0",
      billFrequency: "Free forever",
      featureTitle: "Starter plan features",
      features: [
        "10k requests / month",
        "2 seats",
        // "1 proxy API key",
        "Community support",
        // "Status monitoring",
        // "Dynamic LLM router",
        // "OpenAI models",
        // "Email support",
      ],
      downgradeParams: {
        buttonText: "Downgrade to starter",
        buttonVariant: "r4-gray-2",
        buttonOnClick: () => {
          dispatch(createPaymentSession([STRIPE_STATER_LOOKUP_KEY]));
        },
      },
      buttonParams: {
        buttonText: "Get started",
        buttonVariant: "r4-primary",
        buttonOnClick: () => {
          dispatch(createPaymentSession([STRIPE_STATER_LOOKUP_KEY]));
        },
      },
    },
    {
      title: "Pro",
      plan: "team",
      subtitle: "Best for early stage startups.",
      price: teamPrice,
      billFrequency: isYearly ? "Billed annually" : "Billed monthly",
      featureTitle: "Everything in Starter, plus",
      features: [
        "1M requests / month",
        "5 seats",
        "Custom evaluations",
        "Founders 24/7 support",
      ],
      downgradeParams: {
        buttonText: "Downgrade to team",
        buttonVariant: "r4-gray-2",
        buttonOnClick: () => {
          if (isYearly) {
            dispatch(
              createPaymentSession([
                STRIPE_PRO_YEARLY_FLAT_LOOKUP_KEY,
                STRIPE_PRO_YEARLY_USAGE_LOOKUP_KEY,
              ])
            );
          } else {
            dispatch(
              createPaymentSession([
                STRIPE_PRO_MONTHLY_FLAT_LOOKUP_KEY,
                STRIPE_PRO_MONTHLY_USAGE_LOOKUP_KEY,
              ])
            );
          }
        },
      },
      buttonParams: {
        buttonText: "Upgrade to team",
        buttonVariant: "r4-primary",
        buttonOnClick: () => {
          if (isYearly) {
            dispatch(
              createPaymentSession([
                STRIPE_PRO_YEARLY_FLAT_LOOKUP_KEY,
                STRIPE_PRO_YEARLY_USAGE_LOOKUP_KEY,
              ])
            );
          } else {
            dispatch(
              createPaymentSession([
                STRIPE_PRO_MONTHLY_FLAT_LOOKUP_KEY,
                STRIPE_PRO_MONTHLY_USAGE_LOOKUP_KEY,
              ])
            );
          }
        },
      },
    },
    {
      price: "",
      title: "Custom",
      plan: "custom",
      subtitle: "Fully tailored for your use case.",
      featureTitle: "Everything in Team, plus",
      features: [
        "Unlimited request",
        "Unlimited seats",
        "Fine-tuning",
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
        buttonText: "Book a demo",
        buttonVariant: "r4-gray-2",
        buttonOnClick: () => {
          // To update to the correct link
          window.open("https://keywordsai.co", "_blank");
        },
      },
    },
  ];
  const currCard: PricingCardParams | undefined = cards.find(
    (card: PricingCardParams) =>
      card?.plan === organization?.organization_subscription?.plan
  );
  const currIndex: number | undefined = currCard && cards.indexOf(currCard);
  const displayParams = (
    index: number,
    downgradeParams: PricingButtonParams,
    buttonParams: PricingButtonParams
  ): PricingButtonParams => {
    if (currIndex && index < currIndex) {
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

  const handleSwitchChange = (checked: boolean) => {
    setIsYearly(checked);
    setTeamPrice(checked ? "79" : "99");
  };

  return (
    <div className="flex flex-col w-full max-w-[800px] gap-sm pb-xxxl pt-[88px] ">
      <div className="flex flex-col w-full items-center gap-lg">
        <TitleStaticHeading
          title="Subscription options"
          subtitle="Start for free and scale as you go. Upgrade to enable unlimited requests and additional features."
          textAlign="text-center"
        />
        <div className="flex flex-col w-full items-center gap-sm">
          <div className="flex justify-center items-center gap-xs">
            <span className="text-sm-md text-gray-4">Monthly</span>
            <SwitchButton
              onCheckedChange={handleSwitchChange}
              checked={isYearly}
            />
            <div>
              <span className="text-sm-md text-gray-4">Yearly</span>
              <span className="text-sm-md text-primary"> (20% off) </span>
            </div>
          </div>
          <div className="flex flex-row gap-sm self-stretch">
            {cards.map((card, index) => {
              return (
                <SmallPricingCard
                  key={index}
                  plan={card?.plan}
                  title={card?.title}
                  subtitle={card?.subtitle}
                  featureTitle={card?.featureTitle}
                  features={card?.features}
                  price={card?.price}
                  billFrequency={card?.billFrequency}
                  {...displayParams(
                    index,
                    card?.downgradeParams,
                    card?.buttonParams
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
