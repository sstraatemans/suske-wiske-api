import { baseHandler } from '@server/baseHandler';
import { enrichSeries } from '@server/enrichResults';
import { getById } from '@server/data/getById';
import { Serie } from '@ts/serie';

const handler = baseHandler().get(async (req, res) => {
  const { id } = req.query as { id: string };

  const data = await getById<Serie>('series', id);
  if (!data) return res.status(404).json({ detail: 'Not found' });
  const enrichedResult = await enrichSeries([data]);

  res.json(enrichedResult[0]);
});

export default handler;
