export const dedupAndSort = (array?: string[]): string[] | null => {
  if (!array) {
    return null;
  }

  let result = Array.from(new Set(array));

  result = result.sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  });

  return result;
}