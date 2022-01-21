import { baseHandler } from '@server/baseHandler';

import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import NextCors from 'nextjs-cors';

const allowCors = (fn: any) => async (req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  // another option
  // res.setHeader('Access-Control-Allow-Origin', req.header.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  return await fn(req, res);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.json({
    series: `${process.env.APIURL}/v1/series`,
    albums: `${process.env.APIURL}/v1/albums`,
    characters: `${process.env.APIURL}/v1/characters`,
    inventions: `${process.env.APIURL}/v1/inventions`,
    artists: `${process.env.APIURL}/v1/artists`,
  });
};

export default handler;
