export const toKebabCase = (str) => {
  return str.trim().toLowerCase().replace(/\s+/g, "-");
};
