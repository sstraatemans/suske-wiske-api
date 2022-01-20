import { baseHandler } from '@server/baseHandler';
import { getAll } from '@server/data/getAll';

const handler = baseHandler().get(async (req, res) => {
  const artists = await getAll<Artist>('artists');
  const count = artists.length;

  const miniArray = artists.map((artist) => ({
    id: artist.id,
    name: artist.name,
  }));

  res.json({
    count,
    results: miniArray,
  });
});

export default handler;
