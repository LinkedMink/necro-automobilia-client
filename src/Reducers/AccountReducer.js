import { SAVE_ACCOUNT, SAVE_SESSION, DESTROY_SESSION } from '../Actions/AccountAction';

const accountReducer = (state = {}, action) => {
  if (action.type === SAVE_SESSION) {
    return Object.assign({}, state, action.payload);
  } else if (action.type === DESTROY_SESSION) {
    return Object.assign({}, state, {
      token: undefined, decodedToken: undefined
    });
  } else if (action.type === SAVE_ACCOUNT) { 
    return Object.assign({}, state, {
      profile: action.payload
    });
  } else {
    return state;
  }
}

export default accountReducer;
