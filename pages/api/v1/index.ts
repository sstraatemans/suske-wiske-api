import { baseHandler } from '@server/baseHandler';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const handler = baseHandler().get(async (req, res) => {
  await runMiddleware(req, res, cors);

  res.json({
    series: `${process.env.APIURL}/v1/series`,
    albums: `${process.env.APIURL}/v1/albums`,
    characters: `${process.env.APIURL}/v1/characters`,
    inventions: `${process.env.APIURL}/v1/inventions`,
    artists: `${process.env.APIURL}/v1/artists`,
  });
});

export default handler;
