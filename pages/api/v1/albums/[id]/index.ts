import { baseHandler } from '@server/baseHandler';
import { enrichAlbums } from '@server/enrichResults';
import { getById } from '@server/data/getById';
import { updateById } from '@server/data/update';

const handler = baseHandler()
  .get(async (req, res) => {
    const { id } = req.query as { id: string };

    const data = await getById<Album>('albums', id);
    if (!data) return res.status(404).json({ detail: 'Not found' });
    const enrichedResult = await enrichAlbums([data]);

    res.json(enrichedResult[0]);
  })
  .put(async (req, res) => {
    const {
      body,
      query: { id },
    } = req;

    const data = await updateById<Character>('albums', body);
    return res.json(data);
  });

export default handler;
