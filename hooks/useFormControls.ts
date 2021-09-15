import { useState, FormEvent } from 'react';

export const useFormControls = <T>() => {
  const [formValues, setFormValues] = useState<T>();

  const handleInputValue = (e: FormEvent) => {
    const { name, value } = (e.target ?? {}) as HTMLInputElement;

    setFormValues({ ...formValues, [name]: value } as T);
  };

  const handleAddImage = (url?: string) => {
    if (url && formValues && 'images' in formValues) {
      setFormValues({ ...formValues, images: [url] });
    }
  };

  return {
    formValues,
    setInitialFormValues: setFormValues,
    handleInputValue,
    handleAddImage,
  };
};
