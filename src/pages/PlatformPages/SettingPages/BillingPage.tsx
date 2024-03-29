import React, { useEffect } from "react";
import { LineTable, SettingTable } from "src/components/Tables";
import { Button, DotsButton, IconButton } from "src/components/Buttons";
import { Info, Search } from "src/components/Icons";
import { PageContent, PageParagraph } from "src/components/Sections";
import {
  processBillingList,
  processBillingItem,
  processSubscription,
} from "src/utilities/objectProcessing";
import { CanelPlanForm } from "./components/BillingComponents";
import { Modal } from "src/components/Dialogs";
import { useNavigate } from "react-router-dom";
import { Divider } from "../../../components/Sections/Divider";
import { Billing, RootState } from "src/types";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import { TitleStaticSubheading } from "src/components/Titles";
import { setPanelData } from "src/store/actions";
import cn from "src/utilities/classMerge";
import Tooltip from "src/components/Misc/Tooltip";

export const viewBillTrigger = (item: any) => {
  // The complete stripe Invoice object
  return (
    <>
      <DotsButton
        icon={Search}
        iconSize="sm"
        className="w-[28px] h-[28px] p-0"
        onClick={() => window.open(item.hosted_invoice_url, "_blank")}
      />
    </>
  );
};

export const BillingPage = () => {
  // Fetching action is handled in PanelNavigation
  const billings = useTypedSelector((state) => state.billings.billings);
  const currentBilling = useTypedSelector(
    (state) => state.billings.currentBilling
  );
  const currentSubscription = useTypedSelector(
    (state) => state.billings.currentSubscription
  );
  const user = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();
  const [bilingData, setBillingData] = React.useState<Billing[]>([]);
  const organization = useTypedSelector((state) => state.organization);
  const [currentBillingData, setCurrentBillingData] =
    React.useState<Billing>(null); // [currentBilling, setCurrentBilling
  const [canceling, setCanceling] = React.useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (billings.length > 0) {
      setBillingData(processBillingList(billings, viewBillTrigger));
    }
    if (currentBilling) {
      setCurrentBillingData(
        processBillingItem(currentBilling, viewBillTrigger)
      );
    }
  }, [billings, currentBilling]);
  let expireDays = -1;
  const expireDateUTC = new Date(
    organization?.organization_subscription?.credits?.[0]?.expire_at
  );
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const expireDate = new Date(expireDateUTC.getTime() - timezoneOffset);
  if (expireDate) {
    if (expireDate < new Date()) {
      expireDays = -1;
    } else {
      const currentDate = new Date();
      const timeDifference = expireDate.getTime() - currentDate.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      expireDays = Math.max(daysDifference, -1);
    }
  }
  const totalAmount = organization?.organization_subscription?.credits?.length
    ? organization?.organization_subscription?.credits?.reduce(
        (acc, credit) => {
          if (
            credit.expire_at != null &&
            new Date(credit.expire_at) < new Date()
          )
            return acc;
          return acc + parseFloat(credit.amount.toFixed(2));
        },
        0.0
      )
    : null;

  return (
    <PageContent
      title="Billing"
      subtitle="Manage your billing information and invoices."
    >
      <PageParagraph
        heading="Available credits"
        subheading={`Credits expiring in ${
          expireDays > -1 ? expireDays : "0"
        } days.`}
      >
        <Tooltip
          side="right"
          sideOffset={-1}
          align="center"
          delayDuration={1}
          className="flex-col w-[280px] py-xs px-sm items-start gap-xs rounded-md outline outline-1 outline-gray-3 bg-gray-2 "
          content={
            <>
              <div className="flex justify-between items-center self-stretch ">
                <p className="text-sm-md text-gray-5">Total credits</p>
                <p className="text-sm-md text-gray-5">
                  {totalAmount != null ? "$" + totalAmount : "-"}
                </p>
              </div>

              {organization?.organization_subscription?.credits?.length > 0 &&
                organization?.organization_subscription?.credits?.map(
                  (credit, index) => {
                    if (
                      credit.expire_at &&
                      new Date(credit.expire_at) < new Date()
                    )
                      return null;
                    const daysUntil =
                      credit.expire_at == null
                        ? -1
                        : Math.ceil(
                            (new Date(credit.expire_at).getTime() -
                              new Date().getTime()) /
                              (1000 * 60 * 60 * 24)
                          );
                    return (
                      <div
                        key={index}
                        className="flex-col items-start gap-xxs self-stretch"
                      >
                        <div className="flex justify-between items-center self-stretch">
                          <div className="flex items-center gap-xxs">
                            <div
                              className={cn(
                                "w-[8px] h-[8px] rounded-[2px]",
                                daysUntil >= 0 ? "bg-red" : "bg-primary"
                              )}
                            />
                            <p className="caption text-gray-4">
                              {daysUntil >= 0
                                ? `Expiring in ${daysUntil} days`
                                : `Non-expiring`}
                            </p>
                          </div>
                          <p className="caption text-gray-4">
                            {credit.amount != null
                              ? "$" + credit.amount.toFixed(2)
                              : "-"}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
            </>
          }
        >
          <div className="flex items-center py-xxs px-xs gap-xxs rounded-sm bg-gray-2 cursor-pointer">
            <span className=" text-gray-5 text-sm-md">
              {totalAmount != null
                ? "$" + parseFloat(totalAmount).toFixed(2)
                : "-"}
            </span>
            <Info />
          </div>
        </Tooltip>
      </PageParagraph>
      <Divider />
      <PageParagraph
        heading="Current plan"
        subheading={
          <div className="flex-col items-start gap-xxs">
            {currentSubscription?.name ? (
              <p>{`${currentSubscription?.name} ${currentSubscription?.interval}`}</p>
            ) : (
              <p>Free</p>
            )}
            {currentSubscription?.amount ? (
              <p>{`${
                currentSubscription?.amount
              } per ${currentSubscription?.interval.toLowerCase()} - renews on ${
                currentSubscription?.renewal_date
              }`}</p>
            ) : (
              <p>$0 per month</p>
            )}
          </div>
        }
      >
        {user.is_organization_admin && (
          <Button
            variant="r4-primary"
            text="Update plan"
            onClick={() => navigate("/platform/api/plans")}
          />
        )}
      </PageParagraph>
      <Divider />
      {currentBillingData?.name && (
        <>
          <PageParagraph heading="Billing details">
            <div className="flex-col items-start gap-xxs flex-1 self-stretch">
              <div className="flex items-center gap-md  ">
                <p className="flex text-sm-md text-gray-5 w-[40px]">Name</p>
                <p className="flex text-sm-regular text-gray-4">
                  {currentBillingData?.name}
                </p>
              </div>
              <div className="flex items-center gap-md flex-1 self-stretch">
                <p className="flex text-sm-md text-gray-5 w-[40px]">Email</p>
                <p className="flex text-sm-regular text-gray-4">
                  {currentBillingData?.email}
                </p>
              </div>
            </div>
            <Button
              variant="r4-gray-2"
              text="Edit"
              onClick={
                () =>
                  window.open(
                    `https://billing.stripe.com/p/login/00g6oWaA61O62Gs000?prefilled_email=${
                      currentBillingData?.email ?? ""
                    }`,
                    "_blank"
                  )
                // "https://billing.stripe.com/p/login/00g6oWaA61O62Gs000?prefilled_email=${}",
                // "_blank"
                // )
              }
              className="w-[60px] h-[36px]"
            />
          </PageParagraph>
          <Divider />
        </>
      )}
      <PageParagraph
        heading="Payment history"
        subheading={
          bilingData?.length > 0 ? (
            <span>
              You can see your payment history below. For questions about
              billing, contact{" "}
              <a
                className="text-primary cursor-pointer hover:text-primary-2"
                href="mailto:team@keywordsai.co"
              >
                team@keywordsai.co
              </a>
              .
            </span>
          ) : (
            "There are no invoices to display."
          )
        }
      >
        {bilingData?.length > 0 && (
          <LineTable
            variant={"billings"}
            rows={bilingData}
            headers={["Date", "Amount", "Payment ID"]}
            columnNames={["date", "amount", "payment_id"]}
          />
        )}
        {false && (
          <Modal
            title="Cancel your plan"
            subtitle="We’re sorry to see you cancel your plan. To help us improve, please help us understand the reason."
            trigger={<Button variant="r4-gray-2" text="Cancel plan" />}
            open={canceling}
            setOpen={setCanceling}
          >
            <CanelPlanForm setCanceling={setCanceling} />
          </Modal>
        )}
      </PageParagraph>
    </PageContent>
  );
};
