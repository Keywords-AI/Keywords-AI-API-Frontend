import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BackButton, Button } from "src/components/Buttons";
import { AuthenticationTitle } from "src/components/Titles";
import cn from "src/utilities/classMerge";
import { TextInput } from "src/components/Inputs";
import usePost from "src/hooks/usePost";

export function ForgotPassword() {
  const { loading, error, data, postData } = usePost({path: "auth/users/reset-password/"});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const emailError = errors.email;
  const onSubmit = (formData) => {
    console.log(formData);
    postData(formData);
  }

  return (
    <div className="flex-col items-center gap-xxxl justify-center self-stretch">
      <div className="flex flex-col items-start self-stretch gap-[10px]">
        <BackButton text="Home" link="/"/>
      </div>
      <form className="flex flex-col w-full max-w-[420px] items-center gap-lg justify-center"
      onSubmit={handleSubmit(onSubmit)}
      > 
        <AuthenticationTitle title="Forgot password" subtitle="You will receive a link to reset your password."/>
        <div className="flex-col justify-center items-center gap-[20px] self-stretch">
          <div className="flex-col justify-center items-start gap-xs self-stretch">
            <TextInput {...register("email")} type="email" title="Email" placeholder="Put your email here"/>
          </div>
          <div className="flex-col justify-center items-center gap-xs self-stretch">
            <Button variant="r4-white" text="Send reset link" className="min-w-[60px] self-stretch items-center justify-center gap-xxs"/>
            {/* <span className="text-error caption self-stretch">We cannot find your email.</span> */}
            {data && !error && <span className="text-success caption self-stretch">Link sent to your email inbox via thekeywordsai@gmail.com. </span>}
          </div>
        </div>
      </form>
    </div>
  );
}
