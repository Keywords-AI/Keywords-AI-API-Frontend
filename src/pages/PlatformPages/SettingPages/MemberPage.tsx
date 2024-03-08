import React, { MouseEventHandler } from "react";
import { PageContent, PageParagraph } from "src/components/Sections";
import { AvatarButton, Button, DotsButton } from "src/components/Buttons";
import { Modal } from "src/components/Dialogs";
import { AddMemberForm } from "./components/MemberForms";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { OrgUser, RootState } from "src/types";
import { changeRole, deleteRole, sendInvitation } from "src/store/actions";
import { SelectInput } from "src/components/Inputs";
import cn from "src/utilities/classMerge";
import { Dots, Down } from "src/components";
import { capitalize } from "src/utilities/stringProcessing";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";

export const MemberPage = () => {
  const organization = useTypedSelector(
    (state: RootState) => state.organization
  );
  const user = useTypedSelector((state: RootState) => state.user);
  const [open, setOpen] = React.useState(false);
  const isFreeUser = useTypedSelector((state: RootState) => {
    return (state.organization?.organization_subscription?.plan_level || 0) < 2;
  });
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
        {user.is_organization_admin && !isFreeUser && (
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
          <Button variant="r4-red" text={`Remove`} />
        </div>
      </div>
    </form>
  );
};

const MembersTable = () => {
  const gridTemplateString = "240px 100px 1fr";
  const navigate = useNavigate();
  const members = useTypedSelector(
    (state: RootState) => state.organization?.users
  );
  const user = useTypedSelector((state: RootState) => state.user);
  const isFreeUser = useTypedSelector((state: RootState) => {
    if (
      !state.organization ||
      !state.organization?.organization_subscription?.plan_level
    )
      return false;
    return state.organization?.organization_subscription?.plan_level < 2;
  });
  const sortedMembers = [...(members || [])].sort((a, b) => {
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
        <div className="flex justify-end">
          {isFreeUser && (
            <Button
              variant="footer"
              text="Upgrade to invite team"
              padding="p-0"
              textColor="text-primary"
              onClick={() => {
                navigate("/platform/api/plans");
              }}
            />
          )}
        </div>
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
    currUser?.organization_role.role !== "owner" &&
    choices.push({
      name: "Leave organization",
      value: "leave",
      textColor: "text-error",
      onClick: () => {
        setDeleteModalOpen(true);
      },
    });
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex justify-end items-center gap-[10px] flex-1">
      {pending && (
        <p className="text-sm-regular text-primary text-center">Pending</p>
      )}
      {role !== "owner" && (
        <SelectInput
          open={open}
          setOpen={setOpen}
          headLess={true}
          choices={choices}
          disabled={role === "owner"}
          trigger={() => (
            <DotsButton
              icon={Dots}
              disabled={role === "owner"}
              onClick={() => setOpen((p) => !p)}
              active={open}
            />
          )}
          defaultValue={role}
          // Yeah, of course you cannot edit yourself
          placeholder={isOwner ? "Owner" : "Member"}
          align="end"
          sideOffset={4}
          alignOffset={0}
          // triggerProps={{
          //   first_name: user?.first_name,
          //   last_name: user?.last_name,
          //   pending: !isOwner && pending,
          //   disabled: isOwner || isSelf,
          //   isSelf,
          //   selected: isSelf ? "You" : capitalize(role),
          // }}
        />
      )}
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
    </div>
  );
};

export const RoleActions = ({ user, role, id, pending }: OrgUser) => {
  const currUser = useTypedSelector((state: RootState) => state.user);

  const dispatch = useTypedDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const isOwner = role === "owner";
  const selfRole = currUser.organization_role.role;
  // snake case for props spreading
  isOwner ? (pending = false) : null;

  let choices: any[] = [];
  if (role == "admin") {
    choices = [
      {
        name: "Admin",
        value: "admin",
        textColor: "text-gray-4 focus:text-gray-5",
        onClick: () => {
          dispatch(changeRole(id, "admin"));
        },
      },
      {
        name: "Member",
        value: "member",
        textColor: "text-gray-4 focus:text-gray-5",
        onClick: () => {
          dispatch(changeRole(id, "member"));
        },
      },
    ];
  } else if (role == "member") {
    if (selfRole === "owner" || selfRole === "admin") {
      choices = [
        {
          name: "Admin",
          value: "admin",
          textColor: "text-gray-4 focus:text-gray-5",
          onClick: () => {
            dispatch(changeRole(id, "admin"));
          },
        },
        {
          name: "Member",
          value: "member",
          textColor: "text-gray-4 focus:text-gray-5",
          onClick: () => {
            dispatch(changeRole(id, "member"));
          },
        },
      ];
    }
  }

  const isSelf = currUser?.email === user?.email;
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <SelectInput
        headLess={true}
        open={open}
        setOpen={setOpen}
        choices={choices}
        disabled={
          role === "owner" ||
          isSelf ||
          currUser.organization_role.role === "member"
        }
        trigger={(selected) => (
          <Button
            variant="text"
            text={capitalize(role)}
            active={open}
            icon={
              role === "owner" ||
              isSelf ||
              currUser.organization_role.role === "member"
                ? null
                : Down
            }
            iconPosition="right"
            disabled={
              role === "owner" ||
              isSelf ||
              currUser.organization_role.role === "member"
            }
            onClick={() => setOpen((p) => !p)}
          />
        )}
        defaultValue={role}
        // Yeah, of course you cannot edit yourself
        placeholder={isOwner ? "Owner" : "Member"}
        align="start"
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
