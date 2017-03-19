import { call, fork, select, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import requestSequence from '../helpers/request-sequence';

export function* loginUserWithName() {
  console.log('SAGA RUN');
  // const { deviceUrl, idToken, userId } = yield select(loginSagaConnector);
  // return yield call(
  //   requestSequence,
  //   [getUserDevices, deviceUrl, userId, idToken],
  //   { activity: SESSION.LOGIN, path: 'devices' },
  // );
}