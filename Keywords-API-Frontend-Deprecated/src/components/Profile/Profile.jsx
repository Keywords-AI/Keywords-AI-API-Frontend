import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "src/store/actions/userAction";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {
  logout,
};

const Profile = React.forwardRef(
  ({ open, setOpen, user, logout, hover, setHover }, ref) => {
    const navigate = useNavigate();
    React.useEffect(() => {
      // console.log("open", open);
    }, [open]);
    React.useEffect(() => {
      // console.log("hover", hover);
    }, [hover]);

    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          event.target.id !== "profile-menu"
        ) {
          // console.log("outside");
          setOpen(false);
          setHover(false);
        }
      };
      const handleHoverOutside = (event) => {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          event.target.classList[0] != "platform-nav-bar"
        ) {
          console.log("hover outside");
          setHover(false);
        }
      };
      document.addEventListener("click", handleClickOutside);

      document.addEventListener("mouseover", handleHoverOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
        document.removeEventListener("mouseover", handleHoverOutside);
      };
    }, []);
    return (
      <>
        {(hover || open) && (
          <div
            className="flex-col flex-1  "
            ref={ref}
            id="profile-menu"
            style={{
              position: "absolute",
              right: "40px",
              top: user?.email ? "53px" : "61px",
              width: "280px",
              boxShadow: "0px 2px 4px 2px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div
              className="button-context-menu bg-white"
              style={{
                borderBottom: "1px solid var(--gray3)",
              }}
            >
              <div className="flex-col justify-start items-start self-stretch t-l">
                <div className="text-md t-medium">
                  {user?.first_name && user?.last_name
                    ? `${user?.first_name} ${user?.last_name}`
                    : "User"}
                </div>
                <div className="text-sm text-gray4">{user?.email}</div>
              </div>
            </div>
            <button
              className="button-context-menu text-gray4 text-sm bg-white"
              style={{
                borderBottom: "1px solid var(--gray3)",
              }}
            >
              Keywords AI
            </button>
            {user?.email ? (
              <>
                <button
                  className="button-context-menu text-sm"
                  onClick={() => {
                    setOpen(false);
                    setHover(false);
                    navigate("/platform/organization/api-keys");
                  }}
                >
                  View API keys
                </button>
                <button
                  className="button-context-menu text-sm"
                  style={{
                    borderBottom: "1px solid var(--gray3)",
                  }}
                  onClick={() => {
                    setOpen(false);
                    setHover(false);
                    navigate("/platform/organization/billing");
                  }}
                >
                  Billing
                </button>
                <button
                  className="button-context-menu text-sm"
                  onClick={() => {
                    setOpen(false);
                    setHover(false);
                    window.location.href = "mailto:team@keywordsai.co";
                  }}
                >
                  Help
                </button>

                <button
                  className="button-context-menu text-sm"
                  onClick={() => {
                    setOpen(false);
                    setHover(false);
                    logout();
                  }}
                >
                  Log out
                </button>

                {user.is_admin && (
                  <>
                    <button
                      className="button-context-menu text-sm"
                      onClick={() => {
                        setOpen(false);
                        setHover(false);
                        window.location.href =
                          "/admin-panel-for-keywordsai-admin-users";
                      }}
                    >
                      Admin
                    </button>
                    <button
                      className="button-context-menu text-sm"
                      onClick={() => {
                        setOpen(false);
                        setHover(false);
                        navigate("/admin-shortcuts");
                      }}
                    >
                      Admin shortcuts
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <button
                  className="button-context-menu text-md"
                  onClick={() => {
                    setOpen(false);
                    setHover(false);
                    navigate("/");
                  }}
                >
                  Overview
                </button>
                <button
                  className="button-context-menu text-sm"
                  onClick={() => {
                    setHover(false);
                    setOpen(false);
                    navigate("/platform/pricing");
                  }}
                >
                  Upgrade plan
                </button>
                <button
                  className="button-context-menu text-sm"
                  onClick={() => {
                    setOpen(false);
                    setHover(false);
                    navigate("/login");
                  }}
                >
                  Log in
                </button>
              </>
            )}
          </div>
        )}
      </>
    );
  }
);

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(Profile);
