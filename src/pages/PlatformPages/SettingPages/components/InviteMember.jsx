import React from "react";
import Popup from "src/components/Popup/Popup";
import { Plus } from "src/assets/svgs";
import KeywordsSelection from "src/components/KeywordsSelection/KeywordsSelection";
import { connect } from "react-redux";
import usePost from "src/hooks/usePost";
import { KeywordsInputWrapper } from "../../../components/KeywordsInputWrapper/KeywordsInputWrapper";

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {};

function InviteMember({ user }) {
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const roleRef = React.useRef("Member");
  const emailRef = React.useRef("");
  const { loading, error, data, postData } = usePost({
    path: `user/invitations/create/`
  });

  const handleInvite = () => {
    console.log("invite");
    if (!emailRef.current) {
      setErrors(["Please enter an email address."]);
      return;
    }
    if (!roleRef.current) {
      setErrors(["Please select a role."]);
      return;
    }
    if (!user?.organization?.id) {
      setErrors([
        "You are not a member of any organizations. Go to the settings page to create an organization.",
      ]);
      return;
    }
    postData({
      organization: user?.organization?.id,
      email: emailRef.current,
      role: roleRef.current,
    });
    // setOpen(false);
  };

  React.useEffect(() => {
    if (error) {
      setErrors([error]);
    }
  }, [error]);

  return (
    <>
      <button className="button-primary" onClick={() => setOpen(true)}>
        <Plus />
        {"Invite member"}
      </button>
      <Popup open={open} closePopup={() => setOpen(false)}>
        <div className="modal-card bg-white">
          <div className="display-xs">{"Invite Team"}</div>
          <div className="flex-row gap-xs items-center self-stretch">
            <div className="flex-col items-start gap-xxs flex-1  ">
              <div className="text-gray4 text-sm">{"Email"}</div>
              <input
                onChange={(e) => {
                  emailRef.current = e.target.value;
                }}
                type="email"
                className="input-primary"
                placeholder="Email address"
              />
            </div>
            <div
              className="flex-col items-start gap-xxs"
              style={{
                width: "160px",
              }}
            >
              <KeywordsInputWrapper title={"Role"}>
                <KeywordsSelection
                  choices={[{ text: "Admin" }]}
                  placeholder={"Member"}
                  handleSelected={(selected) => {
                    roleRef.current = selected.text;
                  }}
                />
              </KeywordsInputWrapper>
            </div>
          </div>
          {errors?.length > 0 &&
            errors.map((error, index) => (
              <div key={index} className="t-error text-sm">
                {error}
              </div>
            ))}
          <div className="flex-row self-stretch justify-end">
            <div className="flex-row gap-xs items-center">
              <button
                className="button-tertiary-white"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button className="button-primary" onClick={handleInvite}>
                Invite
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteMember);
