import React from 'react'
import { connect } from 'react-redux'
import { TitleStaticHeading } from 'src/components/Titles'

/*
The content of page inside left navigation layout
*/

export const PageContent = ({ children, title, subtitle }) => {
  return (
    <div className="flex-col flex-1 self-stretch items-center gap-md overflow-auto py-lg pl-[60px] pr-[320px]">
      <TitleStaticHeading title={title} subtitle={subtitle} />
      {children}
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PageContent)