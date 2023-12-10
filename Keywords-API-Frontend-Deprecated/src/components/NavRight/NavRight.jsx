import React from "react";
import { useNavigate } from "react-router-dom";
import Profile from "src/components/Profile/Profile";
import { Arrow, Avatar, Rocket, Bug } from "src/assets/svgs";
import { Menu } from "src/assets/svgs";

export default function NavRight({ user, windowSize }) {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const profileRef = React.useRef(null);
  const [unfold, setUnfold] = React.useState(false);

  return (
    <div className="nav-right flex-row items-center gap-xs">
      {windowSize < 768 && (
        <div>
          <div
            onClick={() => setProfileOpen(true)}
            style={{
              position: "relative",
            }}
          >
            <Menu />
          </div>
          <Profile
            open={profileOpen}
            setOpen={setProfileOpen}
            ref={profileRef}
            user={user}
          />
        </div>
      )}
      {windowSize > 768 && (
        <>
          {!user.email ? (
            <>
              <button
                className="button-header t-purple-dark text-sm"
                onClick={() => {
                  navigate("/pricing");
                }}
              >
                <Rocket fill="var(--purple-dark)" />
                Free trial
              </button>
              <button
                className="button-header text-sm "
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
              <button
                className="button-primary"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              {!user?.email ? (
                <button
                  className="button-header t-purple-dark text-sm"
                  onClick={() => navigate("/platform/pricing")}
                >
                  <Rocket fill="var(--purple-dark)" />
                  Free trial
                </button>
              ) : (
                <button
                  className="button-header t-purple-dark text-sm"
                  onClick={() => {
                    window.open(
                      "https://airtable.com/appVPjek12fgZXMaa/shrKnkYcon4XI14Px",
                      "_blank"
                    );
                  }}
                >
                  <Bug />
                  Bug report
                </button>
              )}
              <button
                id="profile-button"
                className="button-header text-sm flex-row gap-xxs hover-cp"
                style={{
                  color: "var(--primary, #4F299E)",
                  paddingRight: "0",
                }}
                onClick={() => setProfileOpen(true)}
                onMouseEnter={() => setHover(true)}
              >
                <Avatar />
                {user?.first_name}
              </button>
              <Profile
                open={profileOpen}
                setOpen={setProfileOpen}
                ref={profileRef}
                user={user}
                hover={hover}
                setHover={setHover}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
