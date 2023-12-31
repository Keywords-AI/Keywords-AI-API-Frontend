import React from 'react'
import { connect } from 'react-redux'
import { logout } from 'src/store/actions';
import { CreateOrganization } from './CreateOrganization';
import { Button } from 'src/components/Buttons';
import { Left } from 'src/components/Icons';

const mapStateToProps = (state) => ({});
const mapDispatchToProps = { logout };

export const OnboardingPage = connect(mapStateToProps, mapDispatchToProps)((
    { logout, fieldSet }
) => {

    const handleBackButtonClick = () => {
        logout(); // Dispatch the logout action
        window.location.href = "https://keywordsai.co";
    };

    return (
        <div className="flex flex-col items-center gap-xxxl justify-center self-stretch" aria-label="create-org-page">
            <div className="flex flex-col items-start self-stretch gap-[10px]">
                <Button
                    text={"Sign out"}
                    variant={"r18-black"}
                    onClick={handleBackButtonClick}
                    icon={Left}
                    iconPosition={"left"}
                />
            </div>
            <CreateOrganization />
        </div>
    );
})

