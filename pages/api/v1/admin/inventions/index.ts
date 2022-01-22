import { baseHandler } from '@server/baseHandler';
import { getAll } from '@server/data/getAll';

const handler = baseHandler().get(async (req, res) => {
  const inventions = await getAll<Invention>('inventions');
  const count = inventions.length;

  const miniArray = inventions.map((invention) => ({
    id: invention.id,
    name: invention.name,
  }));

  res.json({
    count,
    results: miniArray,
  });
});

export default handler;
