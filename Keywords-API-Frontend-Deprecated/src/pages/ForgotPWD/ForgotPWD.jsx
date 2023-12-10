import React from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "src/store/actions/userAction";
import { connect } from "react-redux";
import LargeTextTitle from "src/components/Titles/LargeTextTitle/LargeTextTitle";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  resetPassword,
};

function ForgotPWD({ resetPassword }) {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form["email"].value;
    resetPassword(email, handleRespopnse, handleError);
  };
  const [errors, setErrors] = React.useState([]);
  const [response, setResponse] = React.useState("");

  const handleRespopnse = (response) => {
    setResponse(response);
  };
  const handleError = (errorResponse) => {
    // Clear previous errors
    setErrors([]);
    Object.keys(errorResponse).forEach((key) => {
      const value = errorResponse[key];
      if (Array.isArray(value)) {
        value.forEach((error) => {
          setErrors((prev) => [...prev, `${key}:${error}`]);
        });
      } else {
        setErrors((prev) => [...prev, value]);
      }
    });
  };
  return (
    <div className="auth-container bg-white">
      <div className="auth-max-width-container">
        <LargeTextTitle
          title="Forgot Password"
          subtitle="Enter your email and we'll send you a link to reset your password"
        />
        <form className="auth-form" method="POST" onSubmit={handleSubmit}>
          <div className="form-fields">
            <div className="flex-col justify-start items-start self-stretch gap-xxs">
              <label className="text-sm text-gray4" htmlFor="email-field">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email-field"
                placeholder={"Enter your email"}
              />
            </div>
            {errors.length > 0 &&
              errors.map((error, index) => (
                <div className="t-error text-sm" key={index}>
                  {error}
                </div>
              ))}
            {response && <div className="t-success text-sm">{response}</div>}
          </div>
          <div className="flex-row justify-start items-start gap-xs self-stretch">
            <button className="button-primary">Submit</button>
            <button
              className="button-tertiary-primary"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Return to login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default connect(null, { resetPassword })(ForgotPWD);
