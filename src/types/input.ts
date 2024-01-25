export interface Choice {
  name: string;
  value: string | number;
  textColor?: string;
  icon?: React.ElementType;
  secText?: string;
  onClick?: () => void;
}

export interface SelectInputProps {
  open?: boolean;
  title?: string;
  headLess?: boolean;
  choices?: Choice[];
  handleSelected?: (value: string|number) => void;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  required?: boolean;
  width?: string;
  optionsWidth?: string;
  align?: 'start' | 'center' | 'end';
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
}