import { baseHandler } from '@server/baseHandler';
import Albums from '@data/albums';
import Characters from '@data/characters';

const handler = baseHandler().get((req, res) => {
  const { id } = req.query;
  console.log(id);
  const album = Albums.find((album) => id === album.id);

  if (!album) {
    return res.status(404).send({ message: 'Api route not found' });
  }

  const enrichedAlbum = {
    ...album,
    characters: album.characters.map((id) => {
      return Characters.find((character) => character.id === id);
    }),
  };
  res.json(enrichedAlbum);
});

export default handler;
