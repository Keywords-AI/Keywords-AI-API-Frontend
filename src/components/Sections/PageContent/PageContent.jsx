import React from 'react'
import { connect } from 'react-redux'


export const PageContent = ({ children }) => {
  return (
    <div className="flex-col flex-1 self-stretch items-center gap-md overflow-auto py-lg pl-[60px] pr-[320px]">
      {children}
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PageContent)