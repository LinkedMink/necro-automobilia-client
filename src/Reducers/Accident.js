import { SAVE_ACCIDENTS_QUERY } from '../Actions/Accident';

function accident(state = {}, action) {
  if (action.type === SAVE_ACCIDENTS_QUERY) {
    return Object.assign({}, state, action.payload);
  } else {
    return state;
  }
}

export default accident;