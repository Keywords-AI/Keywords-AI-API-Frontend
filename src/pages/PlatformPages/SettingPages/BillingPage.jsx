import React from 'react'
import { connect } from 'react-redux'
import { SettingTable } from 'src/components/Tables'
import { Button } from 'src/components/Buttons'
import { Search } from 'src/components/Icons'
import { getDateStr } from 'src/utilities/stringProcessing'
import { PageContent } from 'src/components/Sections'

export const BillingPage = (props) => {
  const testRows = [
    {
      date: getDateStr('2021-08-01'), amount: '$10', paymentId: '1234567890',
      action: <Button
        variant="small"
        text="View"
        icon={Search}
        iconSize="sm"
      />
    },
    {
      date: getDateStr('2021-08-01'), amount: '$10', paymentId: '1234567890',
      action: <Button
        variant="small"
        text="View"
        icon={Search}
        iconSize="sm"
      />
    },
  ]
  return (
    <PageContent
      title="Billing"
      subtitle="Manage your billing information and invoices. For questions about billing, contact team@keywordsai.co."
    >
      <SettingTable
        variant={"billings"}
        rows={testRows}
      />
    </PageContent>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BillingPage)