import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { AdminLayout } from '@layouts/.';
import { DeviceForm } from '@forms/.';

const Admin: NextPage = () => {
  const router = useRouter();

  const handleSubmit = (id: string) => {
    router.push(`/admin/devices/${id}`);
  };

  return (
    <AdminLayout>
      <h2>New Device</h2>

      <DeviceForm handleSubmit={handleSubmit} />
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default Admin;
