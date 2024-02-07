import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PageContent, PageParagraph } from "src/components/Sections";
import usePost from "src/hooks/usePost";
import { TextInput, CopyInput, SelectInput } from "src/components/Inputs";
import { Button, SwitchButton } from "src/components/Buttons";
import { set, useForm } from "react-hook-form";
import { setOrgName, updateOrganization } from "src/store/actions";
import { dispatchNotification } from "src/store/actions";
import { Divider } from "src/components/Sections";
import { TitleStaticSubheading } from "src/components/Titles";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import userReducer from "src/store/reducers/userReducer";

const mapStateToProps = (state) => ({
  organization: state.organization,
  user: state.user,
});

const mapDispatchToProps = {
  setOrgName,
  updateOrganization,
  dispatchNotification,
};

export const SettingPage = ({
  user,
  organization,
  setOrgName,
  updateOrganization,
  dispatchNotification,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }, //form errors
  } = useForm();
  const [currName, setCurrName] = React.useState(organization?.name);
  useEffect(() => {
    if (organization?.name == null)
      dispatchNotification({
        title: "Organization name cannot be blank.",
        type: "error",
      });
    setCurrName(organization?.name);
  }, [organization?.name]);
  const onSubmit = (data) => {
    if (currName != organization?.name) {
      setOrgName(data.name || organization?.name);
      updateOrganization(data);
    }
  };

  const handleChange = (e) => {
    // setOrgName(e.target.value);
    setCurrName(e.target.value);
  };
  useEffect(() => {
    if (errors.name && !currName) {
      dispatchNotification({
        title: errors?.name?.message,
        type: "error",
      });
    }
  }, [errors]);
  return (
    <PageContent
      title="Organization Settings"
      subtitle="Manage your organization name and ID."
    >
      <PageParagraph heading="General">
        <form
          className="flex-col gap-sm items-start self-stretch"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            {...register("name", {
              onChange: handleChange,
              required: "Organization name cannot be blank.",
            })}
            title="Organization name"
            width="w-[400px]"
            value={currName || ""}
            placeholder="Enter your organization name..."
            disabled={!user.is_organization_admin}
          />
          <CopyInput
            name="unique_organization_id"
            title="Organization ID"
            value={organization?.unique_organization_id || ""}
            placeholder="Your organization ID"
            disabled={true}
            InfoBool={true}
            width="w-[400px]"
          />
          <Button type="submit" text="Update" variant="r4-primary" />
        </form>
      </PageParagraph>
      <Divider />
      <div className="flex items-start self-stretch justify-between">
        <TitleStaticSubheading
          title="Log history"
          subtitle={"Record and save user session logs."}
        />
        <SwitchButton
          checked={!organization?.disable_log}
          onCheckedChange={(checked) => {
            updateOrganization({ disable_log: !checked });
          }}
        />
      </div>
      <Divider />
      <div className="flex items-start self-stretch justify-between">
        <TitleStaticSubheading
          title="Auto-archive requests"
          subtitle={
            "Automatically archive old requests for the configured time period. Changes will apply within one day."
          }
        />
        <SwitchButton
          checked={!organization?.disable_log}
          onCheckedChange={(checked) => {
            updateOrganization({ disable_log: !checked });
          }}
        />
      </div>
      <SelectInput
        title="Auto-archive requests after"
        defaultValue={organization?.auto_archive_period || "day"}
        width="w-[248px]"
        optionsWidth="w-[248px]"
        choices={[
          { name: "1 day", value: "day" },
          { name: "1 week", value: "week" },
          { name: "1 month", value: "month" },
          { name: "1 year", value: "year" },
        ]}
      />
      <Divider />
    </PageContent>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);
