import React from 'react'
import useForwardRef from 'src/hooks/useForwardRef';

const TextAreaInput = React.forwardRef(({ register = () => { }, name, validationSchema, onChange }, ref) => {
    const inputRef = useForwardRef(ref);
    const keyPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.target.form.requestSubmit();
        }
    }
    return (
        <textarea
            className="bg-gray-2"
            ref={inputRef}
            onKeyDown={keyPress}
            onChange={onChange}
            name={name}
            {...register(name, validationSchema)}
        />
    )
})

export default TextAreaInput;