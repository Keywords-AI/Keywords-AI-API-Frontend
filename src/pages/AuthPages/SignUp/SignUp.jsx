import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "src/components/Buttons/BackButton";
import { useForm } from "react-hook-form";
import { TitleAuth } from "src/components/Titles";
import cn from "src/utilities/classMerge";
import { signup } from "src/authentication/Authentication";
import { Button } from "src/components/Buttons/Button";
import { TextInput } from "src/components/Inputs";
import { Google } from "src/components";
import { login, googleLogin } from "src/store/actions";
export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await signup({ ...data });
      navigate("/login");
    } catch (error) {
      setBackendError(error.message);
    }
    console.log(data)
  };
  useEffect(()=>{console.log("errors")},[errors])
  const firstnameError = errors.firstname;
  const lastnameError = errors.lastname;
  const emailError = errors.email;
  const passwordError = errors.password;
  const [backendError, setBackendError] = React.useState(null);

  return (
    <div className="flex-col items-center gap-xxxl justify-center self-stretch">
      <div className="flex-col items-start gap-[10px] self-stretch">
        <BackButton text="Home" link={"/"}/>
      </div>
      <div className=" flex-col w-full max-w-[420px] items-center gap-lg justify-center ">
        <TitleAuth
          title={"Create an account"}
          subtitle={<span>Sign up to retrieve a free trial API key.</span>}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-col justify-center items-center gap-[20px] self-stretch"
        >
          <div className="flex-col justify-center items-start gap-xs self-stretch">
            <div className="flex items-center gap-xs self-stretch">
              {/* <div
                aria-label="firstname field"
                className="flex-col justify-center items-start gap-xxs self-stretch flex-1"
              >
                <label
                  className={cn(
                    "self-stretch text-sm-regular text-gray-4",
                    firstnameError ? "text-error" : ""
                  )}
                >
                  First name*
                </label>
                <input
                  type="text"
                  {...register("firstname", {
                    required: true,
                  })}
                  className="input-box bg-transparent"
                />
              </div> */}
              {/* <div
                aria-label="lastname field"
                className="flex-col justify-center items-start gap-xxs self-stretch flex-1"
              >
                <label
                  className={cn(
                    "self-stretch text-sm-regular text-gray-4",
                    lastnameError ? "text-error" : ""
                  )}
                >
                  Last name*
                </label>
                <input
                  type="text"
                  {...register("lastname", {
                    required: true,
                  })}
                  className="input-box bg-transparent"
                />
              </div> */}
              <TextInput title="First Name" required placeholder="First Name" {...register("firstname")}/>
              <TextInput title="Last Name" required placeholder="Last Name" {...register("lastname")}/>
            </div>
            {/* <div
              aria-label="email field"
              className="flex-col justify-center items-start gap-xxs self-stretch"
            >
              <label
                className={cn(
                  "self-stretch text-sm-regular text-gray-4",
                  emailError ? "text-error" : ""
                )}
              >
                Email*
              </label>
              <input
                type="text"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                className="input-box bg-transparent"
              />
            </div> */}
            <TextInput title="Email" type="email" required placeholder="Put your email here" {...register("email")}/>
            {/* <div
              aria-label="password field"
              className="flex-col justify-center items-start gap-xxs self-stretch"
            >
              <label
                className={cn(
                  "self-stretch text-sm-regular text-gray-4",
                  passwordError ? "text-error" : ""
                )}
              >
                Password*
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[a-zA-Z0-9]).{8,}$/,
                })}
                className="input-box bg-transparent"
              />
            </div> */}
            <TextInput title="Password" type="password" required placeholder="" {...register("password")}/>
            {/* <div
              aria-label="Organization name field"
              className="flex-col justify-center items-start gap-xxs self-stretch"
            >
              <label className={cn("self-stretch text-sm-regular text-gray-4")}>
                Organization name
              </label>
              <input
                type="text"
                {...register("organization", { required: false })}
                className="input-box bg-transparent"
              />
            </div> */}
            <TextInput title="Organization Name" placeholder="Organization Name" {...register("organization")}/>
          </div>
          {/* <p className="text-sm-regular text-error self-start">
            {backendError ? backendError : ""}
          </p> */}
          <div className="flex-col items-center justify-center gap-xs self-stretch">
            <Button
              text={"Create account"}
              variant={"r4-white"}
              className="min-w-[60px] self-stretch items-center justify-center gap-xxs"
            />
            <Button variant="r4-white" text="Continue with Google" icon={Google} iconPosition="left" bgColor="bg-gray-3" textColor="text-gray-white" className="min-w-[60px] self-stretch items-center justify-center gap-xxs" onClick={() => googleLogin()}/>
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
}
