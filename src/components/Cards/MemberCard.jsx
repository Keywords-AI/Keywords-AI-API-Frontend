import React from 'react'
import { connect } from 'react-redux'
import { AvatarButton } from 'src/components/Buttons'
import { SelectInput } from 'src/components/Inputs'
import { Down } from 'src/components/Icons'

export const SelectionTrigger = ({ firstName, lastName, selected, placeholder, onClick }) => {
    const handleClick = (e) => {
        onClick(e);
    }
    return (
        <div className="flex-row items-center gap-sm w-[240px] cursor-pointer"
            onClick={handleClick}>
            <AvatarButton firstName={firstName} size="md" />
            <div className="flex flex-col">
                <div className="text-md-medium text-gray-white">{firstName} {lastName}</div>
                <div className="flex-row gap-xxs items-center">
                    <div className="text-sm-regular text-gray-4">{selected || placeholder}</div>
                    <Down />
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
            trigger={SelectionTrigger}
            defaultValue="Member"
            triggerProps={{ firstName, lastName }}
        />
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MemberCard)