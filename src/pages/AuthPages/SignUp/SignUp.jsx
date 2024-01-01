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
  useEffect(() => { console.log("errors") }, [errors])
  const firstnameError = errors.firstname;
  const lastnameError = errors.lastname;
  const emailError = errors.email;
  const passwordError = errors.password;
  const [backendError, setBackendError] = React.useState(null);

  return (
    <div className="flex-col items-center gap-xxxl justify-center self-stretch">
      <div className="flex-col items-start gap-[10px] self-stretch">
        <BackButton text="Home" link={"/"} />
      </div>
      <div className=" flex-col w-full max-w-[420px] items-center gap-lg justify-center ">
        <TitleAuth
          title={"Create an account"}
          subtitle={<span>Sign up to retrieve a free trial API key.</span>}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-col justify-center items-center gap-md self-stretch"
        >
          <div className="flex-col justify-center items-start gap-xs self-stretch">
            <div className="flex items-center gap-xs self-stretch">
              <TextInput title="First Name" required placeholder="First Name" {...register("firstname")} />
              <TextInput title="Last Name" required placeholder="Last Name" {...register("lastname")} />
            </div>
            <TextInput title="Email" type="email" required placeholder="Put your email here" {...register("email", { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, })} />
            <TextInput title="Password" type="password" required placeholder="" {...register("password")} />
            <TextInput title="Organization Name" placeholder="Organization Name" {...register("organization")} />
          </div>
          <div className="flex-col items-center justify-center gap-xs self-stretch">
            <Button
              text={"Create account"}
              variant={"r4-white"}
              className="min-w-[60px] self-stretch items-center justify-center gap-xxs"
            />
            <Button variant="r4-white" text="Continue with Google" icon={Google} iconPosition="left" bgColor="bg-gray-3" textColor="text-gray-5" className="min-w-[60px] self-stretch items-center justify-center gap-xxs" onClick={() => googleLogin()} />
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
