import { FC } from 'react';
import TextFieldMUI, { TextFieldProps } from '@material-ui/core/TextField';

export const TextField: FC<TextFieldProps> = ({ variant = 'outlined', ...props }) => {
  return <TextFieldMUI {...props} variant={variant}></TextFieldMUI>;
};
