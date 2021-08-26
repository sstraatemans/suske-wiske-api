import { FC } from 'react';
import TextFieldMUI, { TextFieldProps } from '@material-ui/core/TextField';

export const TextField: FC<TextFieldProps> = (props) => {
  return <TextFieldMUI {...props} variant='outlined'></TextFieldMUI>;
};
