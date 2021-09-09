import {
  getStorage,
  ref,
  uploadBytesResumable,
  UploadTask,
  getDownloadURL,
} from 'firebase/storage';

const storage = getStorage();

type Props = (
  id: string,
  file: File,
  onProgress: (progress: number) => void,
  onSuccess: (downloadUrl: string) => void,
  onError?: (error: Error) => void
) => void;

const getFileExtension = (name: string) => {
  const arr = name.split('.');
  return arr[arr.length - 1];
};

const uploadFile: Props = (id, file, onProgress, onSuccess, onError) => {
  const storageRef = ref(storage, `albums/${id}.${getFileExtension(file.name)}`);
  const task = uploadBytesResumable(storageRef, file);

  task.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(progress);
    },
    (error) => {
      onError && onError(error);
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(task.snapshot.ref).then((downloadURL) => {
        onSuccess(downloadURL);
      });
    }
  );
};

export { storage, uploadFile };
