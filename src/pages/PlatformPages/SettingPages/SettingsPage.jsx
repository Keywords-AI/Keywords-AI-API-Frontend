import React from 'react'
import { connect } from 'react-redux'
import { PageContent, PageParagraph } from 'src/components/Sections';
import usePost from 'src/hooks/usePost';
import { TextInput, CopyInput } from 'src/components/Inputs';
import { Button } from 'src/components/Buttons';
import { useForm } from 'react-hook-form';

export const SettingPage = ({ user }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { loading, error, data, postData } = usePost(`user/update-organization/${user?.organization?.id}/`, "PATCH");
    const [organization, setOrganization] = React.useState({});
    const formRef = React.useRef(null);

    React.useEffect(() => {
        if (user?.organization?.id) {
            setOrganization(user?.organization);
        }
    }, [user])

    const onSubmit = (data) => {
        postData(data); // send request
        
    }

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
                        {...register("organization_name", { required: true })}
                        title="Organization Name"
                        placeholder="Enter your organization name..."
                    />
                    <CopyInput
                        name="organization_id"
                        title="Organization ID - identifier sometimes used in API requests."
                        value="blablabla"
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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage)