import { useCallback } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGetCharacterQuery } from '@hooks/.';
import { AdminLayout } from '@layouts/.';
import { ImageContainer } from '@components/.';

import { CharacterForm } from '@forms/.';

const Admin: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const id = (query.id ?? '') as string;
  const { data, reload } = useGetCharacterQuery(id);

  const handleSubmit = useCallback(() => {
    reload(true);
  }, [reload]);

  return (
    <AdminLayout>
      <h2>{data?.name}</h2>

      <CharacterForm data={data} handleSubmit={handleSubmit} />

      <h3>Image</h3>
      {data?.images?.length && (
        <ImageContainer width={300} height={300}>
          <Image src={data.images[0]} layout='fill' alt='character portrait' />
        </ImageContainer>
      )}
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default Admin;
