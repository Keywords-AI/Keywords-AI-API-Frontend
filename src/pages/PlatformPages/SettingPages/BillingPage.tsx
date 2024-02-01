import React, { useEffect } from "react";
import { SettingTable } from "src/components/Tables";
import { Button } from "src/components/Buttons";
import { Search } from "src/components/Icons";
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

export const viewBillTrigger = (item: any) => {
  // The complete stripe Invoice object
  return (
    <>
      <Button
        variant="small"
        text={"View"}
        icon={Search}
        iconSize="sm"
        onClick={() => window.open(item.hosted_invoice_url, "_blank")}
      />
    </>
  );
};

export const BillingPage = () => {
  // Fetching action is handled in PanelNavigation.jsx
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

  return (
    <PageContent
      title="Billing"
      subtitle="Manage your billing information and invoices."
    >
      <PageParagraph heading="Available credits">
        <span className="text-md-medium text-gray-5">$86.99</span>
      </PageParagraph>
      <Divider />
      <PageParagraph
        heading="Current plan"
        subheading={
          <div className="flex-col items-start gap-xxs">
            <p>{`${currentSubscription?.name} ${currentSubscription?.interval}`}</p>
            <p>{`${
              currentSubscription?.amount
            } per ${currentSubscription?.interval.toLowerCase()} - renews on ${
              currentSubscription?.renewal_date
            }`}</p>
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
        {/* <Button
          variant="r4-gray2"
          text="Edit"
          onClick={() => navigate("plans")}
        /> */}
      </PageParagraph>
      <Divider />
      <PageParagraph
        heading="Payment history"
        subheading={
          bilingData?.length > 0
            ? "You can see your payment history below. For questions about billing, contact team@keywordsai.co."
            : "There are no invoices to display."
        }
      >
        {bilingData?.length > 0 && (
          <SettingTable variant={"billings"} rows={bilingData} />
        )}
        {false && (
          <Modal
            title="Cancel your plan"
            subtitle="We’re sorry to see you cancel your plan. To help us improve, please help us understand the reason."
            trigger={<Button variant="r4-black" text="Cancel plan" />}
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
