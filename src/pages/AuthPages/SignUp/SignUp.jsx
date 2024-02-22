import React, { useEffect } from "react";
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

const mapStateToProps = (state) => ({});
const mapDispatchToProps = { googleLogin, signup };
// admintestpassword
export const SignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ googleLogin, signup }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    signup(data);
  };
  // Keywords666
  return (
    <div className="flex-col items-center gap-xxxl justify-center self-stretch">
      <div className="flex-col items-start gap-xxs self-stretch">
        <BackButton text="Home" link={"/"} />
      </div>
      <div className=" flex-col w-full max-w-[420px] items-center gap-lg justify-center ">
        <TitleAuth
          title={"Create an account"}
          subtitle={`Sign up to retrieve a free trial API key.`}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-col justify-center items-center gap-md self-stretch"
        >
          <div className="flex-col justify-center items-start gap-xs self-stretch">
            <div className="flex items-center gap-xs self-stretch ">
              <TextInput
                title="First Name"
                required
                placeholder="First Name"
                {...register("first_name")}
                width="w-[204px]"
              />
              <TextInput
                title="Last Name"
                required
                placeholder="Last Name"
                {...register("last_name")}
                width="w-[204px]"
              />
            </div>
            <TextInput
              title="Email"
              type="email"
              required
              placeholder="Put your email here"
              {...register("email", { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
            />
            <TextInput
              title="Password"
              type="password"
              required
              placeholder=""
              {...register("password")}
            />
            <TextInput
              title="Invitation Code"
              type="password"
              required
              placeholder=""
              {...register("invitation_code")}
            />
          </div>
          <div className="flex-col items-center justify-center gap-xs self-stretch">
            <Button
              text={"Create account"}
              variant={"r4-white"}
              width={"w-full"}
            />
            {/* <Button variant="r4-white" text="Continue with Google"
              icon={Google} iconPosition="left"
              bgColor="bg-gray-3"
              textColor="text-gray-5"
              iconSize="md"
              width="w-full" onClick={() => googleLogin()}
            /> */}
            {/* <span className="text-sm-regular text-gray-4">
              {"Already have an account? "}
              <span
                className="text-primary cursor-pointer"
                onClick={() => navigate(`/login?${params.toString()}`)}
              >
                {"Sign in"}
              </span>
            </span> */}
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
        </form>
      </div>
    </div>
  );
});
