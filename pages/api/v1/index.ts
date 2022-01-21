import { baseHandler } from '@server/baseHandler';

const handler = baseHandler().get(async (req, res) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok');
  }

  res.json({
    series: `${process.env.APIURL}/v1/series`,
    albums: `${process.env.APIURL}/v1/albums`,
    characters: `${process.env.APIURL}/v1/characters`,
    inventions: `${process.env.APIURL}/v1/inventions`,
    artists: `${process.env.APIURL}/v1/artists`,
  });
});

export default handler;
