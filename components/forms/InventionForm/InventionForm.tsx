import { FC, FormEvent, useEffect } from 'react';
import { useFormControls, useUpdateInventionMutation } from '@hooks/.';
import { Editor, TextField, DatePicker } from '@components/Form';
import { Button } from '@components/.';
import { useGetListAlbumsQuery } from '@hooks/admin/useGetListAlbumsQuery';
import UploadForm from '../UploadForm';

type Props = {
  handleSubmit: (id: string) => void;
  data?: Invention;
};

const InventionForm: FC<Props> = ({ data, handleSubmit }) => {
  const { formValues, setInitialFormValues, handleInputEvent, handleInputValue, handleAddImage } =
    useFormControls<Invention>();
  const { data: albumListData } = useGetListAlbumsQuery();
  const { mutateData, mutateResult } = useUpdateInventionMutation(data?.id);

  useEffect(() => {
    setInitialFormValues(data);
  }, [data, setInitialFormValues]);

  useEffect(() => {
    if (mutateResult) {
      handleSubmit(mutateResult.id);
    }
  }, [mutateResult, handleSubmit]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formValues) return;

    if (formValues?.id) {
      await mutateData({ ...formValues });
      return;
    }

    await mutateData({ ...formValues, images: [] });
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
        {data?.debuteAlbum?.id && (
          <>
            {' '}
            <TextField
              label='debute album'
              name='debuteAlbum'
              value={`(${data?.debuteAlbum.id}) ${data?.debuteAlbum.name}`}
              handleInputEvent={handleInputEvent}
              disabled
            />
            <DatePicker
              value={data?.debuteDate ? new Date(data?.debuteDate) : null}
              label='debute date'
              required
              disabled
            />
          </>
        )}
        <TextField
          label='wikiLink'
          name='wikiLink'
          value={formValues?.wikiLink}
          handleInputEvent={handleInputEvent}
        />
        <Editor
          name='description'
          value={formValues?.description}
          handleInputValue={handleInputValue}
        />
        <Button type='submit'>Submit</Button>
      </form>

      {formValues?.id && <UploadForm data={data} label='inventions' handleSubmit={handleSubmit} />}

      <pre>{JSON.stringify(formValues, null, 2)}</pre>
    </>
  );
};

export default InventionForm;
