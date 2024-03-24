import { BackButton } from "src/components/Buttons/BackButton";
import { Button } from "src/components/Buttons/Button";
import React, { useEffect } from "react";
import { resendActivationEmail } from "src/store/actions";
import { TitleAuth } from "src/components/Titles";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { TextInput } from "src/components/Inputs";
import { useForm } from "react-hook-form";

const mapStateToProps = (state) => ({});
const mapDispatchToProps = { resendActivationEmail };
function EmailConfirmation({ resendActivationEmail }) {
  const {register, handleSubmit, formState: {errors}} = useForm();

  return (
    <div className="flex-col items-center gap-xxxl justify-center self-stretch">
      <BackButton text="Home" link="/" />
      <form className="flex-col w-full max-w-[420px] items-center gap-md "
      onSubmit={handleSubmit((data) => {
        resendActivationEmail(data.email);
      })}
      >
        <TitleAuth
            title="Email Confirmation"
            subtitle="Check your email for a confirmation link."
        />
        <TextInput placeholder="email@example.com" {...register("email")} />
        <Button
            text="Resend Confirmation Email"
            variant={"r4-gray-2"}
            width={"w-full"}
        />
      </form>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmation);