export const ALERT_CLEAR = 'ALERT_CLEAR';
export const ALERT_REDIRECT = 'ALERT_REDIRECT';
export const ALERT_CONFIRM = 'ALERT_CONFIRM';
export const ALERT_ERROR = 'ALERT_ERROR';

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

export function alertConfirm(message) {
  return { 
    type: ALERT_CONFIRM, 
    payload: message
  };
}

export function alertError(message) {
  return { 
    type: ALERT_ERROR, 
    payload: message
  };
}