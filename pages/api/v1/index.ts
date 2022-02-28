import { baseHandler } from '@server/baseHandler';

const handler = baseHandler()
  .options(async (req, res) => {
    return res.status(200).send('ok');
  })
  .get(async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    res.json({
      series: `${process.env.APIURL}/v1/series`,
      albums: `${process.env.APIURL}/v1/albums`,
      characters: `${process.env.APIURL}/v1/characters`,
      inventions: `${process.env.APIURL}/v1/inventions`,
      artists: `${process.env.APIURL}/v1/artists`,
    });
  });

export default handler;
