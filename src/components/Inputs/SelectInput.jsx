import React, { useEffect } from 'react';
import { Button } from 'src/components/Buttons'
import cn from 'src/utilities/ClassMerge';
import { Select as SelectionIcon } from 'src/components/Icons'

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

const MyComponent = React.forwardRef((props, ref) => {
    const {
        title = "selection",
        name = "text-sm",
        choices = defaultOptions, // Choices, list of objects or strings, as long as you define the way 
        handleSelected = () => { }, // Function to handle the selected choice in the parent component
        placeholder, // This is the option to display. It is an actual option
        readOnly,
        required = false,
        width = "w-[400px]",
        register = () => { },
        validationSchema = null,
    } = props;
    const [focused, setIsFocused] = React.useState(false);
    const [selected, setSelected] = React.useState(placeholder);
    const selectRef = React.useRef(null);
    const [optionsVisible, setOptionsVisible] = React.useState(false);
    // Click outside to close
    const handleFocus = () => {
        setIsFocused(true);
        setOptionsVisible(true);
    };
    const handleBlur = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsFocused(false);
            setOptionsVisible(false);
        }
    };
    // End click outside to close

    const handleChange = (choice) => {
        setSelected(choice.name);
        handleSelected(choice.value);
        setOptionsVisible(false);
    };


    return (
        <div className={cn("flex-col justify-center items-start gap-xxs",
            width)}>
            <label htmlFor={name} className="text-sm-regular text-gray-4">
                {title}
                {required && "*"}
            </label>
            <div
                className="flex-col self-stretch"
                ref={selectRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
            >
                <div className="flex-col relative">
                    <input
                        type="text"
                        className="flex-row py-xxs px-xs rounded-sm justify-between items-center self-stretch text-sm text-gray-4 focus:text-gray-white border border-gray-3 focus:border-gray-3 cursor-pointer outline-none bg-gray-black" aria-label="select"
                        value={selected}
                        ref={ref}
                        readOnly
                        {...register(name, validationSchema)}
                    />
                    {!readOnly && <div className="flex-col absolute right-xs top-1/2 -translate-y-1/2">
                        <SelectionIcon />
                    </div>}
                </div>
                {optionsVisible &&
                    <div className="flex-col justify-start items-start self-stretch bg-gray-2">
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