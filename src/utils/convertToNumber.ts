export const convertToNumber = (number) => {
  const integer = +number;

  return isNaN(integer) ? undefined : integer;
};
