import { baseHandler } from '@server/baseHandler';
import { enrichCharacters } from '@server/enrichResults';
import { getById } from '@server/data/getById';
import { update } from '@server/data/update';
import { deleteById } from '@server/data/deleteById';

const handler = baseHandler()
  .get(async (req, res) => {
    const { id } = req.query as { id: string };

    const data = await getById<Character>('characters', id);
    if (!data) return res.status(404).json({ detail: 'Not found' });
    const enrichedResult = await enrichCharacters([data]);

    res.json(enrichedResult[0]);
  })
  .put(async (req, res) => {
    const { body } = req;

    const data = await update<Character>('characters', body);
    return res.json(data);
  })
  .delete(async (req, res) => {
    const {
      query: { id },
    } = req;

    // await deleteImages('characters', id);
    await deleteById('characters', id);

    return res.status(204).send({});
  });

export default handler;
