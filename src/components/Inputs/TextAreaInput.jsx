import React from "react";
import useForwardRef from "src/hooks/useForwardRef";
import cn from "src/utilities/classMerge";

const TextAreaInput = React.forwardRef(
  (
    {
      name = "textarea",
      title,
      register = () => {},
      errors = null,
      required = false,
      validationSchema = null,
      value,
      onChange,
      placeholder = "Enter text here",
      disabled = false,
      width = "w-full",
      height = "h-full",
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const handleBlur = (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setIsFocused(false);
      }
    };
    const inputRef = useForwardRef(ref);
    return (
      <div
        className={cn(
          "flex-col justify-center items-start gap-xxs ",
          width,
          height
        )}
        onClick={() => setIsFocused(true)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
      >
        {title && (
          <label htmlFor={name} className="text-sm-regular text-gray-4">
            {title}
            {required && " *"}
          </label>
        )}
        <textarea
          id={name}
          ref={inputRef}
          name={name}
          placeholder={placeholder}
          className={cn(
            "px-xs py-xxs text-sm-regular rounded-sm bg-transparent outline-none self-stretch w-full h-full placeholder:text-gray-4 box-border resize-none",
            isFocused && !disabled
              ? "border shadow-gray-white"
              : "border shadow-gray-3",
            !disabled ? "text-gray-white" : "text-gray-3"
          )}
          {...register(name, validationSchema)}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {errors && errors[name] && (
          <span className="text-error caption">{errors[name]?.message}</span>
        )}
      </div>
    );
  }
);

export default TextAreaInput;
