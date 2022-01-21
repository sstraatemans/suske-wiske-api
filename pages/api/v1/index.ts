import { baseHandler } from '@server/baseHandler';

const handler = baseHandler()
  .options(async (req, res) => {
    return res.status(200).send('ok');
  })
  .get(async (req, res) => {
    res.json({
      series: `${process.env.APIURL}/v1/series`,
      albums: `${process.env.APIURL}/v1/albums`,
      characters: `${process.env.APIURL}/v1/characters`,
      inventions: `${process.env.APIURL}/v1/inventions`,
      artists: `${process.env.APIURL}/v1/artists`,
    });
  });

export default handler;
