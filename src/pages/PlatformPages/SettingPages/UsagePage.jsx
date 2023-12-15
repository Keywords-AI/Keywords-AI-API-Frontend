import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PageContent } from 'src/components/Sections'
import { ProgressBar, UsageChart } from 'src/components/Display'
import { fetchUsageData } from 'src/store/actions/usageData'

export const UsagePage = ({ user, usageData, fetchUsageData }) => {
  const [keyList, setKeyList] = React.useState([]);
  const [currDate, setCurrDate] = React.useState(new Date());
  const customBundle = user?.custom_bundle;


  useEffect(() => {
    if (currDate)
      fetchUsageData(currDate.getMonth() + 1);
  }, [currDate]);

  useEffect(() => {
    fetchUsageData(currDate.getMonth() + 1);
  }, []);

  return (
    <PageContent
      title="Usage"
      subtitle="Below you'll find a summary of API usage for your organization. All dates and times are UTC-based, and data may be delayed up to 5 minutes."
    >
      <UsageChart data={usageData} dataKeyX={"name"} dataKeyY="usage" />
      <ProgressBar
        name={"Free Trial"}
        progressLegend={"Used"}
        remainLegend={"Credis Remaining"}
        progressColorClass={"bg-gray-white"}
        remainColorClass={"bg-gray-black"}
        current={30}
        total={100}
        unit={"$"}
      />
    </PageContent>
  )
}

const mapStateToProps = (state) => ({
  usageData: state.usageData,
  user: state.user,
})

const mapDispatchToProps = {
  fetchUsageData
}

export default connect(mapStateToProps, mapDispatchToProps)(UsagePage)
