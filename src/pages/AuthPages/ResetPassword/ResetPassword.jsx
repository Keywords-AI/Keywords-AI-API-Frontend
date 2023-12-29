import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BackButton, Button } from "src/components/Buttons";
import { AuthenticationTitle } from "src/components/Titles";
import { TextInput } from "src/components/Inputs";
import { resetPasswordConfirm } from "src/store/actions";
import { connect } from "react-redux";
import React from "react";


const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  resetPasswordConfirm,
};


function ResetPasswordNotConnected({ resetPasswordConfirm }) {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const emailError = errors.email;
  const onSubmit = (formData) => {
    console.log(formData);
    resetPasswordConfirm({uid, token, ...formData})
  }
  return (
    <div className="flex-col items-center gap-xxxl justify-center self-stretch">
      <div className="flex flex-col items-start self-stretch gap-[10px]">
        <BackButton text="Home" link="/" />
      </div>
      <form className="flex flex-col w-full max-w-[420px] items-center gap-lg justify-center"
        onSubmit={handleSubmit(onSubmit)}>
        <AuthenticationTitle title="Reset password" subtitle="Reset your password below." />
        <div className="flex-col justify-center items-center gap-[20px] self-stretch">
          <div className="flex-col justify-center items-start gap-xs self-stretch">
            <TextInput {...register("new_password")} title="New password" type="password" placeholder="" />
            <TextInput {...register("re_new_password")} title="Confirm password" type="password" placeholder="" />
          </div>
          <div className="flex-col justify-center items-center gap-xs self-stretch">
            <Button variant="r4-white" text="Change password" className="min-w-[60px] self-stretch items-center justify-center gap-xxs" />
            {false && <span className="text-error caption self-stretch">Passwords do not match.</span>}
          </div>
        </div>
      </form>
    </div>
  );
}

export const ResetPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordNotConnected);