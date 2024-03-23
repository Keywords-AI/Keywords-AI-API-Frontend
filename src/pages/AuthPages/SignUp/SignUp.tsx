import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BackButton } from "src/components/Buttons/BackButton";
import { useForm } from "react-hook-form";
import { TitleAuth } from "src/components/Titles";
import { signup } from "src/store/actions";
import { Button } from "src/components/Buttons/Button";
import { TextInput } from "src/components/Inputs";
import { Google } from "src/components";
import { googleLogin } from "src/store/actions";
import { connect } from "react-redux";
import { useTypedDispatch, useTypedSelector } from "src/store/store";

// admintestpassword
export const SignUp = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [enteredEmail, setEnteredEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    data.invitation_code = "keywordsai";
    dispatch(signup(data, "keywordsai"));
  };
  // Keywords666
  return (
    <div className="flex-col items-center gap-xxxl justify-between self-stretch h-full   flex-1">
      <div className="flex-col gap-xxxl w-full items-center">
        <div className="flex-col items-start gap-xxs self-stretch">
          <BackButton text="Home" link={"https://keywordsai.co/"} />
        </div>
        <div className=" flex-col w-full max-w-[420px] items-center gap-lg justify-center ">
          <TitleAuth
            title={"Create an account"}
            subtitle={`Sign up to get $15 in model credits.`}
          />
          {enteredEmail ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex-col justify-center items-center gap-md self-stretch"
            >
              <div className="flex-col justify-center items-start gap-xs max-w-[420px]">
                <div className="flex items-center gap-xs max-w-[420px]">
                  <TextInput
                    title="First Name"
                    required
                    placeholder="First Name"
                    {...register("first_name")}
                  />
                  <TextInput
                    title="Last Name"
                    required
                    placeholder="Last Name"
                    {...register("last_name")}
                  />
                </div>
                <TextInput
                  title="Email"
                  type="email"
                  required
                  placeholder="Put your email here"
                  {...register("email", {
                    value: enteredEmail,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                />
                <TextInput
                  title="Password"
                  type="password"
                  required
                  placeholder=""
                  {...register("password")}
                />
              </div>
              <div className="flex-col items-center justify-center gap-xs self-stretch">
                <Button
                  text={"Create account"}
                  variant={"r4-white"}
                  width={"w-full"}
                />
              </div>
            </form>
          ) : (
            <EmailForm setEmail={setEnteredEmail} />
          )}
        </div>
      </div>

      <span className="caption text-gray-4 self-stretch text-center">
        By signing up, you agree to our{" "}
        <span
          className=" text-primary hover:cursor-pointer"
          onClick={() => navigate("/terms-of-use")}
        >
          Terms of Use
        </span>{" "}
        and{" "}
        <span
          className=" text-primary hover:cursor-pointer"
          onClick={() => navigate("/privacy-policy")}
        >
          Privacy Policy
        </span>
        .
      </span>
    </div>
  );
};

const EmailForm = ({ setEmail }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setEmail(data.email);
  };
  const dispatch = useTypedDispatch();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-col justify-center w-full items-center gap-md self-stretch"
    >
      <div className="flex-col justify-center items-start gap-xs w-[420px]  max-w-[420px] self-stretch sm:w-full">
        <TextInput
          title="Email"
          type="email"
          required
          placeholder="Put your email here"
          {...register("email", {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            required: true,
          })}
        />
      </div>
      <div className="flex-col items-center justify-center gap-xs self-stretch">
        <Button
          text={"Continue with Email"}
          variant={"r4-white"}
          width={"w-full"}
        />
        <Button
          variant="r4-white"
          text="Sign in with Google"
          icon={Google}
          iconSize={"md"}
          iconPosition="left"
          bgColor="bg-gray-3"
          textColor="text-gray-5"
          width="w-full"
          onClick={() => dispatch(googleLogin())}
          type="button"
        />
      </div>
    </form>
  );
};
