import { useState, ChangeEvent } from 'react';

type Props = {
  handleInputValue: (name: string, value?: string) => void;
  value: string[];
  options: unknown[] | undefined;
  mutateData: (body: unknown) => Promise<any>;
};

export const useLookUp = ({ value, handleInputValue, options, mutateData }: Props) => {
  const [foundItems, setFoundItems] = useState<OptionProp[]>([]);
  const [innerSearchValue, setInnerSearchValue] = useState<string>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;

    if (!searchValue || !options) {
      setFoundItems([]);
    } else {
      const foundArray = (options as OptionProp[]).filter((obj) => {
        return obj.name.toLowerCase().includes(searchValue);
      });

      if (foundArray.length === 0) {
        foundArray.push({ id: '', name: '...NEW' });
      }

      setInnerSearchValue(searchValue);
      setFoundItems(foundArray);
    }
  };

  const handleSelectValue = async (option: OptionProp) => {
    setFoundItems([]);
    setInnerSearchValue('');

    //if id is empty, it needs to be added to the database
    if (!option.id && innerSearchValue) {
      const data = await mutateData({ name: innerSearchValue });
      handleInputValue(data.id);
      return;
    }

    // check that the value is not already in the value array
    if (!value.find((v) => v === option.id)) handleInputValue(option.id);
  };

  return {
    handleChange,
    handleSelectValue,
    foundItems,
    innerSearchValue,
  };
};
