import React from 'react'
import { connect } from 'react-redux'

export const PanelApi = ({ children }) => {
  return (
    <div className="flex-col self-stretch w-[280px] py-lg pl-lg pr-md items-start gap-lg flex-shrink-0 bg-gray-2 border-r border-gray-3">
      {children}
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PanelApi)