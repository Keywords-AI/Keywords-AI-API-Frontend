import React from 'react'
import { connect } from 'react-redux'
import { BackButton, Button } from 'src/components/Buttons'
import { TitleAuth } from 'src/components/Titles'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import usePost from 'src/hooks/usePost'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export const ActivationPage = (props) => {
  const { loading, error, data, postData } = usePost({
    path: "auth/users/activation/"
  });
  const { uid, token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(uid, token)
    // postData({ uid, token })
  };
  return (
    <div className="flex-col items-center gap-xxxl justify-center self-stretch">
      <div className="flex-col items-start gap-[10px] self-stretch">
        <BackButton text="Home" link={"/"} />
      </div>
      <div className=" flex-col w-full max-w-[420px] items-center gap-lg justify-center ">
        <TitleAuth
          title={"Activate your account"}
          subtitle={`Click the button below to confirm your activation for your account`}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-col justify-center items-center gap-[20px] self-stretch"
        >
          <div className="flex-col items-center justify-center gap-xs self-stretch">
            <Button
              text={"Confirm activation"}
              variant={"r4-white"}
              className="min-w-[60px] self-stretch items-center justify-center gap-xxs"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivationPage)