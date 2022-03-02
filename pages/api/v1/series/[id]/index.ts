import { baseHandler } from '@server/baseHandler';
import { enrichSeries } from '@server/enrichResults';
import { getById } from '@server/data/getById';
import { update } from '@server/data/update';

const handler = baseHandler()
  .options(async (req, res) => {
    return res.status(200).send('ok');
  })
  .get(async (req, res) => {
    const { id } = req.query as { id: string };

    const data = await getById<Serie>('series', id);
    if (!data) return res.status(404).json({ detail: 'Not found' });
    const enrichedResult = await enrichSeries([data]);

    res.json(enrichedResult[0]);
  })
  .put(async (req, res) => {
    const { id } = req.query as { id: string };
    const body = req.body as Serie;

    //try {
    console.log(body);
    const newData = await update<Serie>('series', body);
    console.log({ newData });
    const enrichedResult = await enrichSeries([newData]);
    return res.json(enrichedResult);
    // } catch (e) {
    //   return res.status(500).json('error');
    // }
  });

export default handler;
