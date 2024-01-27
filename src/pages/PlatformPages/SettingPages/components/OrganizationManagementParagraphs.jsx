import React from 'react'
import { connect } from 'react-redux'
import useFetch from 'src/hooks/useFetch'
import KeywordsSelection from 'src/components/KeywordsSelection/KeywordsSelection'
import { Avatar } from 'src/assets/svgs'
import usePost from 'src/hooks/usePost'
import { firstNameInitial } from 'src/utilities/utilities'
import { deleteRole } from 'src/store/actions/authAction'

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  deleteRole,
}

function MemberManagement({ user, deleteRole }) {
  const [users, setUsers] = React.useState([]);
  const options = [
    { text: "owner" },
    { text: "admin" },
    { text: "member" },
  ];

  React.useEffect(() => {
    if (user?.organization?.id) {
      const organization = user?.organization;
      if (organization?.users?.length > 0) {
        setUsers(organization.users);
      }
    }
  }, [user])


  return (
    <>
      {users?.length > 0 &&
        <div className="flex-col items-start self-stretch"
          style={{
            paddingBottom: "1px solid var(--gray3)"
          }}
        >
          {users.map((listedUser, index) => (
            <div key={index} className="py-xs flex-row space-between self-stretch"
              style={{
                borderTop: "1px solid var(--gray3)",
                borderBottom: index !== users.length - 1 ? "" : "1px solid var(--gray3)",
              }}
            >
              <div className="flex-row gap-sm items-center">
                <div className="flex-row items-center justify-center text-white"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: listedUser?.profile_color || "var(--gray3)"
                  }}
                >
                  {firstNameInitial(listedUser?.last_name || "Anonymous")}
                </div>
                <div className="flex-col">
                  <div className="text-md t-medium">
                    {(listedUser?.first_name && listedUser?.last_name) ?
                      (listedUser?.first_name + " " + listedUser?.last_name) :
                      "No name"
                    }
                  </div>
                  <div className="text-sm text-gray4">
                    {listedUser?.email}
                  </div>
                </div>
              </div>
              <div className="flex-row space-between items-center" style={{ width: "300px" }}>
                {
                  listedUser?.role?.pending ? // to be updated to invitation pending
                    <div className="text-primary text-sm">
                      Invite pending
                    </div> : <div className="flex-col" style={{ width: "160px" }}>
                      <KeywordsSelection choices={options}
                        placeholder={listedUser?.role?.name}
                        readOnly={listedUser?.role?.name === "owner"}
                      />
                    </div>
                }
                {listedUser?.role?.name !== "owner" && <button className="button-error" //previous button was outdated, updated to button-error to highligh which button to be switched out
                  onClick={() => {
                    deleteRole(listedUser?.role?.id);
                    setUsers(users.filter(user => user.email !== listedUser?.email));
                  }}
                >
                  {listedUser?.email === user?.email ? "Leave" : "Delete"}
                </button>}
              </div>
            </div>
          ))}

        </div>}
    </>
  )
}

export const MemberManagementParagraph = connect(mapStateToProps, mapDispatchToProps)(MemberManagement)

const OrganizationSetting = ({ user }) => {
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
    <form className="flex-col gap-lg items-start self-stretch"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target;
        const organization_name = form.organization_name.value;
        patchData({ name: organization_name });

      }}
      ref={formRef}
    >
      <div className="flex-col gap-xxs items-start self-stretch">
        <div className="t-medium">
          Organization Name
        </div>
        <div className="text-md">
          Human-friendly label for your organization, shown in user interfaces.
        </div>
        <div className="form-fields">
          <input
            type="text"
            className={"text-md" + " " + (user?.organization_role?.name === "owner" ? "" : "bg-gray2") }
            onChange={handleInputChange}
            value={organization?.name || "default organization"}
            name="organization_name" placeholder="Organization Name"
            readOnly={!user?.organization_role?.name === "owner"}
          />
        </div>

      </div>
      <div className="flex-col gap-xxs items-start self-stretch">
        <div className="t-medium">
          Organization ID
        </div>
        <div className="text-md">
          Identifier for this organization sometimes used in API requests.
        </div>
        <div className="form-fields">
          <input type="text" readOnly className="text-md bg-gray text-gray3" placeholder="Oranization ID" value={organization?.unique_organization_id || "Join or create an organization to retrive this ID"} />
        </div>
      </div>
      {user?.organization_role?.name === "owner" ?
        <button className="button-error"> 
          Save
        </button>
        :
        <div className="text-gray4 text-md">
          Only owner can edit organization name
        </div>
      }
      <div style={{
        border: "1px solid black",
      }}>
        <button>
          Test this
        </button>
      </div>
    </form>
  )
}

export const OrganizationIDParagraph = connect(mapStateToProps, mapDispatchToProps)(OrganizationSetting)