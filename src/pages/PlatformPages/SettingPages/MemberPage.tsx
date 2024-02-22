import React from "react";
import { MemberCard } from "src/components/Cards/MemberCard";
import { PageContent, PageParagraph } from "src/components/Sections";
import { Button } from "src/components/Buttons";
import { Modal } from "src/components/Dialogs";
import { AddMemberForm } from "./components/MemberForms";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { RootState } from "src/types";
import { deleteRole } from "src/store/actions";

export const MemberPage = () => {
  const organization = useTypedSelector(
    (state: RootState) => state.organization
  );
  const user = useTypedSelector((state: RootState) => state.user);
  const [open, setOpen] = React.useState(false);
  const [members, setMembers] = React.useState(organization?.users || []);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  React.useEffect(() => {
    setMembers(organization?.users || []);
  }, [organization?.users]);
  const isOwner = user.organization_role.user.id === organization?.owner.id;
  return (
    <PageContent
      title={"Members"}
      subtitle={"Manage your organization members."}
    >
      <PageParagraph heading={"Users"}>
        <div className="flex-row flex-wrap gap-md">
          {members.map((member, index) => {
            return <MemberCard key={index} {...member} />;
          })}
        </div>
        {user.is_organization_admin && (
          <Modal
            title={"Invite member"}
            subtitle={
              "Add team members with email. They'll receive an invite to join. "
            }
            open={open}
            setOpen={setOpen}
            trigger={<Button variant="r4-primary" text="Add member" />}
          >
            <AddMemberForm setOpen={setOpen} />
          </Modal>
        )}
        {/* <SelectInput /> */}
        {/* {!isOwner && (
          <Modal
            title={"Leave organization"}
            subtitle={"Are you sure you want to leave this organization?"}
            open={deleteModalOpen}
            setOpen={setDeleteModalOpen}
            trigger={<Button variant="r4-red" text="Leave organization" />}
            children={
              <DeleteModalForm
                setOpen={setDeleteModalOpen}
                roleId={user.organization_role.user.id}
                firstName={user?.first_name}
                lastName={user?.last_name}
              />
            }
          />
        )} */}
      </PageParagraph>
    </PageContent>
  );
};

type DeleteModalProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  roleId: number | null;
  firstName: string;
  lastName: string;
};
const DeleteModalForm = ({
  setOpen,
  roleId,
  firstName,
  lastName,
}: DeleteModalProps) => {
  const dispatch = useTypedDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(deleteRole(roleId));
    setOpen(false); // Submit action reloads the modal, closing it as a result
  };
  if (!roleId) {
    return null;
  }
  return (
    <form
      className={"flex-col gap-sm self-stretch relative"}
      onSubmit={handleSubmit}
    >
      <div className="flex-row justify-end self-stretch">
        <div className="flex-row gap-xs">
          <Button
            variant="r4-black"
            bgColor="transparent"
            text={"Cancel"}
            type="button"
            onClick={(e: any) => setOpen(false)}
          />
          <Button variant="r4-red" text={`Leave`} />
        </div>
      </div>
    </form>
  );
};
