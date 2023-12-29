import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { SettingTable } from 'src/components/Tables'
import { Button } from 'src/components/Buttons'
import { Search } from 'src/components/Icons'
import { PageContent, PageParagraph } from 'src/components/Sections'
import { processBillingList } from 'src/utilities/objectProcessing'
import useFetch from 'src/hooks/useFetch'
import { CanelPlanForm } from './components/BillingComponents'
import { Modal } from 'src/components/Dialogs'
import { setBillings } from 'src/store/actions'

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
  )
}

export const BillingPage = ({ billings }) => {
  // Fetching action is handled in PanelNavigation.jsx
  const [bilingData, setBillingData] = React.useState([]);
  const [canceling, setCanceling] = React.useState(false);
  useEffect(() => {
    if (billings) {
      setBillingData(processBillingList(billings, viewBillTrigger));
    }
  }, [billings]);

  return (
    <PageContent
      title="Billing"
      subtitle="Manage your billing information and invoices. For questions about billing, contact team@keywordsai.co."
    >
      <PageParagraph
        heading="Payment history"
        subheading={((bilingData?.length > 0) ? "You can see your payment history below. For questions about billing, contact team@keywordsai.co." : "There are no invoices to display.")}
      >
        {(bilingData?.length > 0) && <SettingTable
          variant={"billings"}
          rows={bilingData}
          columnNames={["date", "amount", "payment_id", "actions"]}
        />}
        {false && <Modal
          title="Cancel your plan"
          subtitle="We’re sorry to see you cancel your plan. To help us improve, please help us understand the reason."
          trigger={<Button variant="r4-black" text="Cancel plan" />}
          open={canceling}
          setOpen={setCanceling}
        >
          <CanelPlanForm setCanceling={setCanceling} />
        </Modal> }
      </PageParagraph>
    </PageContent>
  )
}

const mapStateToProps = (state) => ({
  billings: state.billings,
})

const mapDispatchToProps = {
  setBillings
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingPage)