export const CONFIRM_CLEAR_KEY = "CONFIRM_CLEAR_KEY";
export const CONFIRM_OPEN_DIALOG = "CONFIRM_OPEN_DIALOG";
export const CONFIRM_SET_VALUE = "CONFIRM_SET_VALUE";

export function confirmOpenDialog(key, message) {
  return {
    type: CONFIRM_OPEN_DIALOG,
    payload: {
      key,
      message,
    },
  };
}

export function confirmClearKey(key) {
  return {
    type: CONFIRM_CLEAR_KEY,
    payload: { key },
  };
}

export function confirmSetValue(value) {
  return {
    type: CONFIRM_SET_VALUE,
    payload: { value },
  };
}
