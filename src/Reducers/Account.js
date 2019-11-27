import { SAVE_SESSION, DESTROY_SESSION } from '../Actions/Account';

function account(state = {}, action) {
  if (action.type === SAVE_SESSION) {
    return Object.assign({}, state, action.payload);
  } else if (action.type === DESTROY_SESSION) {
    return Object.assign({}, state, {
      serverBaseUrl: null, email: null, userId: null, token: null, roles: null
    });
  } else {
    return Object.assign({}, state, action.payload);
  }
}

export default account;