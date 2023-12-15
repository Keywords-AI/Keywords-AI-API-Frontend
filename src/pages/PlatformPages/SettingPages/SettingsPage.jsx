import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { PageContent, PageParagraph } from 'src/components/Sections';
import usePost from 'src/hooks/usePost';
import { TextInput, CopyInput } from 'src/components/Inputs';
import { Button } from 'src/components/Buttons';
import { set, useForm } from 'react-hook-form';
import { setOrgName } from 'src/store/actions';


const mapStateToProps = (state) => ({
    organization: state.organization,
})

const mapDispatchToProps = {
    setOrgName,
}

export const SettingPage = ({ organization, setOrgName }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { loading, error, data, postData } = usePost(`user/update-organization/${organization?.id}/`, "PATCH");
    const formRef = React.useRef(null);
    const onSubmit = (data) => {
        setOrgName(data.name);
        postData(data); // send request
    }
    const handleChange = (e) => {
        setOrgName(e.target.value);
    };
    return (
        <PageContent
            title="Organization Settings"
            subtitle="Manage your organization name and ID."
        >
            <PageParagraph
                heading="General">
                <form className="flex-col gap-sm items-start self-stretch"
                    onSubmit={handleSubmit(onSubmit)}
                    ref={formRef}
                >
                    <TextInput
                        {...register("name", { required: true })}
                        title="Organization Name"
                        placeholder="Enter your organization name..."
                        value={organization?.name || ""}
                        onChange={handleChange}
                    />
                    <CopyInput
                        name="unique_organization_id"
                        title="Organization ID - identifier sometimes used in API requests."
                        value={organization?.unique_organization_id || ""}
                        disabled={true}
                        width="w-[400px]"
                    />
                    {
                        // user?.organization_role?.name === "owner" 
                        true
                            ?
                            <>
                                <Button
                                    text="Update"
                                    variant="r4-primary"
                                />
                            </>
                            :
                            <div className="text-gray4 text-md">
                                Only owner can edit organization name
                            </div>
                    }
                </form>
            </PageParagraph>
            <PageParagraph
                heading="Delete organization"
                subheading="If you want to permanently delete this organization and all of its data, you can do so below."
            >
                <Button
                    text="Delete this organization"
                    variant="r4-red"
                />
            </PageParagraph>
        </PageContent>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(SettingPage)