import { TextInput, SelectInput } from "src/components/Inputs"
import { Button } from "src/components/Buttons"

export const AddMemberForm = ({ setOpen = () => { } }) => {
    const handleClose = (e) => {
        setOpen(false);
    }
    return (
        <form className="flex-col gap-sm w-full">
            <div className="grid grid-cols-[1fr,160px] gap-xs self-stretch">
                <TextInput title="Email" width="w-full" />
                <SelectInput title="Role"
                    choices={[{ name: "Admin", value: "admin" }, { name: "Member", value: "member" }]}
                    placeholder="Member"
                    defaultValue="Member"
                    width="w-full"
                />
            </div>
            <div className="flex-row justify-end self-stretch">
                <div className="flex-row gap-xs">
                    <Button variant="r4-gray-2" text={"Cancel"}
                        type="button"
                        onClick={handleClose} />
                    <Button variant="r4-primary" text="Invite" />
                </div>
            </div>
        </form>
    )
}