import { Transform } from 'class-transformer';
import type { TransformFnParams } from 'class-transformer';

/**
 * To lowerCase transformer for class-validator DTO's
 *
 * @description Converts string to lowercase.
 */
export function toLowerCaseTransform() {
  return Transform(({ value }: TransformFnParams) =>
    String(value).toLowerCase(),
  );
}
