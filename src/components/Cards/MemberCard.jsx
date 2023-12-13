import React from 'react'
import { connect } from 'react-redux'
import { AvatarButton } from 'src/components/Buttons'
import { MemberSelectInput, SelectInput } from 'src/components/Inputs'


export const MemberCard = ({ first_name, last_name }) => {
    return (
        <div className="flex-row items-center gap-sm w-[240px]">
            <AvatarButton first_name={first_name} size="w-[36px] h-[36px]" />
            <div className="flex flex-col">
                <div className="text-md-medium text-gray-white">{first_name} {last_name}</div>
                <SelectInput variant={"member"} placeholder="placeholder" headLess />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MemberCard)