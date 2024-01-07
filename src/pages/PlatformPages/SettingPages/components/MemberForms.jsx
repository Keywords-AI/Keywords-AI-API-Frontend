import { TextInput, SelectInput } from "src/components/Inputs"
import { Button } from "src/components/Buttons"
import { useForm } from "react-hook-form"
import { sendInvitation } from "src/store/actions"
import { connect } from "react-redux"
import { dispatchNotification } from "src/store/actions"

const mapStateToProps = (state) => ({
    organization: state.user.organization || {},
});
const mapDispatchToProps = {
    sendInvitation,
    dispatchNotification
};

export const AddMemberForm = connect(mapStateToProps, mapDispatchToProps)(({
    setOpen = () => { },
    sendInvitation,
    organization,
    dispatchNotification
}) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const onSubmit = async (data) => {
        if (!organization.id) {
            dispatchNotification({ type: "error", title: "You need to create an organization first" })
            return;
        }
        if (organization?.users?.find((user)=>user.email === data.email)) {
            dispatchNotification({ type: "error", title: "This user is already a member of your organization" })
            return;
        }
        sendInvitation({ ...data, organization: organization.id }, ()=>{setOpen(false)});
    }
    return (
        <form className="flex-col gap-sm w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="grid grid-cols-[1fr,160px] gap-xs self-stretch">
                <TextInput {...register("email")} title="Email" width="w-full" />
                <SelectInput
                    {...register("role")}
                    title="Role"
                    choices={[{ name: "Admin", value: "admin" }, { name: "Member", value: "member" }]}
                    placeholder="Member"
                    defaultValue="member"
                    width="w-full"
                />
            </div>
            <div className="flex-row justify-end self-stretch">
                <div className="flex-row gap-xs">
                    <Button variant="r4-black" text={"Cancel"}
                        type="button"
                        onClick={() => setOpen(false)} />
                    <Button variant="r4-primary" text="Invite" />
                </div>
            </div>
        </form>
    )
})