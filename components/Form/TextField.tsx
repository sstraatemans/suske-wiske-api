import TextFieldMUI, { TextFieldProps } from '@material-ui/core/TextField';
import { FC } from 'react';

export const TextField: FC<TextFieldProps> = (props) => {
  return <TextFieldMUI label='Outlined' variant='outlined' {...props} />;
};
