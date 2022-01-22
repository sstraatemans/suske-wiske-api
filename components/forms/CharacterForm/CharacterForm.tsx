import { FC } from 'react';
import { AutoComplete, Editor, TextField, UploadField } from '@components/Form';
import { FormEvent, useEffect } from 'react';
import { useFormControls, useImageupload } from '@hooks/.';

import { Button } from '@components/.';
import { useUpdateCharacterMutation } from '@hooks/.';
import { useGetListAlbumsQuery } from '@hooks/admin/useGetListAlbumsQuery';

type Props = {
  handleSubmit: (id?: string) => void;
  data?: Character;
};

const CharacterForm: FC<Props> = ({ handleSubmit, data }) => {
  const { uploadImage, progress, selectImage, imageUrl, setImageUrl } = useImageupload();
  const { formValues, setInitialFormValues, handleInputEvent, handleInputValue, handleAddImage } =
    useFormControls<Character>();
  const { mutateData, mutateResult } = useUpdateCharacterMutation(data?.id);
  const { data: albumListData } = useGetListAlbumsQuery();

  useEffect(() => {
    setInitialFormValues(data);
  }, [setInitialFormValues, data]);

  useEffect(() => {
    if (imageUrl) {
      handleAddImage(imageUrl);
      setImageUrl(null);
    }
  }, [imageUrl, handleAddImage, setImageUrl, formValues]);

  useEffect(() => {
    if (mutateResult) {
      handleSubmit(mutateResult.id);
    }
  }, [mutateResult, handleSubmit]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formValues) return;

    if (formValues?.id) {
      await uploadImage(formValues?.id);
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
        <AutoComplete
          value={formValues?.debuteAlbum}
          label='debute album'
          name='debuteAlbum'
          options={albumListData?.results}
          handleInputValue={handleInputValue}
        />
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

        {formValues?.id && <UploadField onChange={selectImage} progress={progress} />}
        <Button type='submit'>Submit</Button>
      </form>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default CharacterForm;
