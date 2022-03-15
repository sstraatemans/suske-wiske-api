import { baseHandler } from '@server/baseHandler';
import { enrichAlbums } from '@server/enrichResults';
import {
  limitResults,
  cleanLimit,
  cleanOffset,
  nextOffset,
  previousOffset,
} from '@server/limitResults';
import { getAll } from '@server/data/getAll';
import { update } from '@server/data/update';

const handler = baseHandler()
  .options(async (req, res) => {
    return res.status(200).send('ok');
  })
  .get(async (req, res) => {
    const { limit, offset, q } = req.query as { limit: string; offset: string; q: string };

    const albums = await getAll<Album>('albums');
    const limitedResults = limitResults<Album>(albums, limit, offset, q);
    const enrichedResults = await enrichAlbums(limitedResults);

    const cleanedLimit = cleanLimit(limit);
    const cleanedOffset = cleanOffset(offset);
    const albumCount = albums.length;

    res.json({
      count: albumCount,
      next:
        nextOffset(cleanedLimit, cleanedOffset, albumCount) > albumCount
          ? `${process.env.APIURL}/v1/albums?limit=${cleanedLimit}&offset=${cleanedOffset}`
          : null,
      previous:
        previousOffset(cleanedLimit, cleanedOffset) < 0
          ? `${process.env.APIURL}/v1/albums?limit=${cleanedLimit}&offset=${cleanedOffset}`
          : null,
      results: enrichedResults,
    });
  })
  .post(async (req, res) => {
    const { body } = req;

    const data = await update<Album>('albums', body);
    return res.status(201).json(data);
  });

export default handler;
