import React from 'react'
import { connect } from 'react-redux'
import { TextInput } from 'src/components/Inputs'
import { CopyButton, IconButton } from 'src/components/Buttons'
import { Delete } from 'src/components/Icons'

export const CopyInput = ({ value, title, disabled }) => {
    return (
        <div className="relative flex-col">
            <TextInput value={value} title={title} disabled={disabled} width="w-full" />
            <CopyButton
                text={value}
                className="absolute right-xs bottom-[10px]"
            />
        </div>
    )
}

export const DeleteInput = ({ prevValue, title, onClick = () => { }, placeholder }) => {
    const [value, setValue] = React.useState(prevValue)

    return (
        <div className="relative flex-col">
            <TextInput
                placeholder={placeholder || ""}
                value={value}
                title={title}
                onChange={(e) => { setValue(e.target.value) }}
                width="w-full"
            />
            <IconButton
                icon={Delete}
                text={value}

                className="absolute right-xs bottom-[10px]"
                onClick={() => { setValue(''); onClick(); }}
            />
        </div>
    )
}

