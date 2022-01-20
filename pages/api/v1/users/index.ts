import { baseHandler } from '@server/baseHandler';
import { update } from '@server/data/update';

const handler = baseHandler()
  .get(async (req, res) => {})
  .post(async (req, res) => {
    const { body } = req;

    // TODO: check if that user already has an active account.
    // if so, sent this data back. ask question if they want to create a new one or use this / these
    // maybe give a maximum per email address of 5

    // TODO: add the date until the data will be removed
    // TODO: copy all the data collections to this user

    const data = await update<User>('users', body);
    return res.status(201).json(data);
  });

export default handler;
