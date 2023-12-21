import React from 'react'
import { connect } from 'react-redux'
import { AvatarButton } from 'src/components/Buttons'
import { SelectInput } from 'src/components/Inputs'
import { Down } from 'src/components/Icons'

export const SelectionTrigger = ({ firstName, lastName, selected, placeholder, onClick }) => {
    const handleClick = (e) => {
        onClick(e);
    }
    const [hover, setHover] = React.useState(false);
    return (
        <div className="flex-row items-center gap-xs w-[240px] cursor-pointer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleClick}>
            <AvatarButton firstName={firstName} size="md" />
            <div className="flex flex-col">
                <div className="text-md-medium text-gray-white">{firstName} {lastName}</div>
                <div className="flex-row gap-xxs items-center">
                    <div className="text-sm-regular text-gray-4">{selected || placeholder}</div>
                    <Down active={hover}/>
                </div>
            </div>
        </div>
    )
}

export const MemberCard = ({ firstName, lastName }) => {
    const [show, setShow] = React.useState(false);
    return (
        <SelectInput
            placeholder="placeholder"
            headLess
            choices={[
                { name: "Member", value: "Member" },
                { name: "Admin", value: "Admin" },
                { name: "Owner", value: "Owner" },
            ]}
            trigger={SelectionTrigger}
            defaultValue="Member"
            align="start"
            alignOffset={32}
            triggerProps={{ firstName, lastName }}
        />
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MemberCard)