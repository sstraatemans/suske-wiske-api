import TextFieldMUI, { TextFieldProps } from '@material-ui/core/TextField';
import { FC } from 'react';

export const TextField: FC<TextFieldProps> = ({ value }) => {
  return <TextFieldMUI label='Outlined' variant='outlined' value={value} />;
};
