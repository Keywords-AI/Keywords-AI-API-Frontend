import cn from "src/utilities/ClassMerge";
import "./Button.css";
import { forwardRef } from "react";
import React from "react";
import { ArrowRight } from "src/components/Icons";

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
 * na
 * @param {string} props.active - The state of the button. If true, the button will be displayed as active.
 * @param {string} props.variant - The variant of the button. Options include "primary", "header", "secondary", "secondary-gray", "secondary-black", "beta".
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
 * @param {string} [props.borderColor="border-transparent"] - The border color of the button.
 * @param {string} [props.borderHoverColor="hover:border-transparent"] - The border color of the button on hover.
 * @param {string} [props.justification="justify-center"] - The justification of the button. Options are "justify-center" or "justify-start".
 * @param {React.Element} [props.children=null] - The children of the button. Custom children will override the text and icon props.
 */

export const Button = forwardRef(
  (
    {
      active=false,
      variant,
      text,
      icon = null,
      className = "",
      borderRadius = "",
      onClick,
      onMouseEnter = () => {},
      onMouseLeave = () => {},
      textClassName = "",
      bgColor = "",
      hoverColor = "",
      clickedColor = "",
      textColor = "",
      textHoverColor = "",
      textClickedColor = "",
      iconFill = "",
      iconHoverFill = "",
      iconPosition = "left",
      iconSize = "sm",
      padding = "py-xxs px-xs",
      borderColor = "border-transparent",
      borderHoverColor = "hover:border-transparent",
      justification = "justify-center",
      minWidth = "min-w-[60px]",
      children,
      // ...props
    },
    ref
  ) => {
    const [hover, setHover] = React.useState(false);
    switch (variant) {
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
        break;
      case "r4-white":
        bgColor = "bg-gray-white";
        hoverColor = "hover:bg-gray-4";
        clickedColor = "active:bg-gray-4";
        textColor = "text-gray-black";
        textHoverColor = "group-hover:text-gray-black";
        textClickedColor = "group-active:text-gray-black";
        borderRadius = "rounded-sm";
        padding = "py-xxs px-xs";
        break;
      case "r4-gray-2":
        bgColor = "bg-gray-2";
        hoverColor = "hover:bg-gray-2";
        clickedColor = "active:bg-gray-2";
        textColor = "text-gray-4";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        borderRadius = "rounded-sm";
        borderColor = "border-gray-3";
        borderHoverColor = "hover:border-gray-4";
        padding = "py-xxs px-xs";
        break;
      case "r4-primary":
        bgColor = "bg-primary";
        hoverColor = "hover:bg-primary";
        clickedColor = "active:bg-primary";
        textColor = "text-gray-white";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        borderRadius = "rounded-sm";
        borderColor = "border-transparent";
        borderHoverColor = "hover:border-gray-4";
        padding = "py-xxs px-xs";
      case "r4-red":
        bgColor = "bg-error";
        hoverColor = "hover:bg-error";
        clickedColor = "active:bg-error";
        textColor = "text-gray-white";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        borderRadius = "rounded-sm";
        borderColor = "border-transparent";
        borderHoverColor = "hover:border-gray-4";
        padding = "py-xxs px-xs";
        break;
      case "r4-black":
        bgColor = "bg-gray-black";
        hoverColor = "hover:bg-gray-2";
        clickedColor = "active:bg-gray-2";
        textColor = "text-gray-4";
        textHoverColor = "group-hover:text-gray-4";
        textClickedColor = "group-active:text-gray-4";
        borderRadius = "rounded-sm";
        borderHoverColor = "hover:border-gray-3";
        padding = "py-xxs px-xs";
        iconFill = "fill-gray-4";
        iconHoverFill = "group-hover:fill-gray-4";
        justification = "justify-start";
        break;
      case "small":
        bgColor = "bg-gray-2";
        hoverColor = "hover:bg-gray-2";
        clickedColor = "active:bg-gray-2";
        textColor = "text-gray-4";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        borderRadius = "rounded-sm";
        borderColor = "border border-solid border-gray-3";
        borderHoverColor = "hover:border-gray-4";
        padding = "py-xxxs px-xxs";
        iconFill = "fill-gray-4";
        iconHoverFill = "fill-gray-white";
        break;
      case "r18-white":
        bgColor = "bg-gray-white";
        hoverColor = "hover:bg-gray-black";
        clickedColor = "active:bg-gray-black";
        textColor = "text-gray-black";
        textClassName = "text-sm-regular";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        borderRadius = "rounded-lg";
        padding = "py-xxs px-sm";
        iconFill = "fill-gray-black";
        iconHoverFill = "fill-gray-black";
        borderHoverColor = "hover:border-gray-white";
        break;
      case "r18-black":
        bgColor = "bg-gray-black";
        hoverColor = "hover:bg-gray-3";
        clickedColor = "active:bg-gray-3";
        textClassName = "text-sm-regular";
        textColor = "text-gray-4";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        borderRadius = "rounded-lg";
        padding = "py-xxs px-sm";
        iconFill = "fill-gray-4";
        iconHoverFill = "fill-gray-white";
        break;
      case "header":
        bgColor = "bg-transparent";
        textClassName = "text-sm-regular";
        hoverColor = "";
        clickedColor = "";
        textColor = textColor || "text-gray-4";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        padding = "py-xxs px-xs";
        break;
      case "footer":
        bgColor = "bg-transparent";
        textClassName = "caption";
        hoverColor = "";
        clickedColor = "";
        textColor = "text-gray-4";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        padding = "py-xxs px-xs";
        break;
      case "panel":
        bgColor = "bg-transparent hover:bg-gray-3";
        textClassName = "text-sm-md";
        hoverColor = "bg-gray-3";
        clickedColor = "active:bg-gray-3";
        textColor = "text-gray-4";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        borderRadius = "rounded-sm";
        padding = "py-xxs px-xs";
        justification = "justify-end";
        className = "w-full";
        iconFill = "fill-gray-4";
        iconHoverFill = "fill-gray-white";
        break;
      case "careers":
        bgColor = "bg-transparent";
        textClassName = "text-md-md";
        hoverColor = "";
        clickedColor = "";
        iconPosition = "right";
        textColor = "text-primary";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        borderRadius = "rounded-sm";
        padding = "py-xxs px-xs";
        iconFill = "fill-primary";
        iconHoverFill = "fill-gray-white";
        break;
      case "chat":
        bgColor = "bg-gray-2";
        textClassName = "text-sm-regular";
        hoverColor = "hover:bg-gray-2";
        clickedColor = "active:bg-gray-black";
        textColor = "text-gray-4";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        borderColor = "border border-gray-3";
        borderHoverColor = "hover:border-gray-4";
        borderRadius = "rounded-sm";
        padding = "py-xxs px-xs";
        justification = "justify-center";
        className = "w-[256px]";
        break;
      case "icon":
        bgColor = "bg-gray-2";
        hoverColor = "hover:bg-gray-2";
        clickedColor = "active:bg-gray-2";
        textColor = "text-gray-4";
        textHoverColor = "group-hover:text-gray-white";
        textClickedColor = "group-active:text-gray-white";
        borderRadius = "rounded-sm";
        borderColor = "border border-solid border-gray-3";
        borderHoverColor = "hover:border-gray-4";
        padding = "py-xxs px-xxs";
        iconFill = "fill-gray-4";
        iconHoverFill = "fill-gray-white";
        minWidth = "";
        break;
    }
    if (active) {
      bgColor = hoverColor;
      textColor = textClickedColor;
      iconFill = iconHoverFill;
    }
    return (
      <button
        aria-label={"button-" + variant}
        ref={ref}
        onMouseEnter={() => {
          onMouseEnter();
          setHover(true);
        }}
        onMouseLeave={() => {
          onMouseLeave();
          setHover(false);
        }}
        className={cn(
          "group inline-flex items-center gap-xxs border border-solid ",
          minWidth,
          justification,
          borderRadius,
          bgColor,
          hoverColor,
          clickedColor,
          className,
          iconPosition === "left" ? "flex-row-reverse" : "flex-row",
          padding,
          borderColor,
          borderHoverColor,
          "text-center"
        )}
        onClick={onClick}
      >
        {children ? (
          <>{children}</>
        ) : (
          <>
            {text && (
              <span
                className={cn(
                  textColor,
                  textHoverColor,
                  textClickedColor,
                  textClassName
                )}
              >
                {text}
              </span>
            )}
            {icon && (
              <div className="flex justify-center items-center w-[16px] gap-[10px]">
                {React.createElement(icon, {
                  fill: hover ? iconHoverFill : iconFill,
                  size: iconSize,
                })}
              </div>
            )}
          </>
        )}
      </button>
    );
  }
);
