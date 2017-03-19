import { USER } from '../actions/types';

export const initialState = {
  userName: '',
};

export default (state = initialState, { type, payload = {} }) => {
  if (type === USER.LOGIN) {
    return {
      ...state,
      userName: payload.username,
    };
  }

  return state;
};
