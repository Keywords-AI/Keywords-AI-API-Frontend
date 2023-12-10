import React from 'react';
import { connect } from 'react-redux';
import { logout } from 'src/store/actions';
import { Avatar, BigAvatar, Organization, Error, Success } from 'src/assets/svgs';
import "./style.css"
import { useNavigate } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};
const mapDispatchToProps = {
    logout,
};

const Profile = React.forwardRef((props, ref) => {
    const navigate = useNavigate();
    const { logout, user, open, setOpen } = props;
    const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
        }
    };

    return (
        <>
            {open &&
                <>
                    <div className="backdrop"
                        onClick={handleClick}
                    >
                    </div>
                    <div className="profile-container"
                        ref={ref}
                    >
                        <div className='flex-cl dmain-center crss-center g-xl stretch'>
                            <div className="flex-col main-center cross-center g-md stretch">

                                <BigAvatar />
                                <div className="flex-col main-center cross-center g-md stretch">
                                    <div className="display-sm">
                                        {user?.first_name} {user?.last_name}
                                    </div>
                                    <div className="text-md">
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-col main-center cross-center g-xs stretch">
                                <div className="text-md t-primary flex-row main-center cross-center g-xs stretch">
                                    <Organization />
                                    {(!user?.organization || user?.organization.name === "default")? " Anomynous Organization": user?.organization?.name}
                                </div>
                                {user.active_subscription ? <div className="text-md t-success flex-row main-center cross-center g-xs stretch">
                                    <Success />
                                    {"Active API Access"}
                                </div> : <div className="text-md t-error flex-row main-center cross-start g-xs stretch">
                                    <Error />
                                    {"Inactive API Access"}
                                </div>}
                            </div>
                            <div className="flex-row main-center cross-start g-xs stretch">
                                <button className="button-tertiary-white"
                                    onClick={() => {
                                        navigate("/get-api-key")
                                        setOpen(false)
                                    }}
                                >
                                    Manage API keys
                                </button>
                                <button className='button-primary'
                                    onClick={() => { logout() }}
                                >Log out</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Profile);
