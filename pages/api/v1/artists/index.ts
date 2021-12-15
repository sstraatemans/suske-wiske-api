import { baseHandler } from '@server/baseHandler';
import { enrichArtist } from '@server/enrichResults';
import {
  limitResults,
  cleanLimit,
  cleanOffset,
  nextOffset,
  previousOffset,
} from '@server/limitResults';
import { getAll } from '@server/data/getAll';
import { Artist, NewArtist } from '@ts/artist';
import { createNode } from '@server/data/createNode';

const handler = baseHandler()
  .get(async (req, res) => {
    const { limit, offset, q } = req.query as { limit: string; offset: string; q: string };

    const artists = await getAll<Artist>('artists');
    const limitedResults = limitResults<Artist>(artists, limit, offset, q);
    const enrichedResults = await enrichArtist(limitedResults);

    const cleanedLimit = cleanLimit(limit);
    const cleanedOffset = cleanOffset(offset);
    const artistCount = artists.length;

    res.json({
      count: artistCount,
      next:
        nextOffset(cleanedLimit, cleanedOffset, artistCount) > artistCount
          ? `${process.env.APIURL}/v1/artists?limit=${cleanedLimit}&offset=${cleanedOffset}`
          : null,
      previous:
        previousOffset(cleanedLimit, cleanedOffset) < 0
          ? `${process.env.APIURL}/v1/artists?limit=${cleanedLimit}&offset=${cleanedOffset}`
          : null,
      results: enrichedResults,
    });
  })
  .post(async (req, res) => {
    const { body } = req;

    const data = await createNode<Artist>('artists', body);
    return res.status(201).json(data);
  });

export default handler;