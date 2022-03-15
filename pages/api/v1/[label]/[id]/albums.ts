import { baseHandler } from '@server/baseHandler';
import { enrichData } from '@server/enrichResults';
import { getById } from '@server/data/getById';
import { update } from '@server/data/update';
import { deleteById } from '@server/data/deleteById';

const handler = baseHandler()
  .options(async (req, res) => {
    return res.status(200).send('ok');
  })
  .get(async (req, res) => {
    const { id, label } = req.query as { id: string; label: LabelTypes };
    // get all albums
  })
  .patch(async (req, res) => {
    const { id, label } = req.query as { id: string; label: LabelTypes };
    // add label to an album
  })
  .delete(async (req, res) => {
    const { id, label } = req.query as { id: string; label: LabelTypes };

    // delete label from album
    return res.status(204).send({});
  });

export default handler;
