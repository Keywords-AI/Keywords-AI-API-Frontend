export interface Choice {
  name: string;
  value: string | number;
  textColor?: string;
  icon?: React.ElementType;
  secText?: string;
  onClick?: () => void;
}
