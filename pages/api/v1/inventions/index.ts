import { baseHandler } from '@server/baseHandler';
import { enrichInvention } from '@server/enrichResults';
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
  .get(async (req, res) => {
    const { limit, offset, q } = req.query as { limit: string; offset: string; q: string };

    const inventions = await getAll<Invention>('inventions');
    const limitedResults = limitResults<Invention>(inventions, limit, offset, q);
    const enrichedResults = await enrichInvention(limitedResults);

    const cleanedLimit = cleanLimit(limit);
    const cleanedOffset = cleanOffset(offset);
    const inventionCount = inventions.length;

    res.json({
      count: inventionCount,
      next:
        nextOffset(cleanedLimit, cleanedOffset, inventionCount) > inventionCount
          ? `${process.env.APIURL}/v1/inventions?limit=${cleanedLimit}&offset=${cleanedOffset}`
          : null,
      previous:
        previousOffset(cleanedLimit, cleanedOffset) < 0
          ? `${process.env.APIURL}/v1/inventions?limit=${cleanedLimit}&offset=${cleanedOffset}`
          : null,
      results: enrichedResults,
    });
  })
  .post(async (req, res) => {
    const { body } = req;

    const data = await update<Invention>('inventions', body);
    return res.status(201).json(data);
  });

export default handler;
