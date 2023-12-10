import React from 'react'
import { connect } from 'react-redux'
import { acceptInvitation, saveAllUsers } from 'src/store/actions/userAction'
import { useParams } from 'react-router-dom'
import { enumErrors } from 'src/utilities/utilities'
import LargeTextTitle from '../../components/Titles/LargeTextTitle/LargeTextTitle'

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
    acceptInvitation,
    saveAllUsers
}


function AcceptInvitation({ acceptInvitation, saveAllUsers }) {
    const { code } = useParams();
    const [errors, setErrors] = React.useState([]);
    const [success, setSuccess] = React.useState(false);
    const [counter, setCounter] = React.useState(5); // set the time in seconds for redirection

    const handleErrors = (errorResponse) => {
        enumErrors(errorResponse, setErrors);
    };

    const handleSuccess = () => {
        setSuccess(true);
    }

    React.useEffect(() => {
        if (success && counter > 0) {
            const timer = setTimeout(() => {
                setCounter(prevCounter => prevCounter - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (counter === 0) {
            window.location.href = "/platform";
        }
    }, [success, counter]);

    return (
        <div className="auth-container bg-white">
            <div className="auth-max-width-container">
                <div className="flex-col justify-center items-start gap-md self-stretch">
                    <LargeTextTitle
                        title="Admin Shortcuts"
                        subtitle="Use these shortcuts to perform admin actions."
                    />
                    <button className="button-primary"
                        onClick={(e) => {
                            e.preventDefault();
                            saveAllUsers();
                        }}
                    >
                        Post-save signals trigger for all users
                    </button>
                    {errors.map((error, index) => (
                        <div key={index} className="t-error text-md">{error}</div>
                    ))}
                    {success && <div className="t-success text-md">
                        {"Invitation accepted! redirecting to platform page in" + " " + counter + " " + "seconds. "}
                        <a href="/platform" className="text-primary">
                            {"Click here if you are not redirected."}
                        </a>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptInvitation)