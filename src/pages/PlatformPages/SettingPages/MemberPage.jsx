import React from 'react'
import { connect } from 'react-redux'
import { MemberCard } from 'src/components/Cards/MemberCard'
import { PageContent, PageParagraph } from 'src/components/Sections'
import { Button } from 'src/components/Buttons'

export const MemberPage = (props) => {
  return (
    <PageContent
      title={"Members"}
      subtitle={"Manage your organization members."}
    >
      <PageParagraph
        heading={"Users"}
      >
        <div className="flex-row flex-wrap gap-md">
          <MemberCard first_name="John" last_name="Doe" />
          <MemberCard first_name="John" last_name="Doe" />
          <MemberCard first_name="John" last_name="Doe" />
          <MemberCard first_name="John" last_name="Doe" />
        </div>
        <Button variant="r4-primary" text="Add member" />
      </PageParagraph>
    </PageContent>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MemberPage)