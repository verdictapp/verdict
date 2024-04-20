export const createQueryString = (name, value, searchParams) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);

  return params.toString();
};
