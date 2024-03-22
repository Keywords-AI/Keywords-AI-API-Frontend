export type variantType =
  | "primary"
  | "header"
  | "secondary"
  | "secondary-gray"
  | "secondary-black"
  | "beta"
  | "r4-white"
  | "r4-primary"
  | "r4-red"
  | "r4-black"
  | "r4-gray-2"
  | "text"
  | "small"
  | "r18-white"
  | "r18-black"
  | "panel"
  | "careers"
  | "chat"
  | "icon"
  | "footer"
  | "small-dashed"
  | "small-select"
  | "big-white"
  | "big-black"
  | "panel-v2";

export type ButtonProps = {
  active?: boolean;
  hover?: boolean;
  gap?: string;
  variant?: variantType;
  adminOnly?: boolean;
  text?: string;
  secText?: string;
  title?: string;
  type?: "button" | "submit" | "reset" | undefined;
  icon?: React.ElementType;
  secIcon?: React.ElementType;
  className?: string;
  borderRadius?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  textClassName?: string;
  bgColor?: string;
  hoverColor?: string;
  clickedColor?: string;
  textColor?: string;
  textHoverColor?: string;
  textClickedColor?: string;
  iconFill?: string;
  iconHoverFill?: string;
  iconPosition?: string;
  secIconPosition?: string;
  iconSize?: string;
  padding?: string;
  borderColor?: string;
  borderHoverColor?: string;
  borderClickedColor?: string;
  justification?: string;
  width?: string;
  children?: React.ReactNode;
  disabled?: boolean;
};
