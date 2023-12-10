import React from 'react'
import { connect } from 'react-redux'
import { resendActivationEmail } from 'src/store/actions/userAction'
import { useParams } from 'react-router-dom'
import LargeTextTitle from 'src/components/Titles/LargeTextTitle/LargeTextTitle';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
    resendActivationEmail
}


function ResendActivation({ resendActivationEmail }) {
    const { email } = useParams();
    const [errors, setErrors] = React.useState([]);
    const [success, setSuccess] = React.useState(false);
    const handleError = (errorResponse) => {
        setErrors([]);
        setErrors(["Something went wrong, please try again later."])
    };

    const handleResponse = (response) => {
        setSuccess(true);
    };

    return (
        <div className="auth-container bg-white">
            <div className="auth-max-width-container">
                <div className="flex-col justify-center items-start gap-md self-stretch">
                    <LargeTextTitle
                        title="Resend Activation Email"
                        subtitle={<>
                            <span>
                                {`We have successfully sent you an activation email, please check your email`}
                            </span>
                            <span className="text-primary">
                                {` ${email} `}
                            </span>
                            <span>
                                {`to activate your account.`}
                            </span>
                        </>}
                    />
                    <div
                        className="text-md text-gray4"

                    >
                        <span>{"Did not receive? "}</span>
                        <span className="text-primary"
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                resendActivationEmail(email, handleResponse, handleError);
                            }}
                        >Resend</span>
                    </div>
                    {errors?.length > 0 &&
                        errors.map((error, index) => (
                            <div
                                key={index}
                                className="text-md t-error"
                            >
                                {error}
                            </div>
                        ))
                    }
                    {
                        success &&
                        <div
                            className="text-md t-success"
                        >
                            {"Activation email sent successfully"}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ResendActivation)