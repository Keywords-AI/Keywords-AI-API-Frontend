import React from 'react'
import { connect } from 'react-redux'
import { SettingTable } from 'src/components/Tables'
import { Button } from 'src/components/Buttons'
import { Search } from 'src/components/Icons'
import { getDateStr } from 'src/utilities/stringProcessing'

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
    <div>
      <SettingTable
        variant={"billings"}
        rows={testRows}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BillingPage)