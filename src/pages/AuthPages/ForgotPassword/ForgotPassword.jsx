import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BackButton, Button } from "src/components/Buttons";
import { AuthenticationTitle } from "src/components/Titles";
import { TextInput } from "src/components/Inputs";
import { connect } from "react-redux";
import { resetPassword } from "src/store/actions";

const mapStateToProps = (state) => ({});
const mapDispatchToProps = { resetPassword };

function ForgotPasswordNotConnected({ resetPassword }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const emailError = errors.email;
  const onSubmit = (formData) => {
    resetPassword(formData.email);
  }

  return (
    <div className="flex-col items-center gap-xxxl justify-center self-stretch">
      <div className="flex flex-col items-start self-stretch gap-[10px]">
        <BackButton text="Home" link="/" />
      </div>
      <form className="flex flex-col w-full max-w-[420px] items-center gap-lg justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AuthenticationTitle title="Forgot password" subtitle="You will receive a link to reset your password." />
        <div className="flex-col justify-center items-center gap-md self-stretch">
          <div className="flex-col justify-center items-start gap-xs self-stretch">
            <TextInput {...register("email")} type="email" title="Email" placeholder="Put your email here" />
          </div>
          <div className="flex-col justify-center items-center gap-xs self-stretch">
            <Button variant="r4-gray-2" text="Send reset link" className="min-w-[60px] self-stretch items-center justify-center gap-xxs" />
          </div>
        </div>
      </form>
    </div>
  );
}

export const ForgotPassword = connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordNotConnected);