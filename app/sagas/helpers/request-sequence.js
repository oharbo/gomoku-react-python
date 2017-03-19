import { call, cancelled, put } from 'redux-saga/effects';
import invariant from 'invariant';
import { request } from '../../actions/creators';

export default function* requestSequence(callFn, meta) {
  invariant(meta, 'Meta is required.');
  yield put(request.onStart(meta));

  try {
    const payload = yield call(...callFn);
    return yield put(request.onSuccess(payload, meta));
  } catch (error) {
    return yield put(request.onError(error, meta));
  } finally {
    if (yield cancelled()) {
      return yield put(request.onCancel(meta));
    }
  }
}
