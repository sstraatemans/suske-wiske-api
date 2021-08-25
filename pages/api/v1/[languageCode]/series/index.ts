import { baseHandler } from '@server/baseHandler';
import Series from '@data/series';
import { limitResults } from '@server/limitResults';
import { Serie } from '@types/serie';

const handler = baseHandler().get((req, res) => {
  const { limit, offset, q } = req.query as { limit: string; offset: string; q: string };

  res.json(limitResults<Serie>(Series, limit, offset, q));
});

console.log(handler);

export default handler;
