import { useState, FormEvent } from 'react';

export const useFormControls = <T>() => {
  const [formValues, setFormValues] = useState<T>();

  const handleInputValue = (e: FormEvent) => {
    const { name, value } = (e.target ?? {}) as HTMLInputElement;

    setFormValues({ ...formValues, [name]: value } as T);
  };

  return {
    formValues,
    setInitialFormValues: setFormValues,
    handleInputValue,
  };
};
