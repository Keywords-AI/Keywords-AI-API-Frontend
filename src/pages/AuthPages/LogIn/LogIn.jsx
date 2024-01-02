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

const mapDispatchToProps = {
  login,
  googleLogin,
};

const LogIn = ({ login, googleLogin }) => {
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      window.location.href = "/";
    } catch (error) {
      setBackendError(error.detail || error.message);
    }
  };
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
      <div className="flex-col items-start gap-[10px] self-stretch">
        <BackButton text="Home" link={"/"} />
      </div>
      <div className=" flex-col w-full max-w-[420px] items-center gap-lg justify-center ">
        <TitleAuth
          title={"Sign in"}
          subtitle={
            <span>
              Don’t have an account?{" "}
              <span
                className=" text-primary hover:cursor-pointer"
                onClick={() => navigate("/signup")}
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
            <TextInput title="Email" type="email" required placeholder="Put your email here" {...register("email")} />
            <TextInput title="Password" type="password" required placeholder="" {...register("password")} />
          </div>
          <div className="flex-col items-center justify-center gap-xs self-stretch">
            <Button
              text={"Sign in"}
              variant={"r4-primary"}
              width={"w-full"}
            />
            <Button variant="r4-white" text="Sign in with Google" icon={Google} iconSize={"md"} iconPosition="left" bgColor="bg-gray-3" textColor="text-gray-5"
              width="w-full" onClick={() => googleLogin()} type="button" />
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
