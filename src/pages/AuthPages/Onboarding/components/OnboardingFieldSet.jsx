import React from 'react'
import { connect } from 'react-redux'
import { AuthenticationTitle } from 'src/components/Titles'
import { Button } from 'src/components/Buttons'
import cn from 'src/utilities/classMerge'



const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

/**
 * You need to handle the registration of the fields before passing them in as props
 */

export const OnboardingFieldSet = connect(mapStateToProps, mapDispatchToProps)(({ title, subtitle, fields, buttonText, buttonAction, show}) => {
    return (
        <div className={cn("w-full max-w-[420px] items-center gap-lg justify-center",
            show ? "flex-col" : "hidden"
        )}>
            <AuthenticationTitle
                title={title}
                subtitle={subtitle} //to add user email
            />
            <div className="flex flex-col items-center justify-center gap-md self-stretch">
                <div className="flex flex-col justify-start gap-sm self-stretch ">
                    {fields}
                </div>
                <Button
                    variant="r4-primary"
                    text={buttonText}
                    className="min-w-[60px] self-stretch items-center justify-center gap-xxs"
                    onClick={buttonAction}
                    type="button"
                />
            </div>
        </div>
    )
})


