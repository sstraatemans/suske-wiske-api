import { useGetSeries } from '@hooks/useGetSeries';
import { AdminLayout } from '@layouts/.';
import { NextPage } from 'next';

const Admin: NextPage = () => {
  const { loading, error, data } = useGetSeries();

  return (
    <AdminLayout>
      <h2>Series</h2>
    </AdminLayout>
  );
};

export default Admin;
