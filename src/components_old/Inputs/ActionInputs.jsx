import React from 'react'
import { connect } from 'react-redux'
import { TextInput } from 'src/components/Inputs'
import { CopyButton, IconButton } from 'src/components/Buttons'
import { Delete } from 'src/components/Icons'

export const CopyInput = ({ value, title, disabled }) => {
    return (
        <div className="relative flex-col">
            <TextInput value={value} title={title} disabled={disabled} width="w-[400px]" />
            <CopyButton
                text={value}
                className="absolute right-xs bottom-[10px]"
            />
        </div>
    )
}

export const DeleteInput = React.forwardRef(({ 
    name, 
    value, 
    title, 
    onClick = () => { }, 
    placeholder, 
    onChange = () => { } 
}, ref) => {
    const [prevValue, setPrevValue] = React.useState(value)
    const handleChange = (e) => {
        setPrevValue(e.target.value)
        onChange(e)
    }
    return (
        <div className="relative flex-col">
            <TextInput
                placeholder={placeholder || ""}
                name={name}
                title={title}
                ref={ref}
                onChange={(e) => { setPrevValue(e.target.value) }}
                width="w-full"
                action={<IconButton
                    icon={Delete}
                    text={value}
                    onClick={() => { setPrevValue(''); onClick(); }
                    }
                />}
            />
        </div>
    )
})

