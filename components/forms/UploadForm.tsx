import { IconButton } from '@components/IconButton/IconButton';
import { DeleteIcon } from '@components/icons';
import { ImageContainer } from '@components/ImageContainer/ImageContainer';
import { useAuthUser } from '@context/UserContext';
import Image from 'next/image';
import { FC, FormEvent, FormEventHandler, MouseEventHandler, useContext, useRef } from 'react';

type Props = {
  data: AllTypes;
  label: string;
  handleSubmit: (id: string) => void;
};

const UploadForm: FC<Props> = ({ data, label, handleSubmit }) => {
  const formRef = useRef(null);
  const { getTokenId } = useAuthUser();

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    if (!data) return null;

    e.preventDefault();
    if (!formRef.current) return null;
    const formData = new FormData(formRef.current as unknown as HTMLFormElement);
    const tokenId = await getTokenId();
    const result = await fetch(`http://localhost:3000/api/v1/${label}/${data.id}/image`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    });

    handleSubmit(data.id);
  };

  const handleDelete = async () => {
    if (!data) return null;
    const tokenId = await getTokenId();
    await fetch(`http://localhost:3000/api/v1/${label}/${data.id}/image`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    });

    handleSubmit(data.id);
  };

  if (!data) return null;

  return (
    <>
      {' '}
      <form ref={formRef} onSubmit={handleUpload}>
        <input type='file' name='file' />
        <button type='submit'>upload</button>
      </form>
      <h3>Image</h3>
      {data?.images?.length && (
        <ImageContainer width={300} height={300}>
          <Image src={data.images[0]} layout='fill' alt='invention portrait' />
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </ImageContainer>
      )}
    </>
  );
};

export default UploadForm;
