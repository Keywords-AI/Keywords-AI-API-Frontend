import React, { useEffect } from "react";
import { connect } from "react-redux";
import { SettingTable } from "src/components/Tables";
import { Button } from "src/components/Buttons";
import { Search } from "src/components/Icons";
import { PageContent, PageParagraph } from "src/components/Sections";
import { processBillingList } from "src/utilities/objectProcessing";
import useFetch from "src/hooks/useFetch";
import { CanelPlanForm } from "./components/BillingComponents";
import { Modal } from "src/components/Dialogs";
import { setBillings } from "src/store/actions";
import { useNavigate } from "react-router-dom";
import { Divider } from "../../../components/Sections/Divider";

export const viewBillTrigger = (item) => {
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

export const BillingPage = ({ billings }) => {
  // Fetching action is handled in PanelNavigation.jsx
  const [bilingData, setBillingData] = React.useState([]);
  const [canceling, setCanceling] = React.useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (billings) {
      setBillingData(processBillingList(billings, viewBillTrigger));
    }
  }, [billings]);

  return (
    <PageContent
      title="Billing"
      subtitle="Manage your billing information and invoices."
    >
      {/*Comment out this for now 1/18/2023  -- Raymond*/}
      <PageParagraph
        heading="Current plan"
        subheading={
          <span>
            Team Monthly
            <br />
            $39 per month - renews on January 11, 2024.
          </span>
        }
      >
        <Button
          variant="r4-gray2"
          text="Update plan"
          onClick={() => navigate("/platform/api/plans")}
        />
      </PageParagraph>
      <Divider />
      <PageParagraph heading="Billing details">
        <div className="flex-col items-start gap-xxs">
          <div className="flex items-center gap-md">
            <p className="text-sm-md text-gray-5">Name</p>
            <p className="text-sm-regular text-gray-4">hehe</p>
          </div>
          <div className="flex items-center gap-md">
            <p className="text-sm-md text-gray-5">Email</p>
            <p className="text-sm-regular text-gray-4">email@example.com</p>
          </div>
        </div>
        <Button
          variant="r4-gray2"
          text="Edit"
          onClick={() => navigate("plans")}
        />
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
          <SettingTable
            variant={"billings"}
            rows={bilingData}
            columnNames={["date", "amount", "payment_id", "actions"]}
          />
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

const mapStateToProps = (state) => ({
  billings: state.billings.billings,
});

const mapDispatchToProps = {
  setBillings,
};

export default connect(mapStateToProps, mapDispatchToProps)(BillingPage);
