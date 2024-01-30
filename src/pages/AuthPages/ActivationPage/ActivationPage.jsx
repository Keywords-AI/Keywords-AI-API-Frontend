import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BackButton, Button } from 'src/components/Buttons'
import { TitleAuth } from 'src/components/Titles'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { activateUser } from 'src/store/actions'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { activateUser }

export const ActivationPage = ({ activateUser }) => {
  const [countDown, setCountDown] = React.useState(5);
  const { uid, token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    activateUser(uid, token);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown === 0) {
        window.location.href = "/login"
        return
      };
      setCountDown(countDown - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [countDown])
  useEffect(() => {
    activateUser(uid, token);
  }, [])
  return (
    <div className="flex-col items-center gap-xxxl justify-center self-stretch">
      <div className="flex-col items-start gap-xxs self-stretch">
        <BackButton text="Home" link={"/"} />
      </div>
      <div className=" flex-col w-full max-w-[420px] items-center gap-lg justify-center ">
        <TitleAuth
          title={"Activating your account..."}
          subtitle={`Click the button below if you did not get automatically  redirected in ${countDown} seconds`}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-col justify-center items-center gap-md self-stretch"
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