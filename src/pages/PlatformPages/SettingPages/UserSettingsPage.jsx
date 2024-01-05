import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider } from "src/components";
import { SwitchButton } from "src/components/Buttons";
import { TextInput } from "src/components/Inputs";
import { PageContent, PageParagraph } from "src/components/Sections";
import { TitleStaticSubheading } from "src/components/Titles";
import { setTheme } from "src/store/actions/themeAction";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { updateUser } from "src/store/actions";

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = {
  updateUser,
};

export const UserSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ user, updateUser }) => {
  const theme = useSelector((state) => state.theme.theme);
  const [firstName, setFirstName] = React.useState(user.first_name || "");
  const [lastName, setLastName] = React.useState(user.last_name || "");
  React.useEffect(() => {
    if (user.first_name) setFirstName(user.first_name);
    if (user.last_name) setLastName(user.last_name);
  }, [user]);
  const distpatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSwitchCheckedChange = (checked) => {
    distpatch(setTheme(checked ? "dark" : "light"));
  };
  const onSubmit = async (data) => {
    if (
      data.first_name === "" ||
      data.last_name === "" ||
      (data.first_name === user.first_name && data.last_name === user.last_name)
    ) {
      return;
    }
    updateUser(data);
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
                pattern: /^[a-zA-Z0-9]+$/,
                minLength: 1,
                onChange: handleFirstNameChange,
              })}
            />
            <TextInput
              title="Last Name"
              placeholder="Enter your last name"
              value={lastName}
              {...register("last_name", {
                pattern: /^[a-zA-Z0-9]+$/,
                minLength: 1,
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
});
