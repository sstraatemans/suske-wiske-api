import { FC } from 'react';
import { Box } from '@components/.';

type Props = {
  value: number;
  index: number;
};

export const TabPanel: FC<Props> = ({ children, value, index }) => {
  if (value !== index) return null;

  return <div>{children}</div>;
};
