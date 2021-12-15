import { useState } from 'react';
import { uploadFile } from '@client/storage';

export const useImageupload = () => {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string | null>();

  const uploadImage = async (id: string): Promise<string> => {
    if (file) {
      let url: string = '';
      await uploadFile(
        id,
        file,
        (progress) => {
          setProgress(progress);
        },
        (downloadUrl) => {
          url = downloadUrl;
          setImageUrl(downloadUrl);
        },
        () => {}
      );

      return url;
    }
    return '';
  };
  return {
    progress,
    selectImage: setFile,
    uploadImage,
    imageUrl,
    setImageUrl,
  };
};
