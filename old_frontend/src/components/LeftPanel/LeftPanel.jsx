import React from "react";
import Profile from "src/components/Profile/Profile";
import { connect } from "react-redux";
import { createConversation } from "src/store/actions/chatbotActions/conversationAction";
// The referral flag
import Collapsible from "./components/Collapsible/Collapsible";
import "./static/css/style.css";
import { useLocation } from "react-router-dom";

const mapDispatchToProps = {
    createConversation,
};

const LeftPanel = ({ open, setOpenPage }) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    return (
        <div className="panel-chat-mode"
            style={{
                width: !params.get("collapse") ? "" : "8px",
            }}
        >
            <div className="left-panel-top">
                <Collapsible open={open} /> 
            </div>
            <div className="left-panel-bottom">
                {!params.get("collapse") && <Profile setOpenPage={setOpenPage} />}
            </div>
        </div>
    );
};

export default connect(null, mapDispatchToProps)(LeftPanel);
