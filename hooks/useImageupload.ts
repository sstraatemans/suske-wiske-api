import { useState } from 'react';
import { uploadFile } from '@client/storage';

export const useImageupload = () => {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>();

  const uploadImage = (id: string) => {
    if (file) {
      uploadFile(
        id,
        file,
        (progress) => {
          setProgress(progress);
        },
        (downloadUrl) => {
          setImageUrl(downloadUrl);
        },
        () => {}
      );
    }
  };
  return {
    progress,
    selectImage: setFile,
    uploadImage,
    imageUrl,
  };
};
