import React from 'react'
import { connect } from 'react-redux'
import PageContent from 'src/components/Sections/PageContent';
import usePost from 'src/hooks/usePost';
import { TitleStaticHeading } from 'src/components/Titles'
import { TextInput } from 'src/components/Inputs';
import { Button } from 'src/components/Buttons';

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
        <PageContent>
            <TitleStaticHeading
                title="Organization Settings"
                subtitle="Manage your organization name and ID."
            />
            <form className="flex-col gap-lg items-start self-stretch"
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target;
                    const organization_name = form.organization_name.value;
                    patchData({ name: organization_name });

                }}
                ref={formRef}
            >
                {/* <div className="flex-col gap-xxs items-start self-stretch">
                    <div className="t-medium">
                        Organization Name
                    </div>
                    <div className="text-md">
                        Human-friendly label for your organization, shown in user interfaces.
                    </div>
                    <div className="form-fields">
                        <input
                            type="text"
                            className={"text-md" + " " + (user?.organization_role?.name === "owner" ? "" : "bg-gray2")}
                            onChange={handleInputChange}
                            value={organization?.name || "default organization"}
                            name="organization_name" placeholder="Organization Name"
                            readOnly={!user?.organization_role?.name === "owner"}
                        />
                    </div>
                </div> */}
                <TextInput
                    name="Organization Name"
                />
                {/* <div className="flex-col gap-xxs items-start self-stretch">
                    <div className="t-medium">
                        Organization ID
                    </div>
                    <div className="text-md">
                        Identifier for this organization sometimes used in API requests.
                    </div>
                    <div className="form-fields">
                        <input type="text" readOnly className="text-md bg-gray text-gray3" placeholder="Oranization ID" value={organization?.unique_organization_id || "Join or create an organization to retrive this ID"} />
                    </div>
                </div> */}
                <TextInput
                    name="Organization ID - identifier sometimes used in API requests."
                />
                {
                // user?.organization_role?.name === "owner" 
                true
                ?
                    <Button
                        text="Update"
                        variant="r4-primary"
                    />
                    :
                    <div className="text-gray4 text-md">
                        Only owner can edit organization name
                    </div>
                }
            </form>
        </PageContent>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage)