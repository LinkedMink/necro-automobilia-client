export const SAVE_SESSION = "SAVE_SESSION";
export const DESTROY_SESSION = "DESTROY_SESSION";
export const SAVE_ACCOUNT = "SAVE_ACCOUNT";
export const SAVE_SETTINGS = "SAVE_SETTINGS";

export function saveSession(token, decodedToken) {
  return {
    type: SAVE_SESSION,
    payload: {
      token,
      decodedToken,
    },
  };
}

export function destroySession() {
  return {
    type: DESTROY_SESSION,
    payload: null,
  };
}

export function saveAccount(data) {
  return {
    type: SAVE_ACCOUNT,
    payload: data,
  };
}

export function saveSettings(data) {
  return {
    type: SAVE_SETTINGS,
    payload: data,
  };
}
