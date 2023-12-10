import React from "react";
import "./static/css/style.css";
import { connect } from "react-redux";
import { login, register } from "src/store/actions";
import { randomColor } from "src/utilities/constants";
import LargeTextTitle from "src/components/Titles/LargeTextTitle/LargeTextTitle";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  register,
};

function Signup({ register }) {
  const formRef = React.useRef(null);
  const [errors, setErrors] = React.useState([]);
  const [sending, setSending] = React.useState(false);

  const handleError = (errorResponse) => {
    // Clear previous errors`
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
  const handleResponse = (response) => {
    window.location.href =
      "resend-activation-email/" + formRef.current.email.value;
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    if (formRef.current) {
      const form = formRef.current;
      const formData = new FormData(form);
      formData.append("profile_color", randomColor());
      register(formData, handleResponse, handleError);
    }
  };

  return (
    <div className="auth-container bg-white">
      <div className="auth-max-width-container">
        <LargeTextTitle
          title="Sign up"
          subtitle={<span>
            {"Sign up to access a free trial API key - or sign in "}{" "}
            <a
              href="/login"
              className="text-primary"
              style={{
                textDecoration: "none",
              }}
            >
              here
            </a>{" "}
            {"if you already have an account."}
          </span>}
        />
        <form className="auth-form" method="POST" ref={formRef}>
          <div className="flex-col gap-xs items-start">
            <div className="form-fields">
              <div className="parallel-field">
                <div className="flex-col justify-start items-start self-stretch gap-xxs short-field">
                  <label className="text-sm text-gray4" htmlFor="fname-field">
                    First Name*
                  </label>
                  <input
                    className="text-md"
                    type="text"
                    name="first_name"
                    id="fname-field"
                    placeholder={"First Name"}
                  />
                </div>
                <div className="flex-col justify-start items-start self-stretch gap-xxs short-field">
                  <label className="text-sm text-gray4" htmlFor="lname-field">
                    Last Name*
                  </label>
                  <input
                    className="text-md"
                    type="text"
                    name="last_name"
                    id="lname-field"
                    placeholder={"Last Name"}
                  />
                </div>
              </div>
              <div className="flex-col justify-start items-start self-stretch gap-xxs">
                <label className="text-sm text-gray4" htmlFor="email-field">
                  Email*
                </label>
                <input
                  className="text-sm"
                  type="text"
                  name="email"
                  id="email-field"
                  placeholder={"Enter your email"}
                />
              </div>
              <div className="flex-col justify-start items-start self-stretch gap-xxs">
                <label className="text-sm text-gray4" htmlFor="pwd-field">
                  Password*
                </label>
                <input
                  className="text-md"
                  type={"password"}
                  name="password"
                  id="pwd-field"
                />
              </div>
              <div className="flex-col justify-start items-start self-stretch gap-xxs">
                <label className="text-sm text-gray4" htmlFor="re-pwd-field">
                  Confirm Password*
                </label>
                <input
                  className="text-md"
                  type={"password"}
                  name="re_password"
                  id="re-pwd-field"
                />
              </div>
              <div className="flex-col justify-start items-start self-stretch gap-xxs">
                <label className="text-sm text-gray4" htmlFor="org-field">
                  Organization Name
                </label>
                <input
                  className="text-md"
                  type={"text"}
                  name="organization_name"
                  id="org-field"
                />
              </div>
            </div>
            {errors.length > 0 &&
              errors.map((error, index) => (
                <div key={index} className="t-error text-sm">
                  {error}
                </div>
              ))}
            {sending && (
              <div className="t-success text-md">
                {
                  "Please hold, we are creating your account and sending you an activation email. You will be redirected once the email is sent!"
                }
              </div>
            )}
          </div>
          <div className="flex-row justify-start items-start gap-xs self-stretch">
            <button className="button-primary " onClick={handleFormSubmit}>
              {"Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
