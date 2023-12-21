import React from 'react'
import { connect } from 'react-redux'
import { TitleStaticHeading } from 'src/components/Titles'
import { Notifications } from 'src/components/Dialogs'

/*
The content of page inside left navigation layout
*/

export const PageContent = ({ children, title, subtitle, notifications }) => {
  return (
    <div className="flex-col flex-1 self-stretch items-start gap-md overflow-auto py-lg pl-[60px] pr-[320px]">
      <Notifications notifications={notifications} />
      <TitleStaticHeading title={title} subtitle={subtitle} />
      {children}
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PageContent)