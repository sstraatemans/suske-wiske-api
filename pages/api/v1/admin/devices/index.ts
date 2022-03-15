import { baseHandler } from '@server/baseHandler';
import { getAll } from '@server/data/getAll';

const handler = baseHandler().get(async (req, res) => {
  const devices = await getAll<Device>('devices');
  const count = devices.length;

  const miniArray = devices.map((device) => ({
    id: device.id,
    name: device.name,
  }));

  res.json({
    count,
    results: miniArray,
  });
});

export default handler;
