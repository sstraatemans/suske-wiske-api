import { baseHandler } from '@server/baseHandler';
import json from './swagger.json';

const handler = baseHandler()
  .options(async (req, res) => {
    return res.status(200).send('ok');
  })
  .get(async (req, res) => {
    res.json(json);
  });

export default handler;
