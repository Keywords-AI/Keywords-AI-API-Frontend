import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider } from "src/components";
import { SwitchButton } from "src/components/Buttons";
import { TextInput } from "src/components/Inputs";
import { PageContent, PageParagraph } from "src/components/Sections";
import { TitleStaticSubheading } from "src/components/Titles";
import { setTheme } from "src/store/actions/themeAction";
import { useForm } from "react-hook-form";
export default function UserSettings() {
  const theme = useSelector((state) => state.theme.theme);
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
    console.log(errors);
    console.log(data);
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
            placeholder="abc@example.com"
            {...register("email", { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
          />
          <div className="flex self-stretch gap-xs items-center">
            <TextInput
              title="First Name"
              placeholder="First Name"
              {...register("firstname", {
                pattern: /^[a-zA-Z]+$/,
                minLength: 1,
              })}
            />
            <TextInput
              title="Last Name"
              placeholder="Last Name"
              {...register("lastname", {
                pattern: /^[a-zA-Z]+$/,
                minLength: 1,
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
}
