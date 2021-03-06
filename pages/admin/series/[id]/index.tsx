import { useCallback } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useGetSerieQuery } from '@hooks/.';
import { SerieForm } from '@forms/.';
import { AdminLayout } from '@layouts/.';

const Admin: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const id = (query.id ?? '') as string;
  const { data, reload } = useGetSerieQuery(id);

  const handleSubmit = useCallback(() => {
    reload(true);
  }, [reload]);

  return (
    <AdminLayout>
      <h2>{data?.name}</h2>

      <SerieForm data={data} handleSubmit={handleSubmit} />
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default Admin;
