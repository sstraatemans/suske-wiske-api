import { baseHandler } from '@server/baseHandler';
import { getAll } from '@server/data/getAll';

const handler = baseHandler().get(async (req, res) => {
  const characters = await getAll<Character>('characters');
  const count = characters.length;

  const miniArray = characters.map((character) => ({
    id: character.id,
    name: character.name,
  }));

  res.json({
    count,
    results: miniArray,
  });
});

export default handler;
