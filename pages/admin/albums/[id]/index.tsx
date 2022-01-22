import { useCallback, useState, ChangeEvent } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGetAlbumQuery } from '@hooks/.';
import { AdminLayout } from '@layouts/.';
import { ImageContainer, Tab, TabPanel, Tabs } from '@components/.';
import { AlbumForm } from '@forms/.';

const Admin: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const id = (query.id ?? '') as string;
  const { data, reload } = useGetAlbumQuery(id);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: ChangeEvent<{}>, newValue: any) => {
    setTabValue(newValue);
  };

  const handleSubmit = useCallback(() => {
    reload(true);
  }, [reload]);

  return (
    <AdminLayout>
      <h2>{data?.name}</h2>

      <AlbumForm handleSubmit={handleSubmit} data={data} />

      <h3>Image</h3>
      {data?.images?.length && (
        <ImageContainer width={300} height={300}>
          <Image src={data.images[0]} layout='fill' alt='album portrait' />
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
