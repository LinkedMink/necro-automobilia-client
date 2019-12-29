import { SAVE_ACCOUNT, SAVE_SESSION, DESTROY_SESSION, SAVE_SETTINGS } from '../Actions/AccountAction';

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
  } else if (action.type === SAVE_SETTINGS) { 
    const settings = Object.assign({}, state.settings);
    settings[action.payload.name] = action.payload;
    return Object.assign({}, state, { settings });
  } else {
    return state;
  }
}

export default accountReducer;
