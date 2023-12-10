import React from "react";
import { useNavigate } from "react-router-dom";

const NavButton = ({
  title,
  navigate,
  path,
  user,
  allowAll = false,
  comingSoon = false,
}) => {
  return (
    <button
      className={
        "button-header text-sm" +
        (window.location.pathname.includes(path) ? " text-primary" : "")
      }
      onClick={() => {
        if (user?.email || allowAll) navigate(path);
      }}
      style={{
        cursor: user?.email || allowAll ? "pointer" : "not-allowed",
      }}
      title={comingSoon ? "Coming Soon" : ""}
    >
      {title}
    </button>
  );
};

const platformButtons = [
  { title: "Documentation", path: "/platform/documentation", allowAll: true },
  { title: "Examples", path: "/platform/examples" },
  { title: "Playground", path: "/platform/playground" },
  { title: "Chatbot", path: "/platform/chatbot" },
  { title: "API Keys", path: "/platform/organization" },
];

export default function NavMiddle({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex-row justify-center items-center gap-xs self-stretch">
            {(window.location.pathname.split("/")[1] === "platform") ?
                // When user is logged in and is in platform
                <>
                    {platformButtons.map((button, index) => (
                        <NavButton
                            key={index}
                            navigate={navigate}
                            user={user}
                            {...button}

                        />
                    ))}
                </> :
                // When user is not logged in or is not in platform
                <>
                    <button className={"button-header text-sm "}
                        onClick={() => { navigate("/") }}
                    >Overview</button>
                    <button className={"button-header text-sm "}
                        onClick={() => { navigate("/pricing") }}
                    >Pricing</button>
                    <button className={"button-header text-sm "}
                        onClick={() =>
                            {
                                if (user?.email)
                                    navigate("/platform/overview")
                                else
                                    navigate("/login")
                            }}
                    >Platform</button>
                </>}
        </div>
    )
}
