import React from "react";
import { resetPasswordConfirm } from "src/store/actions/userAction";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LargeTextTitle from "src/components/Titles/LargeTextTitle/LargeTextTitle";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  resetPasswordConfirm,
};

function ResetPassword({ resetPasswordConfirm }) {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form["new_password"].value;
    const re_password = form["re_new_password"].value;
    resetPasswordConfirm(password, re_password, uid, token, handleError);
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
        <div className="flex-col items-start gap-lg self-stretch">
          <LargeTextTitle
            title="Reset Password"
            subtitle="Reset your password"
          />
          <form
            className="auth-form items-start"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="form-fields">
              <div className="flex-col justify-start items-start self-stretch gap-xxs">
                <label className="text-md text-gray4" htmlFor="new-password-field">
                  New Password
                </label>
                <input
                  className="text-md"
                  type="password"
                  name="new_password"
                  id="new-password-field"
                  placeholder={"Enter your password"}
                />
              </div>
              <div className="flex-col justify-start items-start self-stretch gap-xxs">
                <label className="text-md text-gray4" htmlFor="re-password-field">
                  Confirm Password
                </label>
                <input
                  className="text-md"
                  type="password"
                  name="re_new_password"
                  id="re-password-field"
                  placeholder={"Re-enter your password"}
                />
              </div>
              {errors.length > 0 &&
                errors.map((error, index) => (
                  <div className="t-error text-sm" key={index}>
                    {error}
                  </div>
                ))}
            </div>
            <div className="flex-row justify-start items-start gap-xs self-stretch">
              <button className="button-primary">Change password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
