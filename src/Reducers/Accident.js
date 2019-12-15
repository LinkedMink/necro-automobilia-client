import { SAVE_LOCATION_QUERY, SAVE_TEST_QUERY } from '../Actions/Accident';

function accident(state = {}, action) {
  if (action.type === SAVE_LOCATION_QUERY) {
    return Object.assign({}, state, action.payload);
  } else if (action.type === SAVE_TEST_QUERY) {
    return Object.assign({}, state, action.payload);
  } else {
    return state;
  }
}

export default accident;