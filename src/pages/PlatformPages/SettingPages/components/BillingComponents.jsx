import React, { useEffect } from "react";
import { connect } from "react-redux";
import useFetch from "src/hooks/useFetch";
import { cancelSubscription } from "src/services/stripe";
import { TextInput } from "src/components/Inputs";
import { useForm } from "react-hook-form";
import { Button } from "src/components/Buttons";
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

const CancelPlanFormNotConnected = React.forwardRef(({ setCanceling }, ref) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleClose = (e) => {
    setCanceling(false);
  }
  const onSubmit = (data) => {
    console.log(data);
    cancelSubscription(data);
  };
  return (
    <form ref={ref}
      className={"flex-col gap-sm self-stretch relative"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        title={"Reason for cancel"}
        width={"w-full"}
        {...register("reason")}
        // onKeyDown={handleEnter}
        placeholder={"Leave your reason here..."}
      />
      <div className="flex-row justify-end self-stretch">
        <div className="flex-row gap-xs">
          <Button variant="r4-gray-2" text={"Undo"}
            type="button"
            onClick={handleClose} />
          <Button variant="r4-red" text={"Cancel plan"} />
        </div>
      </div>
    </form>
  )
})

export const CanelPlanForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CancelPlanFormNotConnected);
