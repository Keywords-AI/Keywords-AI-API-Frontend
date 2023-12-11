import React from "react";
import cn from "src/utilities/ClassMerge";

/**
 * `TextInput` is a reusable input component for forms.
 *
 * Props:
 * @param {string} name - The name of the input, used for the label and input element. Default is "text-sm".
 * @param {function} register - Function from react-hook-form for registering the input. Default is a no-op function.
 * @param {object} errors - Object containing validation errors from react-hook-form.
 * @param {boolean} required - If true, marks the input as required with an asterisk (*). Default is false.
 * @param {string} type - The type of input (e.g., "text", "number", "email"). Default is "text".
 * @param {object} validationSchema - Validation rules for the input, used with react-hook-form.
 * @param {JSX.Element|null} icon - An optional icon to be displayed on the left side of the input. Default is null.
 * @param {string} value - The current value of the input. This makes the component a controlled input.
 * @param {function} onChange - Function to handle input changes. It should update the state that holds the input's value.
 * @param {boolean} disabled - If true, disables the input. Default is false.
 *
 * The component renders an input field with an optional icon, label, and validation error messages.
 * It integrates with react-hook-form for form handling and validation.
 * if used within react-hook-form, the `register` prop should be passed in.
 * and the value and onChange do not need to be passed in.
 */
export function TextInput({
  name = "text-sm",
  register = () => {},
  errors = null,
  required = false,
  type = "text",
  validationSchema = null,
  icon = null,
  value, // Add value prop
  onChange, // Add onChange prop
  disabled = false,
  width = "w-[400px]",
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocused(false);
    }
  };

  return (
    <div
      className={cn("flex-col justify-center items-start gap-xxs",
        width)}
      onClick={() => setIsFocused(true)}
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
    >
      <label htmlFor={name} className="text-sm-regular text-gray-4">
        {name}
        {required && "*"}
      </label>
      <div
        className={cn(
          "flex items-center gap-xxxs px-xs py-xxs rounded-sm border border-solid border-gray-3 self-stretch",
          isFocused && !disabled ? "border-gray-white" : "",
          disabled ? "bg-gray-2" : ""
        )}
      >
        {icon && <div className="icon-container">{icon}</div>}{" "}
        {/* Render the icon */}
        <input
          id={name}
          name={name}
          type={type}
          className={cn(
            "text-sm-regular text-gray-4 bg-transparent outline-none self-stretch",
            isFocused && !disabled ? "text-gray-white" : ""
          )}
          {...register(name, validationSchema)}
          value={value} // Bind the value prop to the input
          onChange={onChange} // Use the onChange handler
          disabled={disabled}
        />
      </div>
      {errors && errors[name] && (
        <span className="text-error caption">{errors[name]?.message}</span>
      )}
    </div>
  );
}
