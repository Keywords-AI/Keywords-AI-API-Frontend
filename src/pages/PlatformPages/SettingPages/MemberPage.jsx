import React from 'react'
import { connect } from 'react-redux'
import { MemberCard } from 'src/components/Cards/MemberCard'
import { PageContent } from 'src/components/Sections'
import { TitleStaticHeading } from 'src/components/Titles'

export const MemberPage = (props) => {
  return (
    <PageContent>
      <TitleStaticHeading
        title={"Members"}
        subtitle={"Manage your organization members."}
      />
      <MemberCard first_name="John" last_name="Doe" />
    </PageContent>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MemberPage)