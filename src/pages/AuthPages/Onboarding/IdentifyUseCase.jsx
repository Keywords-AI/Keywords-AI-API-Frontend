import React from 'react'
import { connect } from 'react-redux'

export const IdentifyUseCase = (props) => {
  return (
    <div>IdentifyUseCase</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(IdentifyUseCase)