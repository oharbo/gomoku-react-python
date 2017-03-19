import _ from 'lodash';

const createTypes = (base, types) =>
  _.zipObject(types, types.map(type => `${base}_${type}`));

export const REQUEST = createTypes('REQUEST', [
  'CANCELLED',
  'ERRORED',
  'STARTED',
  'SUCCEEDED',
]);

export const USER = createTypes('USER', [
  'LOGIN',
  'LOGIN_STARTED',
  'LOGOUT',
]);
