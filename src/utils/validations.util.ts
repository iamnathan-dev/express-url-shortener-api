export function isValidAlias(alias: string): boolean {
  const aliasPattern = new RegExp("^[a-zA-Z0-9_-]{3,20}$");
  return aliasPattern.test(alias);
}
