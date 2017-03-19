import {
  REQUEST,
  USER,
} from './types';

const action = (type, payload = {}, meta = {}) => ({ type, payload, meta });

export const request = {
  onCancel: meta => action(REQUEST.CANCELLED, null, meta),
  onError: (error, meta) => action(REQUEST.ERRORED, error, meta),
  onStart: meta => action(REQUEST.STARTED, null, meta),
  onSuccess: (payload, meta) => action(REQUEST.SUCCEEDED, payload, meta),
};

export const userActions = {
  onLogin: (name) => action(USER.LOGIN, name),
  onLoginStarted: () => action(USER.LOGIN_STARTED, {}),
};
