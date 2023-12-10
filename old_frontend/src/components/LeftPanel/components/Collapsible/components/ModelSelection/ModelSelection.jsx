import React from "react";
import "./static/css/style.css";
import Arrow from "./static/img/arrow.svg";

export default function ModelSelection() {
    return (
            <div className="model-selection">
                <div className="dropdown-expandable">
                    <div className="selected-model">
                        <span>Version GPT-3.5</span>
                        <img src={Arrow} alt=""></img>
                    </div>
                </div>
            </div>
    );
}
