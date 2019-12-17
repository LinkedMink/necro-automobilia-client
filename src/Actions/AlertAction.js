export const ALERT_CLEAR = 'ALERT_CLEAR';
export const ALERT_REDIRECT = 'ALERT_REDIRECT';
export const ALERT_ERROR = 'ALERT_ERROR';
export const ALERT_INFO = 'ALERT_INFO';

export function alertClear() {
  return { 
    type: ALERT_CLEAR, 
    payload: null
  };
}

export function alertRedirect(message, path) {
  return { 
    type: ALERT_REDIRECT, 
    payload: {
      message,
      path
    }
  };
}

export function alertError(message) {
  return { 
    type: ALERT_ERROR, 
    payload: message
  };
}

export function alertInfo(message) {
  return { 
    type: ALERT_INFO, 
    payload: message
  };
}
