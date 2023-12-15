import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Arrow, ViewDetail } from "src/assets/svgs.jsx";
import useFetch from "src/hooks/useFetch";
import { getDateStr } from "src/utilities/utilities";
import { cancelSubscription } from "src/services/stripe";
import ListDisplay from "src/components/ListDisplay/ListDisplay.jsx";
import { useNavigate } from "react-router-dom";
import CurrentPlanCard from "./CurrentPlanCard";
import Popup from "src/components/Popup/Popup";

const mapStateToProps = (state) => {
  return {
    // your props here
    user: state.user,
  };
};

const mapDispatchToProps = {};

const CreditRemaining = ({ user }) => {
  return (
    <div className="flex-col items-start self-stretch gap-xxs">
      <div className="text-md t-medium text-gray4">Credit remaining</div>
      <div className="text-md text-black">
        {`${user?.free_trial_remaining || 40000} Tokens`}
      </div>
    </div>
  );
};

export const CreditParagraph = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditRemaining);

const cards = {
  'flex_8k': {
    title: "Flex 8k",
    description: "Usage-based pricing. 8k context window. Billed monthly. ",

  },
  'flex_32k': {
    title: "Flex 32k",
    description: "Usage-based pricing. 32k context window. Billed monthly. "
  },
  'bonus': {
    title: "Bonus",
    description: "Enjoy your bonus tokens!",
    link: "/pricing",
    linkText: "Upgrade"
  },
  'none': {
    title: "No Active Plan",
    description: "Sign up for a usage-based plan and get 40k free tokens.",
    link: "/pricing",
    linkText: "Start free trial"
  },
  'free_trial': {
    title: "Free Trial",
    description: "Enjoy your first 40k tokens on us!",
    link: "/pricing",
    linkText: "Upgrade"
  }

}


const PlanStatus = ({ user }) => {
  const navigate = useNavigate();
  const userCustomBundle = user?.custom_bundle;
  const userCustomSubscription = user?.custom_subscription;
  const subscriptionItems = user?.organization?.owner?.user_subscription?.subscription_ids?.items || {};

  // Check if any subscriptions are present
  const hasSubscriptions = Object.keys(subscriptionItems).length !== 0;

  // Check if custom plans are present
  const hasCustomBundle = userCustomBundle && Object.keys(userCustomBundle).length !== 0;
  const hasCustomSubscription = userCustomSubscription && Object.keys(userCustomSubscription).length !== 0;

  if (!hasSubscriptions && !hasCustomBundle && !hasCustomSubscription) {
    return (
      <div className="flex-col gap-md items-start self-stretch">
        <CurrentPlanCard
          user={user}
          {...cards['none']}
          linkText={user?.free_trial_expired ? "Retrieve a plan" : "Start free trial"}
          titleColor={"var(--red-dark)"}
          borderColor='var(--red-light)'
        />
      </div>
    );
  }

  return (
    <div className="flex-col gap-md items-start self-stretch">
      <div className="flex-row gap-sm self-stretch items-start justify-start flex-wrap">
        {hasSubscriptions && Object.keys(subscriptionItems).map((key, index) => {
          if (cards[key]?.title && key !== "custom") {
            return (
              <CurrentPlanCard
                key={index}
                title={cards[key]?.title}
                description={cards[key]?.description}
                user={user}
                link={"/platform/organization/usage"}
              />
            );
          }
          return null; // Important to return null outside the condition for React mapping
        })}

        {hasCustomBundle && (
          <CurrentPlanCard
            key={99990}
            user={user}
            title={"Custom Bundle"}
            description={userCustomBundle.description || "Usage-based pricing. Fully customized "}
            link={"/platform/organization/usage"}
          />
        )}

        {hasCustomSubscription && (
          <CurrentPlanCard
            key={99991}
            user={user}
            title={"Custom Subscription"}
            description={userCustomSubscription.description || "Usage-based pricing. Fully customized "}
            link={"/platform/organization/usage"}
          />
        )}

        {user.free_trial_remaining > 0 &&
          <CurrentPlanCard
            user={user}
            key={99992}
            {...cards['free_trial']}
            link={"/platform/organization/usage"}
          />
        }

        {subscriptionItems.bonus &&
          <CurrentPlanCard
            key={99993}
            title={cards["bonus"].title}
            description={cards["bonus"].description}
            user={user}
            link={"/platform/organization/usage"}
          />
        }
      </div>
    </div>
  );
}

export const PlanStatusParagraph = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanStatus);

const Bills = ({ user }) => {
  const navigate = useNavigate();
  const { data, error, loading } = useFetch({ path: "payment/paid-bills" });
  const [display, setDisplay] = React.useState([]);
  const [canceling, setCanceling] = React.useState(false);
  useEffect(() => {
    console.log(data);
    if (data?.length > 0) {
      setDisplay(
        data.map((item) => {
          return {
            ...item,
            created: getDateStr(item.created, false, true),
            amount_paid: `$${item.amount_paid / 100}`,
          };
        })
      );
    }
  }, [data]);

  const Actions = (row, idx) => {
    return (
      <div
        className="flex-row items-center gap-xxs hover-cp text-primary text-sm"
        onClick={() => {
          if (data?.length > 0) {
            window.open(data[idx].hosted_invoice_url, "_blank");
          }
        }}
      >
        <ViewDetail />
        <span>View</span>
      </div>
    );
  };
  return (
    <div className="flex-col gap-sm items-start self-stretch">
      <div className="display-xs">Payment History</div>
      {!data || data?.length === 0 ? (
        <>
          <div className="text-md t-medium text-gray4">
            There are no invoices to display.
          </div>
        </>
      ) : (
        <>
          <div className="text-md t-medium text-gray4">
            You can see your payment history below. Click on View to see
            additional details.
          </div>
          <ListDisplay
            headers={["Date", "Amount", "Payment ID"]}
            rows={display}
            rowIterator={["created", "amount_paid", "id"]}
            rowLayout="repeat(2, 160px) 1fr auto"
            ActionsComponents={Actions}
          />
          <div className="flex-row gap-xs items-center">
            <button
              className="button-primary"
              onClick={() => {
                navigate("/pricing");
              }}
            >
              View pricing plans
              <Arrow />
            </button>
            {user?.organization?.owner?.active_subscription && (
              <button
                className="button-secondary-gray"
                onClick={() => {
                  // cancelSubscription();
                  setCanceling(true);
                }}
              >
                Cancel plan
              </button>
            )}
          </div>
          <Popup open={canceling} closePopup={() => setCanceling(false)}>
            <div className="modal-card bg-white">
              <div className="flex-col items-start self-stretch gap-sm">
                <div className="display-xs">Cancel Your Plan</div>
                <div className="text-md text-gray4 t-medium">
                  We’re sorry to see you cancel your plan. To help us improve,
                  please help us understand the reason.
                </div>
              </div>
              <textarea
                name="system-prompt"
                style={{
                  height: 240,
                  resize: "none",
                }}
                placeholder="Leave your feedback here"
                className="b-none text-md bg-white text-black flex-col self-stretch px-xs py-xxs b-gray3"
                onInput={(e) => {
                  setSystemPrompt(e.target.value);
                }}
              ></textarea>
              <div className="flex-row justify-end self-stretch">
                <div className="flex-row gap-xs items-center">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCanceling(false);
                    }}
                    className="button-tertiary-white"
                    type="button"
                  >
                    Undo
                  </button>
                  <button
                    type="submit"
                    className={"button-primary bg-error"}
                    onClick={(e) => {
                      e.preventDefault();
                      cancelSubscription();
                      setCanceling(false);
                    }}
                  >
                    Cancel plan
                  </button>
                </div>
              </div>
            </div>
          </Popup>
        </>
      )}
    </div>
  );
};

export const BillsParagraph = connect(
  mapStateToProps,
  mapDispatchToProps
)(Bills);
