import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BackButton } from "src/components/Buttons/BackButton";
import { useForm } from "react-hook-form";
import { TitleAuth } from "src/components/Titles";
import cn from "src/utilities/classMerge";
import { Button } from "src/components/Buttons/Button";
import { platformURL } from "src/utilities/platformURL";
import { login, getUser } from "src/store/actions";
import { connect } from "react-redux";

const mapDispatchToProps = {
  login,
};

const LogIn = ({ login }) => {
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate(0);
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
      <BackButton text="Home" link="/"/>
      <div className=" flex-col w-full max-w-[420px] items-center gap-lg justify-center ">
        <TitleAuth
          title={"Sign in"}
          subtitle={
            <span>
              Don’t have an account?{" "}
              <span
                className=" text-primary hover:cursor-pointer"
                onClick={() => navigate("/signup")}
                // onClick={() => navigate("/beta-access")}
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
            <div
              aria-label="email field"
              className="flex-col justify-center items-start gap-xxs self-stretch"
            >
              <label
                className={cn(
                  "self-stretch text-sm-regular text-gray-4",
                  emailError ? "text-error" : ""
                )}
              >
                Email
              </label>
              <input
                type="text"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                className="input-box"
              />
            </div>
            <div
              aria-label="password field"
              className="flex-col justify-center items-start gap-xxs self-stretch"
            >
              <label
                className={cn(
                  "self-stretch text-sm-regular text-gray-4",
                  passwordError ? "text-error" : ""
                )}
              >
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[a-zA-Z0-9]).{8,}$/,
                })}
                className="input-box"
              />
            </div>
          </div>
          <p className="text-sm-regular text-error self-start">
            {backendError ? backendError : ""}
          </p>
          <div className="flex-col items-start gap-xs self-stretch">
            <Button
              text={"Sign in with email"}
              variant={"r4-white"}
            />
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
