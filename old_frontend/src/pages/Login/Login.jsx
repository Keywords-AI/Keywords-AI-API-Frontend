import React from "react";
import "./static/css/style.css";
import { connect } from "react-redux";
import { login, register } from "src/store/actions";
import { useNavigate } from "react-router-dom";
import LargeTextTitle from "src/components/Titles/LargeTextTitle/LargeTextTitle";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  login,
};

function Login({ login, user }) {
  const navigate = useNavigate();
  const formRef = React.useRef(null);
  const [errors, setErrors] = React.useState([]);
  React.useEffect(() => {
    if (user.email) {
      const params = new URLSearchParams(window.location.search);
      const next = params.get("next");
      if (next) {
        navigate(next);
      } else {
        navigate("/");
      }
    }
  }, [user]);
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formRef.current) {
      const form = formRef.current;
      const password = form["password"].value;
      const email = form["email"].value;
      login(email, password, handleError);
    }
  };

  return (
    <div className="auth-container bg-white">
      <div className="auth-max-width-container">
        <LargeTextTitle
          title="Sign in"
          subtitle="Welcome back!"
        />
        <form className="auth-form" method="POST" ref={formRef}>
          <div className="flex-col gap-xs items-start">
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
              <div className="flex-col justify-start items-start self-stretch gap-xxs">
                <label className="text-sm text-gray4" htmlFor="pwd-field">
                  Password
                </label>
                <input type={"password"} name="password" id="pwd-field" />
              </div>
            </div>
            {errors.length > 0 &&
              errors.map((error, index) => (
                <div key={index} className="text-sm t-error">
                  {error}
                </div>
              ))}
          </div>
          <div className="flex-row justify-start items-start gap-xs self-stretch">
            <button className="button-primary " onClick={handleFormSubmit}>
              Sign in with email
            </button>
            <button
              className="button-tertiary-primary"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </button>
          </div>
          <div
            className="text-sm text-gray4"
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            <span>Forgot password</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
