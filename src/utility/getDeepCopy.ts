/**
 * Deeply merges the properties of the updated object into the original object.
 *
 * @param {any} original - The original object.
 * @param {any} updated - The object containing the updated values.
 * @returns {any} The deeply updated object.
 */
export function deepUpdate<T extends object>(original: T, updated: Partial<T>): T {
  if (typeof original !== 'object' || original === null) {
    return updated as T;
  }

  if (Array.isArray(original) && Array.isArray(updated)) {
    const updatedArray = [...original];  // Start with a shallow copy of the original array

    updated.forEach((item, index) => {
      if (original[index] && typeof original[index] === 'object') {
        // Recursively update the item if it exists in both arrays
        updatedArray[index] = deepUpdate(original[index], item);
      } else {
        // Otherwise, just replace or add the new item
        updatedArray[index] = item;
      }
    });

    return updatedArray as T;  // Return the modified array
  }

  for (const key in updated) {
    if (Object.prototype.hasOwnProperty.call(updated, key)) {
      if (Array.isArray(updated[key])) {
        // Deeply update arrays
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        original[key as keyof T] = deepUpdate(original[key as keyof T], updated[key]);
      } else if (typeof updated[key] === 'object' && updated[key] !== null) {
        // Deeply update objects
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        original[key as keyof T] = deepUpdate(original[key as keyof T], updated[key]);
      } else {
        // Directly assign the value if it's a primitive
        original[key as keyof T] = updated[key] as T[keyof T];
      }
    }
  }

  return original;
}
