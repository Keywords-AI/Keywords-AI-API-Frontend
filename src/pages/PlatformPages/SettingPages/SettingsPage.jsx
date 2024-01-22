import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PageContent, PageParagraph } from "src/components/Sections";
import usePost from "src/hooks/usePost";
import { TextInput, CopyInput } from "src/components/Inputs";
import { Button } from "src/components/Buttons";
import { set, useForm } from "react-hook-form";
import { setOrgName, updateOrganization } from "src/store/actions";
import { dispatchNotification } from "src/store/actions";
import { Divider } from "src/components/Sections";


const mapStateToProps = (state) => ({
  organization: state.organization,
});

const mapDispatchToProps = {
  setOrgName,
  updateOrganization,
  dispatchNotification,
};

export const SettingPage = ({
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
      {/* <Divider /> */}
      {/* <PageParagraph
        heading="Delete organization"
        subheading="If you want to permanently delete this organization and all of its data, you can do so below."
      >
        <Button
          text="Delete this organization"
          variant="r4-gray2"
        />
      </PageParagraph> */}
    </PageContent>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);
