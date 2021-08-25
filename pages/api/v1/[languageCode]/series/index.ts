import { baseHandler } from '@server/baseHandler';
import Series from '@data/series';
import { limitResults } from '@server/limitResults';
import { enrichSeries } from '@server/enrichResults';
import { Serie } from '@types/serie';

const handler = baseHandler().get((req, res) => {
  const { limit, offset, q } = req.query as { limit: string; offset: string; q: string };

  const limitedResults = limitResults<Serie>(Series, limit, offset, q);
  const enrichedResults = enrichSeries(limitedResults);

  res.json(enrichedResults);
});

console.log(handler);

export default handler;
