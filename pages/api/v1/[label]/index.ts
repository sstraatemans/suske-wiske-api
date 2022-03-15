import { baseHandler } from '@server/baseHandler';
import { enrichData } from '@server/enrichResults';
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
    const { limit, offset, q, label } = req.query as {
      limit: string;
      offset: string;
      q: string;
      label: LabelTypes;
    };

    const characters = await getAll<AllTypes>(label);
    const limitedResults = limitResults<AllTypes>(characters, limit, offset, q);
    const enrichedResults = await enrichData<AllTypes>(limitedResults, label);

    const cleanedLimit = cleanLimit(limit);
    const cleanedOffset = cleanOffset(offset);
    const characterCount = characters.length;

    res.json({
      count: characterCount,
      next:
        nextOffset(cleanedLimit, cleanedOffset, characterCount) > characterCount
          ? `${process.env.APIURL}/v1/${label}?limit=${cleanedLimit}&offset=${cleanedOffset}`
          : null,
      previous:
        previousOffset(cleanedLimit, cleanedOffset) < 0
          ? `${process.env.APIURL}/v1/${label}?limit=${cleanedLimit}&offset=${cleanedOffset}`
          : null,
      results: enrichedResults,
    });
  })
  .post(async (req, res) => {
    const { body } = req;
    const { label } = req.query as {
      label: LabelTypes;
    };

    const data = await update<AllTypes>(label, body);
    return res.status(201).json(data);
  });

export default handler;
