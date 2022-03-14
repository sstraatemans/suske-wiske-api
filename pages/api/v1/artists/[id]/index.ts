import { baseHandler } from '@server/baseHandler';
import { enrichData } from '@server/enrichResults';
import { getById } from '@server/data/getById';
import { updateById } from '@server/data/update';
import { deleteById } from '@server/data/deleteById';

const handler = baseHandler()
  .options(async (req, res) => {
    return res.status(200).send('ok');
  })
  .get(async (req, res) => {
    const { id } = req.query as { id: string };

    const data = await getById<Artist>('artists', id);
    if (!data) return res.status(404).json({ detail: 'Not found' });
    const enrichedResult = await enrichData<Artist>([data], 'artists');

    res.json(enrichedResult[0]);
  })
  .put(async (req, res) => {
    const {
      body,
      query: { id },
    } = req;

    const data = await updateById<Artist>('artists', body);
    return res.json(data);
  })
  .delete(async (req, res) => {
    const {
      query: { id },
    } = req;

    // await deleteImages('characters', id);
    await deleteById('artists', id);

    return res.status(204).send({});
  });

export default handler;
