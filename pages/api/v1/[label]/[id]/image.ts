import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Multer from 'multer';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { getFireStore } from '@server/data';
import { authenticate } from '@server/middleware/authenticate';
import { checkLabel } from '@server/middleware/checkLabel';
import { getById } from '@server/data/getById';
import { update } from '@server/data/update';

const upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

const apiRoute = nc<NextApiRequest, NextApiResponse>({
  // 404 error handler
  onNoMatch: (req, res) =>
    res.status(404).send({
      message: `API route not found: ${req.url}`,
    }),

  // 500 error handler
  onError: (err, req, res) =>
    res.status(500).send({
      message: `Unexpected error.`,
      error: err.toString(),
    }),
})
  .use(checkLabel)
  .use(authenticate)
  .use(upload.single('file'));

apiRoute.options(async (req, res) => {
  return res.status(200).send('ok');
});

apiRoute.post(async (req, res) => {
  const getFileExtension = (name: string) => {
    const arr = name.split('.');
    return arr[arr.length - 1];
  };

  const file = (req as any).file;

  const label = req.query.label as string;
  const id = req.query.id as string;

  const storage = getFireStore();
  // Step 1. Create reference for file name in cloud storage
  const data = await getById<AllTypes>(label, id);
  if (!data) return res.status(404).json({ detail: 'Not found' });

  const storageRef = ref(storage, `${label}/${id}.${getFileExtension(file.originalname)}`);

  // Step 2. Upload the file in the bucket storage
  const snapshot = await uploadBytes(storageRef, file.buffer);
  // Step 3. Grab the public url
  const downloadurl = await getDownloadURL(snapshot.ref);

  data.image = downloadurl;

  const newData = await update<AllTypes>(label, data);

  return res.json(newData);
});

apiRoute.delete(async (req, res) => {
  const getFileName = (name: string) => {
    const arr = name.split('/');

    const fullString = arr[arr.length - 1].split('?');

    return unescape(fullString[0]);
  };

  const label = req.query.label as string;
  const id = req.query.id as string;

  const storage = getFireStore();
  const data = await getById<AllTypes>(label, id);
  if (!data) return res.status(404).json({ detail: 'Not found' });

  if (data.image) {
    const storageRef = ref(storage, `${getFileName(data.image)}`);
    deleteObject(storageRef);
  }

  data.image = null;

  const newData = await update<AllTypes>(label, data);

  return res.json(newData);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
