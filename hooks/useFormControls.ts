import { useState, FormEvent } from 'react';

export const useFormControls = <T>() => {
  const [formValues, setFormValues] = useState<T>();

  const handleInputEvent = (e: FormEvent) => {
    const { name, value } = (e.target ?? {}) as HTMLInputElement;
    console.log({ name, value });
    setFormValues({ ...formValues, [name]: value } as T);
  };

  const handleInputValue = (name: string, value?: unknown) => {
    if (!value) return;
    setFormValues({
      ...formValues,
      [name]: value,
    } as T);
  };

  const handleAddImage = (url?: string) => {
    if (url && formValues) {
      setFormValues({ ...formValues, images: [url] });
    }
  };

  return {
    formValues,
    setInitialFormValues: setFormValues,
    handleInputEvent,
    handleAddImage,
    handleInputValue,
  };
};
