import React from 'react'
import { connect } from 'react-redux'
import { TextInput } from 'src/components/Inputs'
import { CopyButton } from 'src/components/Buttons'

const CopyInput = ({ value, title }) => {
    return (
        <div className="relative flex-col">
            <TextInput value={value} title={title} disabled />
            <CopyButton
                text={value}
                className="absolute right-xs bottom-[10px]"
            />
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CopyInput)