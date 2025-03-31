/**
 * Winston logger expects string message by default.
 * If you pass an object directly (like your response),
 * Winston doesn't automatically serialize it.
 *
 * JSON.stringify's 2nd and 3rd args:
 * - replacer	(Optional): A function or array to control
 *   which properties are included in the output. Usually
 *   null if you want to include everything. Specify only
 *   those keys in an array which you want to log.
 * - space (Optional): A number or string to control spacing
 *   or indentation. 2 means 2 spaces of indentation per level
 *   (for pretty-printing).
 */
export function printObject(obj: unknown): string {
  return JSON.stringify(obj, null, 2);
}
