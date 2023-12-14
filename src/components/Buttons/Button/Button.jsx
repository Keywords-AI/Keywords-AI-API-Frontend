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
      active = false,
      variant,
      text,
      icon,
      className,
      borderRadius,
      onClick,
      onMouseEnter = () => {},
      onMouseLeave = () => {},
      textClassName,
      bgColor,
      hoverColor,
      clickedColor,
      textColor,
      textHoverColor,
      textClickedColor,
      iconFill,
      iconHoverFill,
      iconPosition = "left",
      iconSize = "sm",
      padding,
      borderColor,
      borderHoverColor,
      justification,
      minWidth = "min-w-[60px]",
      children,
      // ...props
    },
    ref
  ) => {
    const [hover, setHover] = React.useState(false);
    switch (variant) {
      case "secondary":
        bgColor = bgColor || "bg-gray-white";
        hoverColor = hoverColor || "bg-gray-4";
        clickedColor = clickedColor || "bg-gray-4";
        textColor = textColor || "text-gray-black";
        textHoverColor = textHoverColor || "text-gray-black";
        textClickedColor = textClickedColor || "text-gray-black";
        iconFill = iconFill || "fill-gray-black";
        break;
      case "secondary-gray":
        bgColor = bgColor || "bg-gray-2";
        hoverColor = hoverColor || "bg-gray-4";
        clickedColor = clickedColor || "bg-gray-3";
        textColor = textColor || "text-gray-white";
        textHoverColor = textHoverColor || "text-gray-white";
        textClickedColor = textClickedColor || "text-gray-white";
        iconFill = iconFill || "fill-gray-white";
        break;
      case "secondary-black":
        bgColor = bgColor || "bg-gray-black";
        hoverColor = hoverColor || "bg-gray-2";
        clickedColor = clickedColor || "bg-gray-2";
        textColor = textColor || "text-gray-white";
        textHoverColor = textHoverColor || "text-gray-white";
        textClickedColor = textClickedColor || "text-gray-white";
        iconFill = iconFill || "fill-gray-white";
        className = cn(className, "border border-solid border-gray-3");
        break;
      case "beta":
        bgColor = bgColor || "bg-gradient-in";
        textColor = textColor || "text-gray-white";
        hoverColor = hoverColor || "bg-gradient-in";
        clickedColor = clickedColor || "black-gradient";
        borderRadius = borderRadius || "rounded-lg";
        className = cn(
          className,
          "cursor-default gradient-in max-h-[36px] tracking-[0.56px]"
        );
        break;
      case "r4-white":
        bgColor = bgColor || "bg-gray-white";
        textClassName = textClassName || "text-sm-regular";
        hoverColor = hoverColor || "bg-gray-4";
        clickedColor = clickedColor || "bg-gray-4";
        textColor = textColor || "text-gray-black";
        textHoverColor = textHoverColor || "text-gray-black";
        textClickedColor = textClickedColor || "text-gray-black";
        borderRadius = borderRadius || "rounded-sm";
        padding = padding || "py-xxs px-xs";

        break;
      case "r4-gray-2":
        bgColor = bgColor || "bg-gray-2";
        hoverColor = hoverColor || "bg-gray-2";
        clickedColor = clickedColor || "bg-gray-2";
        textColor = textColor || "text-gray-4";
        textHoverColor = textHoverColor || "text-gray-white";
        textClickedColor = textClickedColor || "text-gray-white";
        borderRadius = borderRadius || "rounded-sm";
        borderColor = borderColor || "border-gray-3";
        borderHoverColor = borderHoverColor || "border-gray-4";
        padding = padding || "py-xxs px-xs";

        break;
      case "r4-primary":
        bgColor = bgColor || "bg-primary";
        hoverColor = hoverColor || "bg-primary";
        clickedColor = clickedColor || "bg-primary";
        textColor = textColor || "text-gray-white";
        textHoverColor = textHoverColor || "text-gray-white";
        textClickedColor = textClickedColor || "text-gray-white";
        borderRadius = borderRadius || "rounded-sm";
        borderColor = borderColor || "border-transparent";
        borderHoverColor = borderHoverColor || "border-gray-4";
        padding = padding || "py-xxs px-xs";
      case "r4-red":
        bgColor = bgColor || "bg-error";
        hoverColor = hoverColor || "bg-error";
        clickedColor = clickedColor || "bg-error";
        textColor = textColor || "text-gray-white";
        textHoverColor = textHoverColor || "text-gray-white";
        textClickedColor = textClickedColor || "text-gray-white";
        borderRadius = borderRadius || "rounded-sm";
        borderColor = borderColor || "border-transparent";
        borderHoverColor = borderHoverColor || "border-gray-4";
        padding = padding || "py-xxs px-xs";

        break;
      case "r4-black":
        bgColor = bgColor || "bg-gray-black";
        hoverColor = hoverColor || "bg-gray-2";
        textClassName = textClassName || "text-sm-regular";
        clickedColor = clickedColor || "bg-gray-2";
        textColor = textColor || "text-gray-4";
        textHoverColor = textHoverColor || "text-gray-4";
        textClickedColor = textClickedColor || "text-gray-4";
        borderRadius = borderRadius || "rounded-sm";
        borderColor = borderColor || "border-transparent";
        borderHoverColor = borderHoverColor || "border-gray-3";
        padding = padding || "py-xxs px-xs";
        iconFill = iconFill || "fill-gray-4";
        iconHoverFill = iconHoverFill || "fill-gray-4";
        justification = justification || "justify-start";
        break;
      case "small":
        bgColor = bgColor || "bg-gray-2";
        hoverColor = hoverColor || "bg-gray-2";
        clickedColor = clickedColor || "bg-gray-2";
        textColor = textColor || "text-gray-4";
        textHoverColor = textHoverColor || "text-gray-white";
        textClickedColor = textClickedColor || "text-gray-white";
        borderRadius = borderRadius || "rounded-sm";
        borderColor = borderColor || "border border-solid border-gray-3";
        borderHoverColor = borderHoverColor || "border-gray-4";
        padding = padding || "py-xxxs px-xxs";
        iconFill = iconFill || "fill-gray-4";
        iconHoverFill = iconHoverFill || "fill-gray-white";

        break;
      case "r18-white":
        bgColor = bgColor || "bg-gray-white";
        hoverColor = hoverColor || "bg-gray-black";
        clickedColor = clickedColor || "bg-gray-black";
        textColor = textColor || "text-gray-black";
        textClassName = textClassName || "text-sm-regular";
        textHoverColor = textHoverColor || "text-gray-white";
        textClickedColor = textClickedColor || "text-gray-white";
        borderRadius = borderRadius || "rounded-lg";
        padding = padding || "py-xxs px-sm";
        iconFill = iconFill || "fill-gray-black";
        iconHoverFill = iconHoverFill || "fill-gray-black";
        borderHoverColor = borderHoverColor || "border-gray-white";

        break;
      case "r18-black":
        bgColor = bgColor || "bg-gray-black";
        hoverColor = hoverColor || "bg-gray-3";
        borderColor = borderColor || "border-transparent";
        borderHoverColor = borderHoverColor || "border-transparent";
        clickedColor = clickedColor || "bg-gray-3";
        textClassName = textClassName || "text-sm-regular";
        textColor = textColor || "text-gray-4";
        textHoverColor = textHoverColor || "text-gray-white";
        textClickedColor = textClickedColor || "text-gray-white";
        borderRadius = borderRadius || "rounded-lg";
        padding = padding || "py-xxs px-sm";
        iconFill = iconFill || "fill-gray-4";
        iconHoverFill = iconHoverFill || "fill-gray-white";

        break;
      case "header":
        bgColor = bgColor || "bg-transparent";
        textClassName = textClassName || "text-sm-regular";
        hoverColor = hoverColor || "";
        clickedColor = clickedColor || "";
        textColor = textColor || "text-gray-4";
        textHoverColor = textHoverColor || "text-gray-white";
        textClickedColor = textClickedColor || "text-gray-white";
        borderColor = borderColor || "border-transparent";
        borderHoverColor = borderHoverColor || "border-transparent";
        padding = padding || "py-xxs px-xs";

        break;
      case "footer":
        bgColor = bgColor || "bg-transparent";
        textClassName = textClassName || "caption";
        hoverColor = hoverColor || "";
        clickedColor = clickedColor || "";
        textColor = textColor || "text-gray-4";
        textHoverColor = textHoverColor || "text-gray-white";
        textClickedColor = textClickedColor || "text-gray-white";
        padding = padding || "py-xxs px-xs";

        break;
      case "panel":
        bgColor = bgColor || "bg-transparent";
        textClassName = textClassName || "text-sm-md";
        borderColor = borderColor || "border-transparent";
        borderHoverColor = borderHoverColor || "border-transparent";
        hoverColor = hoverColor || "bg-gray-3";
        clickedColor = clickedColor || "bg-gray-3";
        textColor = textColor || "text-gray-4";
        textHoverColor = textHoverColor || "text-gray-white";
        textClickedColor = textClickedColor || "text-gray-white";
        borderRadius = borderRadius || "rounded-sm";
        padding = padding || "py-xxs px-xs";
        justification = justification || "justify-end";
        className = className || "w-full";
        iconFill = iconFill || "fill-gray-4";
        iconHoverFill = iconHoverFill || "fill-gray-white";
        break;
      case "careers":
        bgColor = bgColor || "bg-transparent";
        textClassName = textClassName || "text-md-md";
        hoverColor = hoverColor || "";
        clickedColor = clickedColor || "";
        iconPosition = iconPosition || "right";
        textColor = textColor || "text-primary";
        textHoverColor = textHoverColor || "text-gray-white";
        textClickedColor = textClickedColor || "text-gray-white";
        borderRadius = borderRadius || "rounded-sm";
        padding = padding || "py-xxs px-xs";
        iconFill = iconFill || "fill-primary";
        iconHoverFill = iconHoverFill || "fill-gray-white";

        break;
      case "chat":
        bgColor = bgColor || "bg-gray-2";
        textClassName = textClassName || "text-sm-regular";
        hoverColor = hoverColor || "bg-gray-2";
        clickedColor = clickedColor || "bg-gray-black";
        textColor = textColor || "text-gray-4";
        textHoverColor = textHoverColor || "text-gray-white";
        textClickedColor = textClickedColor || "text-gray-white";
        borderColor = borderColor || "border border-gray-3";
        borderHoverColor = borderHoverColor || "border-gray-4";
        borderRadius = borderRadius || "rounded-sm";
        padding = padding || "py-xxs px-xs";
        justification = justification || "justify-center";
        className = className || "w-[256px]";

        break;
      case "icon":
        bgColor = bgColor || "bg-gray-2";
        hoverColor = hoverColor || "bg-gray-2";
        clickedColor = clickedColor || "bg-gray-2";
        textColor = textColor || "text-gray-4";
        textHoverColor = textHoverColor || "text-gray-white";
        textClickedColor = textClickedColor || "text-gray-white";
        borderRadius = borderRadius || "rounded-sm";
        borderColor = borderColor || "border border-solid border-gray-3";
        borderHoverColor = borderHoverColor || "border-gray-4";
        padding = padding || "py-xxs px-xxs";
        iconFill = iconFill || "fill-gray-4";
        iconHoverFill = iconHoverFill || "fill-gray-white";
        minWidth = minWidth || "";

        break;
    }
    if (active) {
      bgColor = clickedColor;
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
          hover ? hoverColor : bgColor,
          className,
          iconPosition === "left" ? "flex-row-reverse" : "flex-row",
          padding,
          hover ? borderHoverColor : borderColor,
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
                  hover ? textHoverColor : textColor,
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
