import { UseFormRegister } from "react-hook-form";

export interface Choice {
  name: string;
  value: string | number;
  textColor?: string;
  icon?: React.ElementType;
  secText?: string;
  onClick?: () => void;
}

export type InputProps = {
  value: string | number | readonly string[] | undefined; // Add value prop
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined; // Add onChange prop
  placeholder?: string;
  disabled?: boolean;
  name?: string;

}

export interface SelectInputProps {
  open?: boolean;
  title?: string;
  headLess?: boolean;
  choices?: Choice[];
  handleSelected?: (value: string | number) => void;
  placeholder?: string;
  defaultValue?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  required?: boolean;
  width?: string;
  optionsWidth?: string;
  align?: "start" | "center" | "end";
  disabled?: boolean;
  name?: string;
  alignOffset?: number;
  exclude?: string[];
  sideOffset?: number;
  value?: string | number;
  gap?: string;
  backgroundColor?: string;
  padding?: string;
  border?: string;
  borderActive?: string;
  borderRadius?: string;
  text?: string;
  secText?: string;
  icon?: React.ElementType;
  textColor?: string;
  trigger?: React.FC<any>;
  triggerProps?: object;
  useShortCut?: boolean;
}

export type TextInputProps = {
  title?: string;
  name?: string;
  errors?: any;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute | undefined;
  icon?: any;
  value?: string | number | readonly string[] | undefined; // Add value prop
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined; // Add onChange prop
  placeholder?: string;
  disabled?: boolean;
  width?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  action?: React.ReactNode;
  defaultValue?: string | number | readonly string[] | undefined;
  pseudoElementClass?: string;
  register?: UseFormRegister<any>;
  validationSchema?: any;
};
