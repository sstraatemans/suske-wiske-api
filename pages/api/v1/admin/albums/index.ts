import { baseHandler } from '@server/baseHandler';
import { getAll } from '@server/data/getAll';

const handler = baseHandler().get(async (req, res) => {
  const albums = await getAll<Album>('albums');
  const albumCount = albums.length;

  const miniArray = albums.map((album) => ({
    id: album.id,
    name: album.name,
  }));

  res.json({
    count: albumCount,
    results: miniArray,
  });
});

export default handler;
