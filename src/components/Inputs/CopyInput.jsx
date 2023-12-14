import React from 'react'
import { connect } from 'react-redux'
import { TextInput } from 'src/components/Inputs'
import { CopyButton } from 'src/components/Buttons'

const CopyInput = ({ text }) => {
    return (
        <div className="relative flex-col">
            <TextInput value={text} disabled />
            <CopyButton
                text={text}
                className="absolute right-xs top-1/2 -translate-y-xxxs"
            />
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CopyInput)