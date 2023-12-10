import React from "react";
import "./static/css/style.css";
import CheckBox from "./static/img/tick.svg";
import { connect } from "react-redux";

function ModeOption({ title, description, selected, onClick, tag }) {
    return (
        <div
            className={"model-option-choice-card"}
            style={{
                cursor: "pointer",
                background: selected ? "#191919" : ""
            }}
            onClick={onClick}
        >
            <div className="option-title">
                {selected ? (
                    <div className="checked-circle">
                        <img
                            style={{
                                width: "7.2px",
                                height: "auto"
                            }}
                            src={CheckBox}
                        ></img>
                    </div>
                ) : (
                    <div className="not-checked-circle"></div>
                )}
                <div className="option-title-text">
                    {title}
                    {tag && tag}
                </div>
            </div>
            <div className="option-description">{description}</div>
        </div>
    );
}

export default connect()(ModeOption);
