import { baseHandler } from '@server/baseHandler';

import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok');
  }

  return res.json({
    series: `${process.env.APIURL}/v1/series`,
    albums: `${process.env.APIURL}/v1/albums`,
    characters: `${process.env.APIURL}/v1/characters`,
    inventions: `${process.env.APIURL}/v1/inventions`,
    artists: `${process.env.APIURL}/v1/artists`,
  });
};

export default handler;
