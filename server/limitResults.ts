export const cleanLimit = (value: string): number => {
  let valueInt = value ? parseInt(value, 10) : 10;
  valueInt > 10 ? (valueInt = 10) : '';
  return valueInt;
};

export const cleanOffset = (value: string): number => {
  const valueInt = value ? parseInt(value, 10) : 0;
  return valueInt;
};

export const nextOffset = (limit: number, offset: number, count: number): number => {
  let newOffset = offset + limit;
  if (newOffset > count) newOffset = count;
  return newOffset;
};

export const previousOffset = (limit: number, offset: number): number => {
  let newOffset = offset - limit;
  if (newOffset < 0) newOffset = 0;
  return newOffset;
};

export const limitResults = <T extends { name: string }>(
  results: T[],
  limit: string,
  offset: string,
  q: string
): T[] => {
  const regExp = new RegExp(q, 'gmi');
  return results
    .filter((result: T) => result.name.match(regExp))
    .slice(cleanOffset(offset), cleanLimit(limit));
};
