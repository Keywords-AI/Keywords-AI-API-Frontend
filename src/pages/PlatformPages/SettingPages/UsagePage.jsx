import React from 'react'
import { connect } from 'react-redux'
import { SelectInput } from 'src/components/Inputs'
import { PageContent } from 'src/components/Sections'
import { ProgressBar } from 'src/components/Display'

export const UsagePage = (props) => {
  const options =
    [
      {
        name: "test",
        value: "test value"
      },
      {
        name: "test",
        value: "test value"
      },
      {
        name: "test",
        value: "test value"
      }
    ]
  return (
    <PageContent
      title="Usage"
      subtitle="Below you'll find a summary of API usage for your organization. All dates and times are UTC-based, and data may be delayed up to 5 minutes."
    >
      <div>
        <SelectInput placeholder={"Hi"} />
      </div>
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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UsagePage)
