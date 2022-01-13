import { useCallback } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGetInventionQuery } from '@hooks/.';
import { AdminLayout } from '@layouts/.';
import { ImageContainer } from '@components/.';
import { InventionForm } from '@forms/.';

const Admin: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const id = (query.id ?? '') as string;
  const { data, reload } = useGetInventionQuery(id);

  const handleSubmit = useCallback(() => {
    reload(true);
  }, [reload]);

  return (
    <AdminLayout>
      <h2>{data?.name}</h2>
      <InventionForm handleSubmit={handleSubmit} data={data} />

      <h3>Image</h3>
      {data?.images?.length && (
        <ImageContainer width={300} height={300}>
          <Image src={data.images[0]} layout='fill' alt='invention portrait' />
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
