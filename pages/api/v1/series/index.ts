import { baseHandler } from '@server/baseHandler';
import { limitResults } from '@server/limitResults';
import { enrichSeries } from '@server/enrichResults';
import { getAll } from '@server/data/getAll';

const handler = baseHandler().get(async (req, res) => {
  const { limit, offset, q } = req.query as { limit: string; offset: string; q: string };

  const data = await getAll<Serie>('series');
  const limitedResults = limitResults<Serie>(data, limit, offset, q);
  const enrichedResults = await enrichSeries(limitedResults);

  res.json(enrichedResults);
});

export default handler;
