import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import cn from "src/utilities/ClassMerge";
import { AuthenticationTitle } from "src/components/Titles";
import { BackButton, Button } from "src/components/Buttons";

export function ResetPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const emailError = errors.email;
  const passwordError = errors.password;
  return (
    <div className="flex-col items-center gap-xxxl justify-center self-stretch">
      <BackButton text="Home" />
      <div className=" flex-col w-full max-w-[420px] items-center gap-lg justify-center ">
        <AuthenticationTitle
          title={"Reset Password"}
          subtitle={"Reset your password"}
        />
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
          className="flex-col justify-center items-center gap-md self-stretch"
        >
          <div className="flex-col justify-center items-start gap-xs self-stretch">
            <div
              aria-label="new password field"
              className="flex-col justify-center items-start gap-xxs self-stretch"
            >
              <label
                className={cn(
                  "self-stretch text-sm-regular text-gray-4",
                  emailError ? "text-error" : ""
                )}
              >
                New Password
              </label>
              <input
                type="password"
                {...register("newPassword", {
                  required: true,
                  pattern: /^(?=.*[a-zA-Z0-9]).{8,}$/,
                })}
                className="input-box"
              />
            </div>
            <div
              aria-label="confirm password field"
              className="flex-col justify-center items-start gap-xxs self-stretch"
            >
              <label
                className={cn(
                  "self-stretch text-sm-regular text-gray-4",
                  passwordError ? "text-error" : ""
                )}
              >
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  pattern: /^(?=.*[a-zA-Z0-9]).{8,}$/,
                })}
                className="input-box"
              />
            </div>
          </div>
          <p className="text-sm-regular text-error self-start">
            Passwords do not match.
          </p>
          <div className="flex-col items-start gap-xs self-stretch">
            <Button
              text={"Change password"}
              variant={"r4-white"}
              className="w-full"
              justification="justify-center"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
