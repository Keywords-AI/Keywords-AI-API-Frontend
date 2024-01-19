import React from 'react'
import { connect } from 'react-redux'
import { MemberCard } from 'src/components/Cards/MemberCard'
import { PageContent, PageParagraph } from 'src/components/Sections'
import { Button } from 'src/components/Buttons'
import { Modal } from 'src/components/Dialogs'
import { AddMemberForm } from './components/MemberForms'
import { createSelector } from 'reselect'
import { useTypedSelector } from 'src/store/store'
import { RootState } from 'src/types'


export const MemberPage = () => {
  const organization = useTypedSelector((state: RootState) => state.organization)
  const [open, setOpen] = React.useState(false);
  const [members, setMembers] = React.useState(organization?.users || []);
  React.useEffect(() => {
    setMembers(organization?.users || []);
  }, [organization?.users]);
  return (
    <PageContent
      title={"Members"}
      subtitle={"Manage your organization members."}
    >
      <PageParagraph
        heading={"Users"}
      >
        <div className="flex-row flex-wrap gap-md">
          {members.map((member, index) => {
            return (
              <MemberCard key={index} {...member} />
            )
          })}
        </div>
        <Modal
          title={"Invite member"}
          subtitle={"Add team members with email. They'll receive an invite to join. "}
          open={open}
          setOpen={setOpen}
          trigger={<Button variant="r4-primary" text="Add member" />}
        >
          <AddMemberForm setOpen={setOpen} />
        </Modal>
        {/* <SelectInput /> */}
      </PageParagraph>
    </PageContent>
  )
}