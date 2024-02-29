import { TextInput, SelectInput } from "src/components/Inputs";
import { Button } from "src/components/Buttons";
import { useForm } from "react-hook-form";
import { sendInvitation, dispatchNotification } from "src/store/actions";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import { RootState } from "src/types";

export const AddMemberForm = ({ setOpen = (open: boolean) => {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const organization = useTypedSelector(
    (state: RootState) => state.organization
  );
  const dispatch = useTypedDispatch();
  const onSubmit = async (data: any) => {
    if (!organization?.id) {
      dispatch(
        dispatchNotification({
          type: "error",
          title: "You need to create an organization first",
        })
      );
      return;
    }
    if (organization?.users?.find((user) => user.email === data.email)) {
      dispatch(
        dispatchNotification({
          type: "error",
          title: "This user is already a member of your organization",
        })
      );
      return;
    }
    dispatch(
      sendInvitation({ ...data, organization: organization.id }, () => {
        setOpen(false);
      })
    );
  };

  return (
    <form className="flex-col gap-md w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-row gap-xs self-stretch">
        <TextInput
          {...register("email")}
          title="Email"
          width="flex-grow"
          placeholder="example@example.com"
        />
        <SelectInput
          {...register("role")}
          title="Role"
          choices={[
            { name: "Admin", value: "admin" },
            { name: "Member", value: "member" },
          ]}
          placeholder="Member"
          defaultValue="member"
          width="w-[160px]"
        />
      </div>
      <div className="flex self-stretch">
        <TextInput
          {...register("message")}
          title="Message"
          width="flex-grow"
          placeholder={`You are invited to join ${organization?.name}.`}
        />
      </div>
      <div className="flex-row justify-end self-stretch">
        <div className="flex-row gap-xs">
          <Button
            variant="r4-black"
            text={"Cancel"}
            type="button"
            onClick={() => setOpen(false)}
          />
          <Button variant="r4-primary" text="Invite" />
        </div>
      </div>
    </form>
  );
};
