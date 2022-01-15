import { FC } from 'react';

type SelectOptionProp = {
  option: OptionProp;
  handleSelectValue: (option: OptionProp) => void;
};

export type OptionProp = {
  id: string;
  name: string;
};

export const SelectOption: FC<SelectOptionProp> = ({ option, handleSelectValue }) => {
  return <button onClick={() => handleSelectValue(option)}>{option.name}</button>;
};
