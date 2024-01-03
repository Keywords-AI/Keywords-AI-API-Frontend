import { Button } from "src/components/Buttons/Button";
import { BackButton } from "src/components/Buttons";
import { Left } from "src/components/Icons";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TitleAuth } from "src/components/Titles";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => { };
const mapDispatchToProps = {};
export const AcceptInvitation = connect(mapStateToProps, mapDispatchToProps)((
    {

    }
) => {
    const navigate = useNavigate();
    const { code } = useParams();
    return (
        <div className="flex-col items-center gap-xxxl justify-center self-stretch" >
            <div className=""></div>
            <div className="flex-col w-full max-w-[420px] items-center gap-md ">
                <TitleAuth
                    title="Accept Invitation"
                    subtitle="Click the button below to accept the invitation to your organization."
                    align="items-center"
                />
                <Button
                    text="Accept Invitation"
                    variant="r4-white"
                    width="w-full"
                    onClick={() => {
                        alert("accept invitation" + code)
                    }}
                />
            </div>
        </div >
    );
}
)