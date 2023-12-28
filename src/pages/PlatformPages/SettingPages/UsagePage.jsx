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
      subtitle="Manage and track your API usage."
    >
      <PageParagraph 
      heading="Spendings"
      subheading="Below you'll find a summary of API usage for your organization. All dates and times are UTC-based, and data may be delayed up to 5 minutes."
      >
        <UsageChart
          dataKeyX={"name"} dataKeyY="usage"
        />
        <div className='flex flex-col justify-center items-start gap-xxs self-stretch'>
          <span className='text-md-medium'>
            Credits
          </span>
          <span className='text-sm-regular text-gray-4'>
          Initial token credit assignment based on your plan. You will be charged usage-based only after using all your credits.
          </span>
        </div>
        <ProgressBar
          name={"Free trial"}
          progressLegend={"Used"}
          remainLegend={"Credits remaining"}
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
