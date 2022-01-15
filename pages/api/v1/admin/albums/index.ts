import { baseHandler } from '@server/baseHandler';
import { enrichAlbums } from '@server/enrichResults';
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
  .get(async (req, res) => {
    const { limit, offset, q } = req.query as { limit: string; offset: string; q: string };

    const albums = await getAll<Album>('albums');
    const albumCount = albums.length;

    const miniArray = albums.map((album) => ({
      id: album.id,
      name: album.name,
    }));

    res.json({
      count: albumCount,
      results: miniArray,
    });
  })
  .post(async (req, res) => {
    const { body } = req;

    const data = await update<Album>('albums', body);
    return res.status(201).json(data);
  });

export default handler;
