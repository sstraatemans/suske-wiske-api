import { useCallback } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGetArtistQuery } from '@hooks/.';
import { AdminLayout } from '@layouts/.';
import { ImageContainer } from '@components/.';
import { ArtistForm } from '@components/forms';

const Admin: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const id = (query.id ?? '') as string;
  const { data, reload } = useGetArtistQuery(id);

  const handleSubmit = useCallback(() => {
    reload(true);
  }, [reload]);

  return (
    <AdminLayout>
      <h2>{data?.name ? data?.name : 'New Artist'}</h2>

      <ArtistForm handleSubmit={handleSubmit} data={data} />
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default Admin;
