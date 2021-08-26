export const limitResults = <T extends { name: string }>(
  results: T[],
  limit: string,
  offset: string,
  q: string
): T[] => {
  const limitInt = limit ? parseInt(limit, 10) : 10;
  const offsetInt = offset ? parseInt(offset, 10) : 0;

  const regExp = new RegExp(q, 'gmi');
  return results.filter((result: T) => result.name.match(regExp)).slice(offsetInt, limitInt);
};
