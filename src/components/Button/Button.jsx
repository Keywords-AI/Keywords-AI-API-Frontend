import cn from "src/utilities/ClassMerge";
import "./Button.css";
import { forwardRef } from "react";
import React from "react";

/**
 * `Button` Component
 *
 * Renders a button with various styling options.
 *
 * @component
 * @example
 * <Button
 *   variant="primary"
 *   text="Click Me"
 *   onClick={() => console.log('Clicked!')}
 * />
 *
 * @param {string} props.variant - The variant of the button. Options include "primary", "header", "secondary", "secondary-gray", "secondary-black", "news", "beta".
 * @param {string} props.text - The text displayed on the button.
 * @param {React.Element} [props.icon=null] - Icon component to be displayed on the button.
 * @param {string} [props.className=""] - Additional CSS classes for the button.
 * @param {string} [props.borderRadius="rounded-lg"] - The border radius of the button.
 * @param {Function} [props.onClick] - Function to call on button click.
 * @param {string} [props.textClassName="text-sm-regular"] - Additional CSS classes for the text on the button.
 * @param {string} [props.bgColor="bg-gray-white"] - The background color of the button.
 * @param {string} [props.hoverColor="hover:bg-[#33557D]"] - The hover background color of the button.
 * @param {string} [props.clickedColor="active:bg-[#33557D]"] - The background color of the button when clicked.
 * @param {string} [props.textColor="text-gray-black"] - The text color of the button.
 * @param {string} [props.textHoverColor="group-hover:text-gray-white"] - The text color of the button on hover.
 * @param {string} [props.textClickedColor="group-active:text-gray-white"] - The text color of the button when clicked.
 * @param {string} [props.iconFill="fill-gray-black"] - The fill color of the icon in the button.
 * @param {string} [props.iconHoverFill="fill-gray-white"] - The hover fill color of the icon in the button.
 * @param {string} [props.iconPosition="right"] - The direction of the icon in the button. Options are "right" or "left".
 * @param {string} [props.padding="py-xxs px-xs"] - The padding of the button.
 */

export const Button = forwardRef(
  (
    {
      variant,
      text,
      icon = null,
      className = "",
      borderRadius = "rounded-lg",
      onClick,
      textClassName = "text-sm-regular",
      bgColor = "bg-gray-white",
      hoverColor = "hover:bg-[#33557D]",
      clickedColor = "active:bg-[#33557D]",
      textColor = "text-gray-black",
      textHoverColor = "group-hover:text-gray-white",
      textClickedColor = "group-active:text-gray-white",
      iconFill = "fill-gray-black",
      iconHoverFill = "fill-gray-white",
      iconPosition = "left",
      padding = "py-xxs px-xs",
    },
    ref
  ) => {
    const [hover, setHover] = React.useState(false);
    switch (variant) {
      case "standard":
        bgColor = "bg-gray-2";
        textColor = "text-gray-4";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        hoverColor = "hover:bg-gray-2 hover:border-gray-4";
        clickedColor = "active:bg-gray-2 active:border-gray-4";
        borderRadius = "rounded-sm";
        className = cn(className, "border border-solid border-gray-3");
        iconFill = "fill-gray-4 group-hover:fill-gray-white";
        iconHoverFill = "fill-gray-white";
        break;
      case "api-action":
        bgColor = "bg-gray-2";
        textColor = "text-gray-4";
        textClassName = "text-sm-md";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        hoverColor = "hover:bg-gray-2 hover:border-gray-4";
        clickedColor = "active:bg-gray-2 active:border-gray-4";
        borderRadius = "rounded-sm";
        className = cn(className, "border border-solid border-gray-3");
        iconFill = "fill-gray-4 group-hover:fill-gray-white";
        iconHoverFill = "fill-gray-white";
        padding = "py-xxxs px-xxs";
        break;
      case "transparent":
        bgColor = "bg-transparent";
        textColor = "text-gray-white";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        hoverColor = "hover:bg-gray-2 hover:border-gray-3";
        clickedColor = "active:bg-gray-2 active:border-gray-3";
        borderRadius = "rounded-sm";
        className = cn(className, "border border-solid border-transparent");
        iconFill = "fill-gray-4 group-hover:fill-gray-white";
        iconHoverFill = "fill-gray-white";
        break;
      case "header":
        bgColor = "bg-transparent";
        hoverColor = "hover:bg-transparent";
        clickedColor = "active:bg-transparent";
        textColor = "text-gray-4";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        iconFill = "fill-gray-4";
        break;
      case "secondary":
        bgColor = "bg-gray-white";
        hoverColor = "hover:bg-gray-4";
        clickedColor = "active:bg-gray-4";
        textColor = "text-gray-black";
        textHoverColor = "group-hover:text-gray-black";
        textClickedColor = "group-active:text-gray-black";
        iconFill = "fill-gray-black";
        break;
      case "secondary-gray":
        bgColor = "bg-gray-2";
        hoverColor = "hover:bg-gray-4";
        clickedColor = "active:bg-gray-3";
        textColor = "text-gray-white";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        iconFill = "fill-gray-white";
        break;
      case "secondary-black":
        bgColor = "bg-gray-black";
        hoverColor = "hover:bg-gray-2";
        clickedColor = "active:bg-gray-2";
        textColor = "text-gray-white";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        iconFill = "fill-gray-white";
        className = cn(className, "border border-solid border-gray-3");
        break;
      case "news":
        className = cn(className, "border border-solid border-gray-3");
        bgColor = "bg-gray-2";
        borderRadius = "rounded-lg";
        textColor = "text-gray-white";
        iconFill = "fill-gray-white";
      case "beta":
        bgColor = "bg-gradient-in";
        textColor = "text-gray-white";
        hoverColor = "bg-gradient-in";
        clickedColor = "black-gradient";
        borderRadius = "rounded-lg";
        className = cn(
          className,
          "hover:cursor-default gradient-in max-h-[36px] tracking-[0.56px]"
        );
    }
    return (
      <button
        ref={ref}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn(
          "group inline-flex min-w-[60px] justify-center items-center gap-xxs  ",
          borderRadius,
          bgColor,
          hoverColor,
          clickedColor,
          className,
          iconPosition === "left" ? "flex-row-reverse" : "flex-row",
          padding
        )}
        onClick={onClick}
      >
        <span
          className={cn(
            "flex-1 text-center",
            textColor,
            textHoverColor,
            textClickedColor,
            textClassName
          )}
        >
          {text}
        </span>
        {icon && (
          <div className="flex  justify-center items-center gap-[10px]">
            {React.createElement(icon, {
              fill: hover ? iconHoverFill : iconFill,
            })}
          </div>
        )}
      </button>
    );
  }
);
