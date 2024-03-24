import { Button } from "src/components/Buttons/Button";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TitleAuth } from "src/components/Titles";
import { useNavigate } from "react-router-dom";
import { BackButton } from "src/components/Buttons";
import { connect } from "react-redux";
import { acceptInvitation } from "src/store/actions";
import { REDIRECT_URI } from "src/utilities/navigation";

const mapStateToProps = (state) => { return {} };
const mapDispatchToProps = { acceptInvitation };
export const AcceptInvitation = connect(mapStateToProps, mapDispatchToProps)((
    {
        acceptInvitation
    }
) => {
    const navigate = useNavigate();
    const { code } = useParams();
    useEffect(() => {
        acceptInvitation(code);
    }, []);
    return (
        <div className="flex-col items-center gap-xxxl justify-center self-stretch" >
            <BackButton text="Home" link={REDIRECT_URI} />
            <div className="flex-col w-full max-w-[420px] items-center gap-md ">
                <TitleAuth
                    title="Accept Invitation"
                    subtitle="Click the button below to accept the invitation to your organization."
                    textAlign="text-center"
                />
                <Button
                    text="Accept Invitation"
                    variant="r4-gray-2"
                    width="w-full"
                    onClick={() => {
                        acceptInvitation(code);
                    }}
                />
            </div>
        </div >
    );
}
)