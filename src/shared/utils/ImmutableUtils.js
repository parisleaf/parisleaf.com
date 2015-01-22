/**
 * Get a nested path from an Immutable collection. If path does not exist,
 * returns undefined.
 */
export function nestedGet(collection, ...keys) {
  let value = collection;

  for (let key of keys) {
    if (!value || typeof value.get !== 'function') {
      value = undefined;
      break;
    }

    value = value.get(key);

    if (typeof value === 'undefined') break;
  }

  return value;
}
