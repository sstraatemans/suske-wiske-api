import { baseHandler } from '@server/baseHandler';
import Albums from '@data/albums';

const handler = baseHandler().get((req, res) => {
  const { limit, offset } = req.query;

  res.json(Albums);
});

console.log(handler);

export default handler;
