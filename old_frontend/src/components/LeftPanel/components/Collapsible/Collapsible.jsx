import React from "react";
import ModeOption from "./components/ModeOption/ModeOption";
import { ReactComponent as BetaIcon } from "./static/img/beta.svg";
import "./static/css/style.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    restartConversation,
    fetchConversation
} from "src/store/actions/chatbotActions/conversationAction";
import { connect } from "react-redux";
import chatbotURL from "src/utility/chatbotURL";

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = {
    restartConversation,
    fetchConversation,
};

function Collapsible({ open, user, restartConversation, fetchConversation }) {
    const [openOptions, setOpenOptions] = React.useState(true);
    const navigate = useNavigate();
    const { mode, model } = useParams();
    let modeOptions = [
        {
            title: "Career Development AI",
            description:
                "Ask the Career Development AI to help you optimize your resume, write a cover lette, and answer any questions you have about job search.",
            selected: mode === "careerscoach",
            urlEnding: "careerscoach",
            tag: null
        },
        {
            title: "Job Search AI",
            description:
                "Ask the Job Search AI to help you find relevant jobs openings, filter through job descriptions, and speed up your job search journey.",
            selected: mode === "careersgpt",
            urlEnding: "careersgpt",
            tag: <BetaIcon />
        }
    ];

    const handleClick = modeOption => {
        const mode = modeOption.urlEnding;
        const url = chatbotURL(model, mode);
        navigate(url);
        const userProfile = user && user.userprofile;
        if (userProfile) {
            const conversation_id = userProfile[`${mode}_conversation_id`];
            
            console.log("the fetching conversation_id", conversation_id);
            if (conversation_id !== -1) {
                fetchConversation(conversation_id);
            } else {
                restartConversation(conversation_id, mode);
            }
        }
    };

    return (
        <div className="collapsible-container">
            <div
                className="collapsible-header"
                // onClick={() => setOpenOptions(!openOptions)}
            >
                <span>Chat Mode</span>
                {/* <img
                    src={DownArrow}
                    alt="down arrow"
                    style={{
                        transform: openOptions
                            ? "rotate(0deg)"
                            : "rotate(180deg)",
                    }}
                /> */}
            </div>
            <div
                className="collapsible-body"
                style={{
                    display: openOptions ? "" : "none"
                }}
            >
                {modeOptions.map((modeOption, index) => {
                    return (
                        <ModeOption
                            key={index}
                            title={modeOption.title}
                            description={modeOption.description}
                            selected={modeOption.selected}
                            onClick={() => handleClick(modeOption)}
                            tag={modeOption.tag}
                        />
                    );
                })}

                {/* <ModelSelection /> */}
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Collapsible);
