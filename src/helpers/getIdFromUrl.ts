export const getIdFromUrl = (url: string, resource: string): string | null => {
  const regex = new RegExp(`\\/api\\/${resource}\\/(\\d+)`);
  const match = url.match(regex);
  return match ? match[1] : null;
};
