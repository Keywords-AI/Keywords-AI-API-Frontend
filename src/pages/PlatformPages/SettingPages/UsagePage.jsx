import React from 'react'
import { connect } from 'react-redux'
import { SelectInput } from 'src/components/Inputs'

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
    <div>
      <SelectInput placeholder={"Hi"} />
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UsagePage)
