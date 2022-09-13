export const showAccount = (str:string, maxlength = 7) => {
  const length = str.length;
  return str.length > maxlength
    ? str.slice(0, maxlength - 1) + '...' + str.slice(37, length)
    : str;
};
