import React from "react";
import "./static/css/style.css"
import { Arrow } from "src/assets/svgs";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        // your props here
        user: state.user,
    };
};

const mapDispatchToProps = {
};


const PlatformCard = ({ user, themeColor, title, text, icon, darkTheme, link, loginRequired }) => {
    const navigate = useNavigate();
    return (
        <div className="platform-card hover-cp"
            style={{
                boxShadow: `inset 0 0 0 1px ${themeColor}`,
                cursor: loginRequired && !user.email ? "not-allowed" : "pointer"

            }}
            onClick={() => {
                if (loginRequired && !user.email) {
                    alert("Please login to access this page")
                } else {
                    navigate(link)
                }
            }

            }
        >
            <div className="flex-row items-center justify-center"
                style={{
                    backgroundColor: themeColor,
                    width: "64px",
                    height: "64px",
                }}
            >
                {icon}
            </div>
            <div className="flex-col gap-xs items-start self-stretch">
                <div className="display-xs">{title}</div>
                <div className="text-md">{text}</div>
            </div>
            <Arrow fill={darkTheme} />
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatformCard);
