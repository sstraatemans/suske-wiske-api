import { useEffect, useState, ChangeEvent } from 'react';

type Props = {
  handleInputValue: (name: string, value?: string) => void;
  value?: string;
  options: unknown[] | undefined;
  name: string;
};

export const useAutocomplete = ({ value, handleInputValue, options, name }: Props) => {
  const [innerValue, setInnerValue] = useState<string | undefined>(value);
  const [innerLabel, setInnerLabel] = useState<string>();
  const [foundItems, setFoundItems] = useState<OptionProp[]>([]);

  useEffect(() => {
    handleInputValue(name, innerValue);
  }, [innerValue, handleInputValue, name]);

  useEffect(() => {
    if (options) {
      const val = (options as OptionProp[]).find((option) => {
        if (option.id === innerValue) {
          return option.name;
        }
      });
      if (val?.id) setInnerLabel(`(${val?.id}) ${val?.name}`);
    }
  }, [options, innerValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    if (!searchValue || !options) {
      setFoundItems([]);
      return;
    }

    const foundArray = (options as OptionProp[]).filter((obj) => {
      return obj.name.toLowerCase().includes(searchValue);
    });

    setInnerLabel(searchValue);
    setFoundItems(foundArray);
  };

  const handleSelectValue = (option: OptionProp) => {
    setInnerValue(option.id);
    setFoundItems([]);
  };

  return {
    handleChange,
    handleSelectValue,
    innerLabel,
    foundItems,
    innerValue,
  };
};
