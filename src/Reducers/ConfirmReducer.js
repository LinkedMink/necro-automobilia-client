import {
  CONFIRM_CLEAR_KEY,
  CONFIRM_OPEN_DIALOG,
  CONFIRM_SET_VALUE,
} from "../Actions/ConfirmAction";

const confirmReducer = (state = {}, action) => {
  if (action.type === CONFIRM_CLEAR_KEY) {
    const { [action.payload.key]: tempKey, ...inactive } = state.inactive;
    return Object.assign({}, state, { inactive });
  } else if (action.type === CONFIRM_OPEN_DIALOG) {
    return Object.assign({}, state, {
      active: action.payload,
    });
  } else if (action.type === CONFIRM_SET_VALUE) {
    const inactive = Object.assign({}, state.inactive);
    inactive[state.active.key] = action.payload.value;
    return Object.assign({}, state, { inactive, active: undefined });
  } else {
    return state;
  }
};

export default confirmReducer;
