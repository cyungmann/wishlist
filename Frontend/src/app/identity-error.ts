export interface IdentityError {
  code: string | null;
  description: string | null;
}

export function isIdentityError(arg: unknown): arg is IdentityError {
  if (typeof arg !== 'object')
    return false;
  if (arg === null)
    return false;
  if (Array.isArray(arg))
    return false;
  if (!('code' in arg))
    return false;
  if (!('description' in arg))
    return false;
  if ((arg as any).code !== null && typeof (arg as any).code !== 'string')
    return false;
  if ((arg as any).description !== null && typeof (arg as any).description !== 'string')
    return false;
  return true;
}
