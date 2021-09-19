import { deleteFile } from '@client/storage';
import { getById } from './getById';

export const deleteImages = async <T extends { id: string; images: string[] }>(
  label: string,
  id: string
) => {
  const data = await getById<T>(label, id);
  data?.images.forEach((image: string) => {
    deleteFile(image);
  });
};
