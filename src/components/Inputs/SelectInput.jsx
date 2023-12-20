import React, { useEffect } from 'react';
import { Button } from 'src/components/Buttons'
import cn from 'src/utilities/classMerge';
import { Select as SelectionIcon, Down } from 'src/components/Icons'
import { DropDownMenu } from 'src/components/Dialogs';
import * as DropdownPrimitives from "@radix-ui/react-dropdown-menu";

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
    choices = defaultOptions, // Choices, list of objects 
    handleSelected = () => { }, // Function to handle the selected choice in the parent component
    placeholder = "This is a selection", // This is the option to display. It is an actual option
    defaultValue = "",
    onChange = () => { },
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
    trigger,
    triggerProps = {}
}, ref) => {

    const handleChange = (choice) => {
        setSelected(choice.name);
        handleSelected(choice.value);
    };
    // Initialize after the switch
    const [selected, setSelected] = React.useState(defaultValue);
    const [optionsVisible, setOptionsVisible] = React.useState(open);

    return (
        <div className={cn("flex-col justify-center items-start gap-xxs relative")}>
            {!headLess && <label htmlFor={name} className="text-sm-regular text-gray-4">
                {title}
                {required && "*"}
            </label>}
            <input
                type="text" // The actual ref
                className="hidden"
                value={selected}
                ref={ref}
                readOnly
                hidden
                onChange={onChange}
                {...register(name, validationSchema)}
            />
            <DropDownMenu
                open={optionsVisible}
                setOpen={setOptionsVisible}
                trigger={
                    trigger ?
                        <div className='flex-col self-stretch'>
                            {React.createElement(trigger, { selected, placeholder, ...triggerProps })}
                        </div> :
                        <div
                            className={cn("flex-row relative gap-xxs items-center self-stretch", width)}
                        >
                            <div
                                // The displayed selection tab
                                className={cn("flex-row justify-between items-center self-stretch flex-1 cursor-pointer outline-none",
                                    padding, border, borderRadius, text
                                )} aria-label="select">
                                {selected || placeholder}
                            </div>
                            {!readOnly && <div className={cn("flex-col",
                                internalIcon ? "absolute right-xs top-1/2 -translate-y-1/2" : ""
                            )}>
                                {React.createElement(icon, { active: optionsVisible })}
                            </div>}
                        </div>
                } // The trigger elements, the buttons
                items={
                    <>
                        {choices && choices.length > 0 && choices.map((choice, index) => {
                            return (
                                <DropdownPrimitives.Item key={index} className="w-full">
                                    <Button
                                        text={choice?.name}
                                        variant="panel"
                                        onClick={() => { handleChange(choice) }}
                                    />
                                </DropdownPrimitives.Item>
                            )
                        })}
                    </>
                } // The items to be displayed in the dropdown
                align='start'
                alignOffset={32}
                side="bottom"
                width="min-w-0"
            />
        </div >
    )
})

const SelectInput = React.memo(MyComponent);
export default SelectInput;