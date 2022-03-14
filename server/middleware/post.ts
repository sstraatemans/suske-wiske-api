import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

export const post = (
  middleware: (req: NextApiRequest, res: NextApiResponse, next: Function) => {}
) => {
  return nextConnect().post(middleware);
};

export const put = (
  middleware: (req: NextApiRequest, res: NextApiResponse, next: Function) => {}
) => {
  return nextConnect().put(middleware);
};

export const get = (
  middleware: (req: NextApiRequest, res: NextApiResponse, next: Function) => {}
) => {
  return nextConnect().get(middleware);
};
