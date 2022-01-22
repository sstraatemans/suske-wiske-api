import { FC, FormEvent, useEffect } from 'react';
import { TextField, NumberField, SerieAlbum, Editor } from '@components/Form';
import { Button } from '@components/.';
import { useFormControls, useUpdateSerieMutation } from '@hooks/.';

type Props = {
  data?: Serie;
  handleSubmit: (id?: string) => void;
};

const SerieForm: FC<Props> = ({ data, handleSubmit }) => {
  const { formValues, setInitialFormValues, handleInputEvent, handleInputValue } =
    useFormControls<Serie>();
  const { mutateData, mutateResult } = useUpdateSerieMutation(data?.id);

  useEffect(() => {
    setInitialFormValues(data);
  }, [data, setInitialFormValues]);

  useEffect(() => {
    if (mutateResult) {
      handleSubmit(mutateResult.id);
    }
  }, [mutateResult, handleSubmit]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutateData(formValues);
  };

  if (!formValues && data) return null;

  return (
    <>
      <form onSubmit={onSubmit}>
        <TextField
          label='name'
          name='name'
          value={formValues?.name}
          handleInputEvent={handleInputEvent}
          required
        />
        <NumberField
          label='startYear'
          name='startYear'
          value={formValues?.startYear}
          handleInputEvent={handleInputEvent}
          required
        />
        <NumberField
          label='endYear'
          name='endYear'
          value={formValues?.endYear}
          handleInputEvent={handleInputEvent}
          required
        />
        <TextField
          label='wikiLink'
          name='wikiLink'
          value={formValues?.wikiLink}
          handleInputEvent={handleInputEvent}
          required
        />
        <Editor
          name='description'
          value={formValues?.description}
          handleInputValue={handleInputValue}
        />

        <SerieAlbum value={formValues?.albums} handleInputValue={handleInputValue} />
        <Button type='submit'>Submit</Button>
      </form>

      <pre>{JSON.stringify(formValues, null, 2)}</pre>
    </>
  );
};

export default SerieForm;
