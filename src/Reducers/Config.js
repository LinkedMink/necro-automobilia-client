import { SAVE_CONFIG } from '../Actions/Config';

function config(state = {}, action) {
  if (action.type === SAVE_CONFIG) {
    return Object.assign({}, state, action.payload);
  } else {
    return state;
  }
}

export default config;
