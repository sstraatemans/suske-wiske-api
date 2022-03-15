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
    const data = await getById<AllTypes>(label, id);
    if (!data) return res.status(404).json({ detail: 'Not found' });
    const enrichedResult = await enrichData<AllTypes>([data], label);

    res.json(enrichedResult[0]);
  })
  .put(async (req, res) => {
    const { body } = req;
    const { label } = req.query as { label: LabelTypes };

    const data = await update<AllTypes>(label, body);
    return res.json(data);
  })
  .delete(async (req, res) => {
    const { id, label } = req.query as { id: string; label: LabelTypes };

    // await deleteImages('characters', id);
    await deleteById(label, id);

    return res.status(204).send({});
  });

export default handler;
