import { ALERT_CLEAR, ALERT_ERROR, ALERT_REDIRECT, ALERT_INFO } from '../Actions/AlertAction';

const AlertSeverity = {
  NONE: "None",
  INFO: "Info",
  ERROR: "Error",
}

const alertReducer = (state = {}, action) => {
  if (action.type === ALERT_CLEAR) {
    return Object.assign({}, state, { 
      severity: undefined, message: undefined, redirect: undefined
    });
  } else if (action.type === ALERT_ERROR) {
    return Object.assign({}, state, { 
      severity: AlertSeverity.ERROR, message: action.payload, redirect: undefined
    });
  } else if (action.type === ALERT_INFO) {
    return Object.assign({}, state, { 
      severity: AlertSeverity.INFO, message: action.payload, redirect: undefined
    });
  } else if (action.type === ALERT_REDIRECT) {
    return Object.assign({}, state, { 
      severity: AlertSeverity.INFO, 
      message: action.payload.message, 
      redirect: action.payload.path
    });
  } else {
    return state;
  }
}

export default alertReducer;
