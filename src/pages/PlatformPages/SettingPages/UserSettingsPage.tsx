import React, { useEffect } from "react";
import { Button, Divider } from "src/components";
import { SwitchButton } from "src/components/Buttons";
import { TextInput } from "src/components/Inputs";
import { PageContent, PageParagraph } from "src/components/Sections";
import { TitleStaticSubheading } from "src/components/Titles";
import { setTheme } from "src/store/actions/themeAction";
import { useForm } from "react-hook-form";
import { updateUser, dispatchNotification } from "src/store/actions";
import { RootState } from "src/types";
import { useTypedDispatch, useTypedSelector } from "src/store/store";

export const UserSettings = () => {
  const dispatch = useTypedDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const theme = useTypedSelector((state: RootState) => state.theme.theme);
  const user = useTypedSelector((state: RootState) => state.user);
  const [firstName, setFirstName] = React.useState(user.first_name || "");
  const [lastName, setLastName] = React.useState(user.last_name || "");
  React.useEffect(() => {
    setFirstName(user.first_name);
    setLastName(user.last_name);
  }, [user]);
  const handleSwitchCheckedChange = (checked) => {
    dispatch(setTheme(checked ? "dark" : "light"));
  };
  const onSubmit = (data) => {
    if (
      firstName === "" ||
      lastName === "" ||
      (lastName === user.first_name && lastName === user.last_name)
    ) {
      return;
    }
    console.log(data);
    dispatch(updateUser({ first_name: firstName, last_name: lastName }));
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  return (
    <PageContent title="User Settings" subtitle="Manage your user profile.">
      <PageParagraph heading="Profile">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-col items-start gap-xs "
        >
          <TextInput
            title="Email"
            type="email"
            disabled
            value={user.email || ""}
          />
          <div className="flex self-stretch gap-xs items-center">
            <TextInput
              title="First Name"
              placeholder="Enter your first name"
              value={firstName}
              {...register("first_name", {
                minLength: 1,
                value: firstName,
                onChange: handleFirstNameChange,
              })}
            />
            <TextInput
              title="Last Name"
              placeholder="Enter your last name"
              value={lastName}
              {...register("last_name", {
                minLength: 1,
                value: lastName,
                onChange: handleLastNameChange,
              })}
            />
          </div>
          <Button text="Update" variant="r4-primary" />
        </form>
      </PageParagraph>
      <Divider />
      <div className="flex items-start self-stretch justify-between">
        <TitleStaticSubheading
          title="Dark theme"
          subtitle={"Enable dark theme across the platform."}
        />
        <SwitchButton
          checked={theme === "dark"}
          onCheckedChange={handleSwitchCheckedChange}
        />
      </div>
    </PageContent>
  );
};
