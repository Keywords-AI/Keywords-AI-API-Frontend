import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BackButton } from "src/components/Buttons/BackButton";
import { useForm } from "react-hook-form";
import { TitleAuth } from "src/components/Titles";
import { Button } from "src/components/Buttons/Button";
import { login, googleLogin } from "src/store/actions";
import { connect } from "react-redux";
import { TextInput } from "src/components/Inputs";
import { Google } from "src/components";
import { dispatchNotification, isLoggedIn } from "src/store/actions";
import { useLocation } from "react-router-dom";
import { REDIRECT_URI } from "src/utilities/navigation";
import { envVars } from "src/branch_env";
const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = {
  login,
  googleLogin,
};

const LogIn = ({ login, googleLogin, user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isDemoEnv = envVars.DEMO_ENV === true;
  const onSubmit = async (data) => {
    try {
      if (isDemoEnv) {
        if (envVars.DEMO_EMAIL === "" || envVars.DEMO_PASSWORD === "") {
          console.log("error", "Demo credentials not set");
          return;
        }
        const demoCredentials = {
          email: envVars.DEMO_EMAIL,
          password: envVars.DEMO_PASSWORD,
        };
        await login(demoCredentials);
        return;
      }

      await login(data);
    } catch (error) {
      setBackendError(error.detail || error.message);
    }
  };
  useEffect(() => {
    if (isLoggedIn(user)) {
      const next = new URLSearchParams(location.search).get("next");
      if (next) {
        navigate(next);
      } else {
        navigate(REDIRECT_URI);
      }
    }
  }, [user]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const emailError = errors.email;
  const passwordError = errors.password;
  const [backendError, setBackendError] = useState(null);
  return (
    <div className="flex-col items-center gap-xxxl justify-center self-stretch">
      <div className="flex-col items-start gap-xxs self-stretch">
        <BackButton text="Home" link={"/"} />
      </div>
      <div className=" flex-col w-full max-w-[420px] items-center gap-lg justify-center ">
        <TitleAuth
          title={"Sign in"}
          subtitle={
            <span>
              Don’t have an account?{" "}
              <span
                className="text-primary hover:cursor-pointer"
                onClick={() => navigate(`/signup?${params.toString()}`)}
              >
                Sign up.
              </span>
            </span>
          }
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-col justify-center items-center gap-md self-stretch"
        >
          <div className="flex-col justify-center items-start gap-xs self-stretch">
            <TextInput
              title="Email"
              type="email"
              required
              placeholder={isDemoEnv ? "" : "Put your email here"}
              {...register("email")}
              disabled={isDemoEnv}
            />
            <TextInput
              title="Password"
              type="password"
              required
              placeholder=""
              {...register("password")}
              disabled={isDemoEnv}
            />
          </div>
          <div className="flex-col items-center justify-center gap-xs self-stretch">
            <Button text={"Sign in"} variant={"r4-primary"} width={"w-full"} />
            {/* <Button variant="r4-white" text="Sign in with Google" icon={Google} iconSize={"md"} iconPosition="left" bgColor="bg-gray-3" textColor="text-gray-5"
              width="w-full" onClick={() => googleLogin()} type="button" /> */}
            <p
              className="caption text-gray-4 self-stretch hover:cursor-pointer"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(LogIn);
