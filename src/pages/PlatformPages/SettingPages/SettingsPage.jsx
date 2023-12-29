import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PageContent, PageParagraph } from "src/components/Sections";
import usePost from "src/hooks/usePost";
import { TextInput, CopyInput } from "src/components/Inputs";
import { Button } from "src/components/Buttons";
import { set, useForm } from "react-hook-form";
import { setOrgName } from "src/store/actions";
import { dispatchNotification } from "src/store/actions";

const mapStateToProps = (state) => ({
  organization: state.organization,
});

const mapDispatchToProps = {
  setOrgName,
  dispatchNotification,
};

export const SettingPage = ({
  organization,
  setOrgName,
  dispatchNotification,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }, //form errors
  } = useForm();
  const [currName, setCurrName] = React.useState(organization?.name);
  useEffect(() => {
    setCurrName(organization.name);
  }, [organization.name]);
  const { loading, error, data, postData } = usePost({
    path: `user/update-organization/${organization?.id}/`,
    method: "PATCH",
  });
  const onSubmit = (data) => {
    if (currName != organization.name) {
      setOrgName(data.name || organization.name);
      postData(data); // send request
    }
  };
  useEffect(() => {
    console.log("sdasad")
    if (data && !error) {
      dispatchNotification({
        title: "Organization name updated",
        type: "success",
      });
    }
  }, [error, data]);
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
            // value={"locked-text"}
            disabled={true}
          />
          <Button type="submit" text="Update" variant="r4-primary" />
        </form>
      </PageParagraph>
      {/* <PageParagraph
                heading="Delete organization"
                subheading="If you want to permanently delete this organization and all of its data, you can do so below."
            >
                <Button
                    text="Delete this organization"
                    variant="r4-black"
                />
            </PageParagraph> */}
    </PageContent>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);
