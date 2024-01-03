
import React, { useEffect } from "react";
import { Button } from "src/components";
import cn from "src/utilities/classMerge";
import { updateUser } from "src/store/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { REDIRECT_URI } from "src/utilities/navigation";

const mapStateToProps = (state) => ({});
const mapDispatchToProps = { updateUser };
export const GetStarted = connect(mapStateToProps, mapDispatchToProps)(({
    show = false,
    updateUser
}) => {
    const navigate = useNavigate();
    return (
        <div className={
            cn("flex-col self-stretch flex-grow justify-center",
                show ? "visible" : "invisible"
            )
        }
        >
            <Button variant="r4-primary" text="Get started"
                onClick={() => {
                    updateUser({ onboarded: true });
                    navigate(REDIRECT_URI);
                }}
            />
        </div>
    );
})
