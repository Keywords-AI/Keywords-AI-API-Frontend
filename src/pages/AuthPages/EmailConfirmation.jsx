import { BackButton } from "src/components/Buttons/BackButton";
import { Button } from "src/components/Buttons/Button";
import React, { useEffect } from "react";
import { resendActivationEmail } from "src/store/actions";
import { TitleAuth } from "src/components/Titles";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({});
const mapDispatchToProps = { resendActivationEmail };

function EmailConfirmation({ resendActivationEmail }) {
const { email } = useParams();
  return (
    <div className="flex-col items-center gap-xxxl justify-center self-stretch">
      <BackButton text="Home" link="/" />
      <div className="flex-col w-full max-w-[420px] items-center gap-md ">
        <TitleAuth
            title="Email Confirmation"
            subtitle="Check your email for a confirmation link."
        />
        <Button
            text="Resend Confirmation Email"
            variant={"r4-white"}
            width={"w-full"}
            onClick={() => {
              resendActivationEmail(email);
            }}
        />
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmation);