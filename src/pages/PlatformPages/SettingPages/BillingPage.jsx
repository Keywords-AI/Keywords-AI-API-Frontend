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
import { setBillings } from 'src/store/actions/billingsAction'


export const BillingPage = ({ billings, setBillings }) => {
  const { data, error, loading } = useFetch({ path: "payment/paid-bills"});
  const [canceling, setCanceling] = React.useState(false);
  const viewBillTrigger = (item) => {
    return (
      <>
        <Button
          variant="small"
          text={"View"}
          icon={Search}
          onClick={() => window.open(item.hosted_invoice_url, "_blank")}
        />
      </>
    )
  }
  useEffect(() => {
    setBillings(processBillingList(data, viewBillTrigger));
  }, [data]);
  return (
    <PageContent
      title="Billing"
      subtitle="Manage your billing information and invoices. For questions about billing, contact team@keywordsai.co."
    >
      <PageParagraph
        heading="Payment history"
        subheading={loading ? "loading..." : ((billings?.length > 0) ? "You can see your payment history below. Click on View to see additional details." : "There are no invoices to display.")}
      >
        {(billings?.length > 0) && <SettingTable
          variant={"billings"}
          rows={billings}
          columnNames={["date", "amount", "payment_id", "actions"]}
        />}
        <Modal
          title="Cancel your plan"
          subtitle="We’re sorry to see you cancel your plan. To help us improve, please help us understand the reason."
          trigger={<Button variant="r4-red" text="Cancel plan" />}
          open={canceling}
          setOpen={setCanceling}
        >
          <CanelPlanForm setCanceling={setCanceling} />
        </Modal>
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