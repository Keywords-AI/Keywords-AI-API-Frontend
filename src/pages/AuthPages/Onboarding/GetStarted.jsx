import React, { useEffect } from "react";
import { Button } from "src/components";
import cn from "src/utilities/classMerge";
import { updateUser } from "src/store/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { REDIRECT_URI } from "src/utilities/navigation";

const mapStateToProps = (state) => ({});
const mapDispatchToProps = { updateUser };
export const GetStarted = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ show = false, updateUser }) => {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        "flex-col self-stretch flex-grow justify-center gap-sm items-center",
        show ? "visible" : "invisible"
      )}
    >
      <TitleAuth
        title="Setup Complete!"
        subtitle={"Kickstart your journey to smarter LLM usage with Keywords AI."}
        align="items-center"
      />
      <Button
        variant="r4-primary"
        text="Get started"
        onClick={() => {
          updateUser({ onboarded: true });
          navigate(REDIRECT_URI);
        }}
      />
    </div>
  );
});
