import React, { MouseEventHandler } from "react";
import { MemberCard } from "src/components/Cards/MemberCard";
import { PageContent, PageParagraph } from "src/components/Sections";
import { AvatarButton, Button, DotsButton } from "src/components/Buttons";
import { Modal } from "src/components/Dialogs";
import { AddMemberForm } from "./components/MemberForms";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { OrgUser, RootState } from "src/types";
import { changeRole, deleteRole, sendInvitation } from "src/store/actions";
import { TitleStaticSubheading } from "src/components/Titles";
import { SelectInput } from "src/components/Inputs";
import cn from "src/utilities/classMerge";
import { Dots, Down } from "src/components";
import { capitalize } from "src/utilities/stringProcessing";

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
  // const isOwner = user.organization_role.user.id === organization?.owner.id;
  return (
    <PageContent
      title={"Members"}
      subtitle={"Manage your organization members."}
    >
      <PageParagraph
        heading={"Manage members"}
        subheading={"Manage members and their permissions."}
      >
        {/* <div className="flex-row flex-wrap gap-md">
          {members.map((member, index) => {
            return <MemberCard key={index} {...member} />;
          })}
        </div> */}

        {/* 
        {!isOwner && (
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
        <MembersTable />
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

const MembersTable = () => {
  const gridTemplateString = "240px 100px 1fr";
  const dispatch = useTypedDispatch();
  const members = useTypedSelector(
    (state: RootState) => state.organization?.users
  );
  const user = useTypedSelector((state: RootState) => state.user);

  const sortedMembers = members?.sort((a, b) => {
    if (a.id === user.organization_role.id) return -1;
    if (b.id === user.organization_role.id) return 1;
    return 0;
  });

  return (
    <div aria-label="user table" className="flex-col w-[800px] items-start">
      <div
        aria-label="header"
        className="grid grid-cols-3 py-xs self-stretch shadow-border-b shadow-gray-2 bg-gray-1"
        style={{ gridTemplate: gridTemplateString }}
      >
        <div className="text-sm-md text-gray-4">User</div>
        <div className="text-sm-md text-gray-4">Role</div>
        <div></div>
      </div>
      {sortedMembers?.map((member, index) => {
        return (
          <div
            key={index}
            className="grid grid-cols-3 py-xxs  self-stretch"
            style={{ gridTemplate: gridTemplateString }}
          >
            <div className="flex-col items-start gap-xxxs">
              <div className="flex items-center gap-xxs text-sm-md text-gray-5 text-center">{`${member.user?.first_name} ${member.user?.last_name}`}</div>
              <div className="flex items-center gap-xxs text-gray-4 text-center caption">
                {member.user?.email}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex py-xxxs justify-center items-center gap-xxs text-sm-md text-gray-4 text-center">
                <RoleActions {...member} />
              </div>
            </div>
            <div className="flex items-center justify-end">
              <MemberActions {...member} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const MemberActions = ({ user, role, id, pending }: OrgUser) => {
  const currUser = useTypedSelector((state: RootState) => state.user);
  const organization = useTypedSelector(
    (state: RootState) => state.organization
  );
  const dispatch = useTypedDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const isOwner = role === "owner";
  // snake case for props spreading
  isOwner ? (pending = false) : null;
  const choices = pending
    ? [
        {
          name: "Invite again",
          value: "invite_again",
          onClick: () => {
            dispatch(
              sendInvitation(
                {
                  email: user?.email,
                  organization: organization?.id,
                  role: role,
                },
                undefined,
                true
              )
            );
          },
          textColor: "text-gray-4 focus:text-gray-5",
        },
      ]
    : [
        // {
        //     name: "Member", value: "member", textColor: "text-gray-4 focus:text-gray-5",
        //     onClick: () => {
        //         dispatch(changeRole(role.id, "member"));
        //     },
        // },
        // {
        //   name: "Admin",
        //   value: "admin",
        //   textColor: "text-gray-4 focus:text-gray-5",
        //   onClick: () => {
        //     dispatch(changeRole(id, "admin"));
        //   },
        // },
      ];

  const isSelf = currUser?.email === user?.email;
  !isSelf &&
    (currUser?.organization_role.role === "owner" ||
      currUser?.organization_role.role === "admin") &&
    choices.push({
      name: "Remove user",
      value: "remove",
      textColor: "text-error",
      onClick: () => {
        setDeleteModalOpen(true);
      },
    });

  isSelf &&
    currUser?.organization_role.role === "member" &&
    choices.push({
      name: "Leave organization",
      value: "leave",
      textColor: "text-error",
      onClick: () => {
        setDeleteModalOpen(true);
      },
    });

  const SelectionTrigger = ({
    first_name,
    last_name,
    selected,
    placeholder,
    disabled,
    pending = false,
    onClick = (e: any) => {},
  }) => {
    const handleClick: MouseEventHandler<HTMLDivElement> = (e: any) => {
      onClick(e);
    };
    const [hover, setHover] = React.useState(false);
    placeholder = pending ? "Pending" : placeholder;
    return (
      <div
        className={cn(
          "flex-row items-center gap-xs w-[240px]",
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        )}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleClick}
      >
        <div className="flex flex-col">
          <div className="flex-row gap-xxs items-center">
            <div className={cn("text-sm-md text-gray-4", pending && "")}>
              {selected || placeholder}
            </div>
            {!disabled && <Down active={hover} />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <SelectInput
        headLess={true}
        choices={choices}
        trigger={() => <DotsButton icon={Dots} />}
        defaultValue={role}
        // Yeah, of course you cannot edit yourself
        placeholder={isOwner ? "Owner" : "Member"}
        align="start"
        alignOffset={32}
        // triggerProps={{
        //   first_name: user?.first_name,
        //   last_name: user?.last_name,
        //   pending: !isOwner && pending,
        //   disabled: isOwner || isSelf,
        //   isSelf,
        //   selected: isSelf ? "You" : capitalize(role),
        // }}
      />
      <Modal
        title={"Remove member"}
        subtitle={"Are you sure you want to remove this member?"}
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        trigger={<></>}
        children={
          <DeleteModalForm
            setOpen={setDeleteModalOpen}
            roleId={id}
            firstName={user?.first_name}
            lastName={user?.last_name}
          />
        }
      />
    </>
  );
};

export const RoleActions = ({ user, role, id, pending }: OrgUser) => {
  const currUser = useTypedSelector((state: RootState) => state.user);
  const organization = useTypedSelector(
    (state: RootState) => state.organization
  );
  const dispatch = useTypedDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const isOwner = role === "owner";
  // snake case for props spreading
  isOwner ? (pending = false) : null;

  const choices: any[] = [];
  role === "admin"
    ? choices.push({
        name: "Member",
        value: "member",
        textColor: "text-gray-4 focus:text-gray-5",
        onClick: () => {
          dispatch(changeRole(id, "member"));
        },
      })
    : choices.push({
        name: "Admin",
        value: "admin",
        textColor: "text-gray-4 focus:text-gray-5",
        onClick: () => {
          dispatch(changeRole(id, "admin"));
        },
      });

  const isSelf = currUser?.email === user?.email;

  return (
    <>
      <SelectInput
        headLess={true}
        choices={choices}
        disabled={currUser?.organization_role.role === "owner" && isSelf}
        trigger={() => (
          <Button
            variant="text"
            text={capitalize(role)}
            icon={Down}
            iconPosition="right"
          />
        )}
        defaultValue={role}
        // Yeah, of course you cannot edit yourself
        placeholder={isOwner ? "Owner" : "Member"}
        align="start"
        alignOffset={32}
        // triggerProps={{
        //   first_name: user?.first_name,
        //   last_name: user?.last_name,
        //   pending: !isOwner && pending,
        //   disabled: isOwner || isSelf,
        //   isSelf,
        //   selected: isSelf ? "You" : capitalize(role),
        // }}
      />
      <Modal
        title={"Remove member"}
        subtitle={"Are you sure you want to remove this member?"}
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        trigger={<></>}
        children={
          <DeleteModalForm
            setOpen={setDeleteModalOpen}
            roleId={id}
            firstName={user?.first_name}
            lastName={user?.last_name}
          />
        }
      />
    </>
  );
};
