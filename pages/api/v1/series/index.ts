import { baseHandler } from '@server/baseHandler';
import { enrichSeries } from '@server/enrichResults';
import { getAll } from '@server/data/getAll';
import {
  limitResults,
  cleanLimit,
  cleanOffset,
  nextOffset,
  previousOffset,
} from '@server/limitResults';

const handler = baseHandler().get(async (req, res) => {
  const { limit, offset, q } = req.query as { limit: string; offset: string; q: string };

  const series = await getAll<Serie>('series');
  const limitedResults = limitResults<Serie>(series, limit, offset, q);
  const enrichedResults = await enrichSeries(limitedResults);

  const cleanedLimit = cleanLimit(limit);
  const cleanedOffset = cleanOffset(offset);
  const artistCount = series.length;

  res.json({
    count: artistCount,
    next:
      nextOffset(cleanedLimit, cleanedOffset, artistCount) > artistCount
        ? `${process.env.APIURL}/v1/series?limit=${cleanedLimit}&offset=${cleanedOffset}`
        : null,
    previous:
      previousOffset(cleanedLimit, cleanedOffset) < 0
        ? `${process.env.APIURL}/v1/series?limit=${cleanedLimit}&offset=${cleanedOffset}`
        : null,
    results: enrichedResults,
  });
});

export default handler;
