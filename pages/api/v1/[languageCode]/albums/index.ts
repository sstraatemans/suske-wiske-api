import { baseHandler } from '@server/baseHandler';
import Albums from '@data/albums';
import { Album } from '@types/album';
import { enrichAlbums } from '@server/enrichResults';
import { limitResults } from '@server/limitResults';

const handler = baseHandler().get((req, res) => {
  const { limit, offset, q } = req.query as { limit: string; offset: string; q: string };

  const limitedResults = limitResults<Album>(Albums, limit, offset, q);
  const enrichedResults = enrichAlbums(limitedResults);

  res.json(enrichedResults);
});

console.log(handler);

export default handler;
