import { baseHandler } from '@server/baseHandler';
import { enrichAlbums } from '@server/enrichResults';
import { limitResults } from '@server/limitResults';
import { getAll } from '@server/data/getAll';
import { Album } from '@ts/album';

const handler = baseHandler().get(async (req, res) => {
  const { limit, offset, q } = req.query as { limit: string; offset: string; q: string };

  const albums = await getAll<Album>('albums');
  const limitedResults = limitResults<Album>(albums, limit, offset, q);
  const enrichedResults = await enrichAlbums(limitedResults);

  res.json(enrichedResults);
});

export default handler;
