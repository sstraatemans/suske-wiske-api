import { baseHandler } from '@server/baseHandler';
import { update } from '@server/data/update';

const handler = baseHandler()
  .get(async (req, res) => {})
  .post(async (req, res) => {
    const { body } = req;

    const data = await update<User>('users', body);
    return res.status(201).json(data);
  });

export default handler;
