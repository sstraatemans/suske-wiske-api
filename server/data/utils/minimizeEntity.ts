export const minimizeEntity = <T extends { id: string; name: string }>(
  entity: T,
  label: LabelTypes
): any => {
  return {
    id: entity.id,
    name: entity.name,
    url: `${process.env.APIURL}/v1/${label}/${entity.id}`,
  };
};

export const minimizeEntities = <T extends { id: string; name: string }>(
  entities: T[],
  label: LabelTypes
): any[] => {
  return entities.map((entity) => minimizeEntity(entity, label));
};
