import { baseHandler } from '@server/baseHandler';
import { enrichCharacters } from '@server/enrichResults';
import { getById } from '@server/data/getById';
import { Character } from '@ts/character';

const handler = baseHandler().get(async (req, res) => {
  const { id } = req.query as { id: string };

  const data = await getById<Character>('characters', id);
  if (!data) return res.status(404).json({ detail: 'Not found' });
  const enrichedResult = await enrichCharacters([data]);

  res.json(enrichedResult[0]);
});

export default handler;
