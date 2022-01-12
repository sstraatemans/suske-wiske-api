import { FormEvent, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useFormControls, useGetSerieQuery, useUpdateSerieMutation } from '@hooks/.';

import { AdminLayout } from '@layouts/.';
import { TextField } from '@components/Form';
import { Button } from '@components/.';

const Admin: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const id = (query.id ?? '') as string;
  const { data, reload } = useGetSerieQuery(id);
  const { formValues, setInitialFormValues, handleInputValue } = useFormControls<Serie>();
  const { mutateData } = useUpdateSerieMutation(id);

  useEffect(() => {
    setInitialFormValues(data);
  }, [data, setInitialFormValues]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutateData(formValues);
    router.push(`/admin/series/${formValues?.id}`);
  };

  if (!formValues) return null;
  return (
    <AdminLayout>
      <h2>{formValues?.name ? formValues?.name : 'New album'}</h2>

      <form onSubmit={handleSubmit}>
        <TextField
          label='name'
          name='name'
          value={formValues?.name}
          handleInputValue={handleInputValue}
          required
        />
        <Button type='submit'>Submit</Button>
      </form>

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
