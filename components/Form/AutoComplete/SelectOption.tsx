import { FC } from 'react';

export const SelectOption: FC<SelectOptionProp> = ({ option, handleSelectValue }) => {
  return <button onClick={() => handleSelectValue(option)}>{option.name}</button>;
};
