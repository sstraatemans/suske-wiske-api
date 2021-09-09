import { useState, FormEvent } from 'react';

export const useFormControls = <T>() => {
  const [formValues, setFormValues] = useState<T>();

  const handleInputValue = (e: FormEvent) => {
    const { name, value } = (e.target ?? {}) as HTMLInputElement;

    setFormValues((v: T) => {
      return { ...v, [name]: value };
    });
  };

  return {
    formValues,
    setInitialFormValues: setFormValues,
    handleInputValue,
  };
};
