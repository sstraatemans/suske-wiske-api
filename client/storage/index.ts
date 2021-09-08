import {
  getStorage,
  ref,
  uploadBytesResumable,
  UploadTask,
  getDownloadURL,
} from 'firebase/storage';

const storage = getStorage();

type Props = (
  file: File,
  onProgress: (progress: number) => void,
  onSuccess: (downloadUrl: string) => void,
  onError: (error: Error) => void
) => void;

const uploadFile: Props = (file, onProgress, onSuccess, onError) => {
  const storageRef = ref(storage, 'some-child');
  const task = uploadBytesResumable(storageRef, file);

  task.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(progress);
    },
    (error) => {
      onError(error);
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
