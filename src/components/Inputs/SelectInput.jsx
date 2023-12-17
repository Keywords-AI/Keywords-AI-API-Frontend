import React, { useEffect } from 'react';
import { Button } from 'src/components/Buttons'
import cn from 'src/utilities/ClassMerge';
import { Select as SelectionIcon, Down } from 'src/components/Icons'

/**
 * MyComponent - A custom React component for a select input with options.
 * @param {Object} props - Component props.
 * @param {string} [props.title="selection"] - The title or label for the select input.
 * @param {string} [props.name="text-sm"] - The name attribute for the input element.
 * @param {Array} [props.choices=defaultOptions] - An array of choices for the select input.
 * @param {Function} [props.handleSelected=() => {}] - A function to handle the selected choice in the parent component.
 * @param {string} [props.placeholder] - The placeholder text for the input.
 * @param {boolean} [props.readOnly] - If `true`, the input is read-only.
 * @param {boolean} [props.required=false] - If `true`, indicates that the input is required.
 * @param {string} [props.width="w-[400px]"] - The width CSS class for the component.
 * @param {Function} [props.register=() => {}] - A function for registering the input with a form library.
 * @param {null|object} [props.validationSchema=null] - A validation schema for the input (if using form validation).
 * @returns {React.Component} A custom select input component.
 */

const defaultOptions = [
    { name: "AA", value: "aa" },
    { name: "BB", value: "bb" }
]

const MyComponent = React.forwardRef(({
    variant,
    open,
    title = "selection",
    headLess = false,
    name = "text-sm",
    choices = defaultOptions, // Choices, list of objects or strings, as long as you define the way 
    handleSelected = () => { }, // Function to handle the selected choice in the parent component
    placeholder, // This is the option to display. It is an actual option
    defaultValue = "",
    readOnly,
    required = false,
    internalIcon = true,
    width = "w-[400px]",
    register = () => { },
    validationSchema = null,
    padding = "py-xxs px-xs",
    border = "border border-gray-3 focus:border-gray-3",
    borderRadius = "rounded-sm",
    text = "text-sm text-gray-4 focus:text-gray-white",
    icon = SelectionIcon,
}, ref) => {
    // Click outside to close
    const handleClickOutside = (e) => {
        if (selectRef.current && !selectRef.current.contains(e.target)) {
            setOptionsVisible(false);
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    // End click outside to close

    const handleChange = (choice) => {
        setSelected(choice.name);
        handleSelected(choice.value);
        setOptionsVisible(false);
    };

    switch (variant) {
        case "member":
            padding = "p-0"
            border = "border-none"
            borderRadius = "rounded-none"
            text = "text-sm text-gray-4"
            placeholder = "Select a role"
            defaultValue = "Member"
            internalIcon = false
            width = ""
            icon = Down
            break;
    }

    // Initialize after the switch
    const [focused, setFocused] = React.useState(open);
    const [selected, setSelected] = React.useState(defaultValue);
    const selectRef = React.useRef(null);
    const [optionsVisible, setOptionsVisible] = React.useState(open);
    useEffect(() => {
        setOptionsVisible(open);
        setFocused(open);
    }, [open])

    return (
        <div className={cn("flex-col justify-center items-start gap-xxs relative",
            width)}>
            {!headLess && <label htmlFor={name} className="text-sm-regular text-gray-4">
                {title}
                {required && "*"}
            </label>}
            <div
                aria-label="select-wrapper"
                className="flex-col self-stretch text-sm-regular"
                ref={selectRef}
            >
                <div
                    aria-label="input-wrapper"
                    className="flex-row relative gap-xxs items-center self-stretch"
                    onFocus={() => { setFocused(true) }}
                    onBlur={() => { setFocused(false) }}
                >
                    <input
                        type="text" // The actual ref
                        className="hidden"
                        value={selected}
                        ref={ref}
                        readOnly
                        {...register(name, validationSchema)}
                    />
                    <div className="flex-col self-stretch flex-1" // Wrapper for triggering extra states
                        onClick={() => {
                            setOptionsVisible(!optionsVisible);
                            setFocused(true);
                        }}
                    >
                        <div
                            // The displayed selection tab
                            className={cn("flex-row justify-between items-center self-stretch flex-1 cursor-pointer outline-none",
                                padding, border, borderRadius, text
                            )} aria-label="select">
                            {selected || placeholder}
                        </div>
                    </div>
                    {!readOnly && <div className={cn("flex-col",
                        internalIcon ? "absolute right-xs top-1/2 -translate-y-1/2" : ""
                    )}>
                        {React.createElement(icon, { active: focused })}
                    </div>}
                </div>
                {optionsVisible &&
                    <div className={cn("flex-col justify-start items-start self-stretch bg-gray-2 ",
                        "absolute w-full top-full z-[1000]"
                    )
                    }>
                        {choices && choices.length > 0 && choices.map((choice, index) => {
                            return (
                                <Button
                                    text={choice?.name}
                                    variant="panel"
                                    onClick={() => {
                                        handleChange(choice)
                                    }}
                                    key={index}
                                />
                            )
                        })}
                    </div>}
            </div>
        </div>
    )
})

const SelectInput = React.memo(MyComponent);
export default SelectInput;