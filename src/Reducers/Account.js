import { SAVE_SESSION, DESTROY_SESSION } from '../Actions/Account';

function account(state = {}, action) {
  if (action.type === SAVE_SESSION) {
    return Object.assign({}, state, action.payload);
  } else if (action.type === DESTROY_SESSION) {
    return Object.assign({}, state, {
      token: undefined, decodedToken: undefined
    });
  } else {
    return state;
  }
}

export default account;