import { call, cancelled as cancelledSaga, put } from 'redux-saga/effects';

/**
 * request can be used to call a promise in a saga and have events
 * dispatched indicating the promises status.
 */

// Creates types for start, success, error, and cancelled.
export function requestTypes(type) {
  const base = type;
  const started = `${type}_STARTED`;
  const succeeded = `${type}_SUCCEEDED`;
  const errored = `${type}_ERRORED`;
  const cancelled = `${type}_CANCELLED`;
  return {
    base,
    started,
    succeeded,
    errored,
    cancelled,
  };
}

// Creates array of type values for start, success, error, and cancelled.
export function requestTypesValues(type) {
  return Object.values(requestTypes(type));
}

export const STATUS = {
  STARTED: 'STARTED',
  SUCCEEDED: 'SUCCEEDED',
  ERRORED: 'ERRORED',
  CANCELLED: 'CANCELLED',
};

// Creates action creators for start, success, error, and cancelled.
export function requestActionCreators(type) {
  const {
    started,
    succeeded,
    errored,
    cancelled,
  } = requestTypes(type);
  return {
    start: meta => ({
      type: started,
      meta,
      __request__: STATUS.STARTED,
    }),
    success: (payload, meta) => ({
      type: succeeded,
      payload,
      meta,
      __request__: STATUS.SUCCEEDED,
    }),
    error: (error, meta) => ({
      type: errored,
      meta,
      __request__: STATUS.ERRORED,
    }),
    cancel: meta => ({
      type: cancelled,
      meta,
      __request__: STATUS.CANCELLED,
    }),
  };
}

// Calls a promise. Puts events for start, success, error, and cancelled.
export function* request(type, func, meta) {
  // Get the request event types for this type.
  const {
    start,
    success,
    error,
    cancel,
  } = requestActionCreators(type);

  // Put the started type.
  yield put(start(meta));

  try {
    // Attempt to call the promis.
    const payload = yield call(...func);

    // If it's successful put the succeeded type.
    return yield put(success(payload, meta));
  } catch (e) {
    // If it's unsuccessful put the errored type.
    return yield put(error(e, meta));
  } finally {
    if (yield cancelledSaga()) {
      // If this saga is cancelled put the cancelled type.
      return yield put(cancel(meta));
    }
  }
}
