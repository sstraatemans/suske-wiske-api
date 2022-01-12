import { FormEvent, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useFormControls, useGetCharacterQuery, useImageupload } from '@hooks/.';

import { AdminLayout } from '@layouts/.';
import { TextField, UploadField } from '@components/Form';
import { Button, ImageContainer } from '@components/.';
import { Character, Maybe } from '@hooks/graphql';
import { useUpdateCharacterMutation } from '@hooks/.';

const Admin: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const id = (query.id ?? '') as string;
  const { data } = useGetCharacterQuery(id);
  const { uploadImage, progress, selectImage, imageUrl, setImageUrl } = useImageupload();
  const { formValues, setInitialFormValues, handleInputValue, handleAddImage } =
    useFormControls<Maybe<Character>>();
  const { updateCharacter } = useUpdateCharacterMutation();

  console.log(formValues);

  useEffect(() => {
    setInitialFormValues(data?.character);
  }, [data, setInitialFormValues]);

  useEffect(() => {
    if (imageUrl) {
      handleAddImage(imageUrl);
      updateCharacter({ variables: { input: formValues } });
      setImageUrl(null);
    }
  }, [imageUrl, handleAddImage, setImageUrl, updateCharacter, formValues]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (data?.character?.id) {
      uploadImage(data.character.id);
    }

    updateCharacter({ variables: { input: { ...formValues, images: [] } } });
    router.push(`/admin/characters/${formValues?.id}`);
  };

  return (
    <AdminLayout>
      <h2>{formValues?.name ? formValues?.name : 'New Character'}</h2>

      <form onSubmit={handleSubmit}>
        <TextField
          label='name'
          name='name'
          value={formValues?.name}
          handleInputValue={handleInputValue}
          required
        />

        {data?.character?.id && <UploadField onChange={selectImage} progress={progress} />}
        <Button type='submit'>Submit</Button>
      </form>

      <h3>Image</h3>
      {data?.character?.images?.length && data.character.images[0] && (
        <ImageContainer width={300} height={300}>
          <Image src={data.character.images[0]} layout='fill' alt='invention photo' />
        </ImageContainer>
      )}

      <pre>{JSON.stringify(formValues, null, 2)}</pre>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default Admin;
