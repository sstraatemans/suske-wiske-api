import { baseHandler } from '@server/baseHandler';
import { enrichData } from '@server/enrichResults';
import { getById } from '@server/data/getById';
import { update } from '@server/data/update';
import { deleteById } from '@server/data/deleteById';
import { getAlbumsForEntity } from '@server/data/utils/getAlbumsForEntity';
import { minimizeEntities } from '@server/data/utils/minimizeEntity';

const handler = baseHandler()
  .options(async (req, res) => {
    return res.status(200).send('ok');
  })
  .get(async (req, res) => {
    const { id, label } = req.query as { id: string; label: LabelTypes };

    if (label === 'albums' || label === 'series')
      return res.status(404).send({ message: 'Cant add an album to this entity' });

    // get all albums
    const albums = await getAlbumsForEntity(id, label);
    const albumsMinimized = minimizeEntities<Album>(albums, label);

    return res.status(200).send(albumsMinimized);
  })
  .patch(async (req, res) => {
    const { id, label } = req.query as { id: string; label: LabelTypes };
    const { albumId } = req.body;

    if (label === 'albums' || label === 'series')
      return res.status(404).send({ message: 'Cant add an album to this entity' });

    // add label to an album
    const album = await getById<Album>('albums', albumId);
    if (!album) return res.status(404).send({ message: 'Album does not exist' });

    const labelArray = (album as any)[label] ?? [];
    if (!labelArray.includes(id)) {
      labelArray.push(id);
      (album as any)[label] = labelArray;

      await update<AllTypes>('albums', album);
    }
    return res.status(204).send(null);
  })
  .delete(async (req, res) => {
    const { id, label } = req.query as { id: string; label: LabelTypes };
    const { albumId } = req.body;

    if (label === 'albums' || label === 'series')
      return res.status(404).send({ message: 'Cant add an album to this entity' });

    // add label to an album
    const album = await getById<Album>('albums', albumId);
    if (!album) return res.status(404).send({ message: 'Album does not exist' });

    const labelArray = (album as any)[label] ?? [];
    (album as any)[label] = labelArray.filter((a: string) => a !== id);
    await update<AllTypes>('albums', album);

    // delete label from album
    return res.status(204).send(null);
  });

export default handler;
