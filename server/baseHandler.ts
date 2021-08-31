import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Cors from 'cors';
import next from 'next';

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export default function initMiddleware(
  middleware: any
): (req: NextApiRequest, res: NextApiResponse) => Promise<unknown> {
  return (req, res): Promise<unknown> =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

// Initialize the cors middleware
export const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);

export const baseHandler = () =>
  nc<NextApiRequest, NextApiResponse>({
    // 404 error handler
    onNoMatch: (req, res) =>
      res.status(404).send({
        message: `API route not found: ${req.url}`,
      }),

    // 500 error handler
    onError: (err, req, res) =>
      res.status(500).send({
        message: `Unexpected error.`,
        error: err.toString(),
      }),
  });
