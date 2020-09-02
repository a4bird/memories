import { Error } from '../graphql/generated/types';
import { Maybe } from 'graphql/jsutils/Maybe';

export const toErrorMap = (errors: Array<Error>) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ path, message }) => {
    errorMap[path] = message;
  });

  return errorMap;
};
