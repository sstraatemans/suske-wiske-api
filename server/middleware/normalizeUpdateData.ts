import { NextApiRequest, NextApiResponse } from 'next';
import { timeStampToFirebaseDate } from '@server/date';
import { addDefaultCreateData, findLabel } from '@server/data/utils';

export const normalizeUpdateData = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  const { method, url } = req;

  let body: BasicType = {
    id: req.body.id,
    name: req.body.name,
    wikiLink: req.body.wikiLink ?? '',
    description: req.body.description ?? '',
    images: req.body.images ?? [],
    createDate: req.body.createDate,
    createdBy: req.body.createdBy ?? '',
    lastUpdateDate: req.body.lastUpdateDate,
    lastUpdateBy: req.body.lastUpdateBy,
  };
  body = addDefaultCreateData(body as any, req.body.uid);

  //this removes all the fields that should not be in the specified entity
  //thereby removing malicious fields added by the user
  switch (findLabel(url)) {
    case 'series':
      body = {
        ...body,
        startYear: req.body.startYear,
        endYear: req.body.endYear,
      } as Serie;
      break;

    case 'artists':
      body = {
        ...body,
        birthDate: req.body.birthDate,
        birthPlace: req.body.birthPlace ?? '',
      } as Artist;
      break;

    case 'inventions':
      body = {
        ...body,
      } as Invention;
      break;

    case 'characters':
      body = {
        ...body,
      } as Character;

      break;

    case 'albums':
      body = {
        ...body,
        firstPublicationDate: req.body.firstPublicationDate,
        scenarioArtist: req.body.scenarioArtist ?? '',
        cartoonArtist: req.body.cartoonArtist ?? '',
        inventions: req.body.inventions ?? [],
        characters: req.body.characters ?? [],
      } as Album;

      break;
    default:
      return res.status(404).send({ message: 'not found' });
  }
  body = timeStampToFirebaseDate(body);
  req.body = body;

  next();
};
