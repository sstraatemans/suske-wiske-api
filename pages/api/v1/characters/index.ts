import { baseHandler } from '@server/baseHandler';
import { enrichCharacters } from '@server/enrichResults';
import {
  limitResults,
  cleanLimit,
  cleanOffset,
  nextOffset,
  previousOffset,
} from '@server/limitResults';
import { getAll } from '@server/data/getAll';
import { updateById } from '@server/data/updateById';

const handler = baseHandler()
  .get(async (req, res) => {
    const { limit, offset, q } = req.query as { limit: string; offset: string; q: string };

    const characters = await getAll<Character>('characters');
    const limitedResults = limitResults<Character>(characters, limit, offset, q);
    const enrichedResults = await enrichCharacters(limitedResults);

    const cleanedLimit = cleanLimit(limit);
    const cleanedOffset = cleanOffset(offset);
    const characterCount = characters.length;

    res.json({
      count: characterCount,
      next:
        nextOffset(cleanedLimit, cleanedOffset, characterCount) > characterCount
          ? `${process.env.APIURL}/v1/characters?limit=${cleanedLimit}&offset=${cleanedOffset}`
          : null,
      previous:
        previousOffset(cleanedLimit, cleanedOffset) < 0
          ? `${process.env.APIURL}/v1/characters?limit=${cleanedLimit}&offset=${cleanedOffset}`
          : null,
      results: enrichedResults,
    });
  })
  .post(async (req, res) => {
    const { body } = req;

    const data = await updateById<Character>('characters', body);
    return res.status(201).json(data);
  });

export default handler;
