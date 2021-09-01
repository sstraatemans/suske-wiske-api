import { useSeries } from '@hooks/useSeries';
import { AdminLayout } from '@layouts/.';
import { NextPage } from 'next';

const Admin: NextPage = () => {
  const { loading, error, data } = useSeries();

  return (
    <AdminLayout>
      <h2>Albums</h2>
    </AdminLayout>
  );
};

export default Admin;
