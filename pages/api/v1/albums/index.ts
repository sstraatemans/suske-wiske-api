import { baseHandler } from '@server/baseHandler';
import { Album } from '@types/album';
import { enrichAlbums } from '@server/enrichResults';
import { limitResults } from '@server/limitResults';
import { getAll } from '@server/data/getAll';

const handler = baseHandler().get(async (req, res) => {
  const { limit, offset, q } = req.query as { limit: string; offset: string; q: string };

  const albums = await getAll<Album>('albums');
  const limitedResults = limitResults<Album>(albums, limit, offset, q);
  const enrichedResults = await enrichAlbums(limitedResults);

  res.json(enrichedResults);
});

export default handler;
