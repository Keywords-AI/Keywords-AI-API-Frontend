import React, { useEffect } from "react";
import "./style.css";
import { FeatureTick } from "src/assets/svgs";
import { connect } from "react-redux";
import { Arrow } from "src/assets/svgs";
import { useNavigate } from "react-router-dom";
import LargeTextTitle from "../../../../components/Titles/LargeTextTitle/LargeTextTitle";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {};

const ranking = {
  flex_8k: 1,
  flex_32k: 2,
  pro: 3,
};

function PricingCard({
  user,
  price,
  priceDescription = "billed monthly",
  plan = "plan",
  title = "Title",
  description = "Description Here",
  featureTitle = "Here are the features",
  currentPlan = "Current Plan",
  button = {
    text: "Choose This",
    className: "button-tertiary-white button-fill",
    icon: null,
    onClick: () => { },
  },
  upgradeButton = {
    text: "Get Started",
    className: "button-primary button-fill",
    onClick: () => { },
  },
  downgradeButton = {
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
  features = ["feature 1", "feature 2"],
  toBeUpgraded = false,
  rank = 0,
}) {
  const navigate = useNavigate();
  const currentPlanRank =
    ranking[user?.organization?.owner?.user_subscription?.plan?.toLowerCase()] || 0;
  const thisPlanRank = ranking[plan.toLowerCase()];

  let buttonToDisplay = button;

  if (currentPlanRank < thisPlanRank) {
    buttonToDisplay = upgradeButton; // Upgrade if current plan is lower ranked
  } else {
    buttonToDisplay = downgradeButton; // Downgrade if current plan is higher ranked
  }

  useEffect(() => {
    if (user?.organization?.owner?.user_subscription) {
      console.log("User subscription: ", user.user_subscription)
      console.log("Plan: ", plan)
      console.log("Yes? ", Object.keys(user.user_subscription.subscription_ids).includes(plan))
    }
  }, [user])


  return (
    <div className="pricing-card">
      <div className="flex-col self-stretch space-between card-top">
        <div className="flex-col justify-start items-start gap-xs self-stretch flex-1  ">
          <div className="display-sm">{title}</div>
          <div className="text-md">{description}</div>
        </div>
        <div className="flex-col items-start gap-lg self-stretch">
          {price && (
            <div className="flex-col flex-1  ">
              <div>
                <span className="display-sm">{price}</span>
                <span className="text-md text-gray4">{" / 1K input tokens"}</span>
              </div>
              <div className="text-md text-gray4">{priceDescription}</div>
            </div>
          )}
          {user?.organization?.owner?.user_subscription?.subscription_ids?.items && Object.keys(user.organization.owner.user_subscription.subscription_ids.items).includes(plan) ? (
            <button
              className={"button-tertiary-white button-fill"}
              onClick={() => navigate("/platform/organization/usage")}
            >
              {currentPlan}
            </button>
          ) : (
            <button
              className={
                buttonToDisplay.className || "button-primary button-fill"
              }
              onClick={buttonToDisplay.onClick || (() => { })}
            >
              {toBeUpgraded
                ? button?.upgradeText
                : button?.text || "Start Free Trial"}
              {button?.icon}
            </button>
          )}
        </div>
      </div>
      <div className="flex-col items-start gap-md self-stretch">
        <div className="text-md t-medium">{featureTitle}</div>
        <div className="flex-col gap-xs items-start">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex-row justify-start items-center gap-xs self-stretch"
              style={{
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  height: "16px",
                  width: "16px",
                  flexShrink: 0,
                }}
              >
                <FeatureTick />
              </div>
              <div className="text-md">{feature}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PricingCard);
