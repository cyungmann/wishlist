import { IdentityError, isIdentityError } from "./identity-error";

export interface IdentityResult {
  errors: Iterable<IdentityError>;
}

export function isIdentityResult(arg: unknown): arg is IdentityResult {
  if (typeof arg !== 'object')
    return false;
  if (arg === null)
    return false;
  if (Array.isArray(arg))
    return false;
  if (!('errors' in arg))
    return false;
  if (typeof (arg as any).errors[Symbol.iterator] !== 'function')
    return false;
  return Array.from((arg as any).errors).every(x => isIdentityError(x));
}
