import { FormEvent, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useFormControls, useGetAlbumQuery, useImageupload } from '@hooks/.';
import { AdminLayout } from '@layouts/.';
import { TextField, UploadField } from '@components/Form';
import { Button, ImageContainer } from '@components/.';
import { useUpdateAlbumMutation } from '@hooks/.';
import { AlbumForm } from '@forms/.';

const Admin: NextPage = () => {
  const router = useRouter();

  const handleSubmit = (id?: string) => {
    router.push(`/admin/albums/${id}`);
  };

  return (
    <AdminLayout>
      <h2>New Album</h2>

      <AlbumForm handleSubmit={handleSubmit} />
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default Admin;
