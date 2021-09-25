import { baseHandler } from '@server/baseHandler';
import { enrichInvention } from '@server/enrichResults';
import { getById } from '@server/data/getById';
import { Invention } from '@ts/invention';
import { updateById } from '@server/data/updateById';
import { deleteById } from '@server/data/deleteById';

const handler = baseHandler()
  .get(async (req, res) => {
    const { id } = req.query as { id: string };

    const data = await getById<Invention>('inventions', id);
    if (!data) return res.status(404).json({ detail: 'Not found' });
    const enrichedResult = await enrichInvention([data]);

    res.json(enrichedResult[0]);
  })
  .put(async (req, res) => {
    const {
      body,
      query: { id },
    } = req;

    const data = await updateById<Invention>('inventions', body);
    return res.json(data);
  })
  .delete(async (req, res) => {
    const {
      query: { id },
    } = req;

    // await deleteImages('characters', id);
    await deleteById('inventions', id);

    return res.status(204).send({});
  });

export default handler;
