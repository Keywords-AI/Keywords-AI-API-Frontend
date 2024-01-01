
import { OnboardingFieldSet } from "./components";
import React, { useEffect } from "react";
import { TextInput, SelectInput } from "src/components/Inputs";
import { Button } from "src/components";
import cn from "src/utilities/classMerge";

export function GetStarted({
    show = false,
    register = () => { },
    buttonAction = () => { },
}) {
    return (
        <div className={
            cn("flex-col self-stretch flex-grow justify-center",
                show ? "visible" : "invisible"
            )
        }
        >
            <Button variant="r4-primary" text="Get started" />
        </div>
    );
}
