import { FC } from 'react';
import ButtonMUI, { ButtonProps } from '@material-ui/core/Button';

export const Button: FC<ButtonProps> = ({
  children,
  color = 'primary',
  variant = 'contained',
  ...props
}) => {
  return (
    <ButtonMUI {...props} color={color} variant={variant}>
      {children}
    </ButtonMUI>
  );
};
