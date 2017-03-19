import { takeEvery, takeLatest, channel, eventChannel } from 'redux-saga'; // eslint-disable-line no-unused-vars
import { take, fork, put, call, cancel, cancelled, race, select } from 'redux-saga/effects'; // eslint-disable-line no-unused-vars
// import cookie from 'react-cookie';
import { USER } from '../actions/types';
import { loginUserWithName } from './subroutines/session';

// import { AUTH_TOKEN_EXCHANGE_SUCCESS, AUTH_SET_STATE } from '../actions/auth';
// import { get, post, patch } from '../api/network'; // eslint-disable-line no-unused-vars

// import requestSequence from 'helpers/request-sequence';
// import { loginEndpointSelector } from '../selectors/';
// import { loginEndpoint } from '../api/';

/*  **************************** Subroutines ***********************************  */

// sample subroutine

// export function* onLoginStarted({ payload: { email, password } }) {
//   const { url } = yield select(loginEndpointSelector);
//   yield call(
//     requestSequence,
//     [loginEndpoint, url, email, password],
//     { activity: 'SOME_TYPE', path: 'some_type_group' },
//   );
// }

// export function onLoginStarted() {
//   get(API.tokenUrl)
//     .then(resp => resp.json())
//     .then(resp => window.location.replace(`${API.ssoUrl}?jwtRequest=${resp.data}`));
// }

/*  ****************************** WATCHERS ************************************  */
// export function onLogoutStarted() {
//   get(API.tokenUrl)
//     .then(resp => resp.json())
//     .then(resp => window.location.replace(`${API.ssoUrl}/logout?jwtRequest=${resp.data}`));
// }
//
// const exchangeRequest = (payload, url) => {
//   if (!payload.jwt || payload.jwt === 'undefined') return Promise.resolve();
//   return post(url, payload, false).then(resp => resp.json());
// };
//
// export function* onTokenValidate({ payload }) {
//   if (!payload.jwt || payload.jwt === 'undefined') return;
//   const resp = yield call(exchangeRequest, { jwt: payload.jwt }, API.validateUrl);
//   yield put({ type: AUTH_SET_STATE, payload: resp.data.isValid });
// }
//
// export function* onTokenExchange({ payload }) {
//   const resp = yield call(exchangeRequest, payload, API.exchangeUrl);
//   const token = {
//     id: resp.data.access_token_id,
//     jwt: resp.data.access_token,
//   };
//   cookie.save('token', token.jwt, { path: '/' });
//   yield put({ type: AUTH_TOKEN_EXCHANGE_SUCCESS, payload: token });
// }

/* ****************************** WATCHERS *************************************/

// sample watcher

// export function* watchForSuccsessLogin() {
//   yield* takeLatest(
//     ({ type, meta = {} }) =>
//     type === REQUEST.SUCCEEDED &&
//     meta.activity === SOME_GROUP_TYPE.SOME_TYPE &&
//     meta.path === 'some_type_group',
//     someSubroutineFunction);
// }

export function* watchUserLoginStarted() {
  yield takeLatest(USER.LOGIN, loginUserWithName);
}

export default function* root() {
  yield [
    fork(watchUserLoginStarted),
  ];
}
