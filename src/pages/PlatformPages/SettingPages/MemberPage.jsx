import React from 'react'
import { connect } from 'react-redux'
import { MemberCard } from 'src/components/Cards/MemberCard'
import { PageContent, PageParagraph } from 'src/components/Sections'
import { Button } from 'src/components/Buttons'
import { Modal } from 'src/components/Dialogs'
import { AddMemberForm } from './components/MemberForms'

const mapStateToProps = (state) => ({
  organization: state.organization,
})

const mapDispatchToProps = {

}

export const MemberPage = ({ organization, addMember }) => {
  const [open, setOpen] = React.useState(false);
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
        </div>
        <Modal
          title={"Invite member"}
          subtitle={"Add team members with email. They'll receive an invite to join. "}
          open={open}
          setOpen={setOpen}
          trigger={<Button variant="r4-primary" text="Add member" />}
        >
          <AddMemberForm setOpen={setOpen}/>
        </Modal>
      </PageParagraph>
    </PageContent>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(MemberPage)