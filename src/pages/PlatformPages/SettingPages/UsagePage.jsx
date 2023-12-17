import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PageContent, PageParagraph } from 'src/components/Sections'
import { ProgressBar, UsageChart } from 'src/components/Display'
import { getUsageData } from 'src/store/actions'

const mapStateToProps = (state) => ({
  usage: state.usage,
  user: state.user,
})

const mapDispatchToProps = {
  getUsageData
}

export const UsagePage = ({ usage }) => {
  const creditsTotal = usage?.freeCredits?.creditsTotal;
  const creditsUsed = creditsTotal - usage?.freeCredits?.creditsRemaining;
  return (
    <PageContent
      title="Usage"
      subtitle="Below you'll find a summary of API usage for your organization. All dates and times are UTC-based, and data may be delayed up to 5 minutes."
    >
      <PageParagraph>
        <UsageChart
          dataKeyX={"name"} dataKeyY="usage"
        />
        <ProgressBar
          name={"Free Trial"}
          progressLegend={"Used"}
          remainLegend={"Credis Remaining"}
          progressColorClass={"bg-gray-white"}
          remainColorClass={"bg-gray-black"}
          current={creditsUsed}
          total={creditsTotal}
          display={(current, total) => `$${current} / $${total}`}
        />
      </PageParagraph>
    </PageContent>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UsagePage)
