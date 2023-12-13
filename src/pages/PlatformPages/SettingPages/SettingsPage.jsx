import React from 'react'
import { connect } from 'react-redux'
import PageContent from 'src/components/Sections/PageContent';
import usePost from 'src/hooks/usePost';
import { TitleStaticHeading } from 'src/components/Titles'
import { TextInput } from 'src/components/Inputs';
import { Button } from 'src/components/Buttons';
import { Search } from 'src/components/Icons';

export const SettingPage = ({ user }) => {
    const { loading: updateLoading, error: updateError, data: updateData, postData: patchData } = usePost(`user/update-organization/${user?.organization?.id}/`, "PATCH");
    const [organization, setOrganization] = React.useState({});
    const formRef = React.useRef(null);

    React.useEffect(() => {
        if (user?.organization?.id) {
            setOrganization(user?.organization);
        }

    }, [user])

    const handleInputChange = (e) => {
        setOrganization({
            ...organization,
            name: e.target.value
        });
    };

    return (
        <PageContent
            title="Organization Settings"
            subtitle="Manage your organization name and ID."
        >
            <form className="flex-col gap-lg items-start self-stretch"
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target;
                    const organization_name = form.organization_name.value;
                    patchData({ name: organization_name });

                }}
                ref={formRef}
            >
                <TextInput
                    name="Organization Name"
                />
                <TextInput
                    name="Organization ID - identifier sometimes used in API requests."
                    type="text"
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
            <Button
                text="r4-black"
                variant="r4-black"
                icon={Search}
            />
            <Button
                text="r4-black"
                variant="r4-black"
                icon={Search}
            />
        </PageContent>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage)