export const SAVE_SESSION = 'SAVE_SESSION';
export const DESTROY_SESSION = 'DESTROY_SESSION';

export function saveSession(token) {
  return { 
    type: SAVE_SESSION, 
    payload: { 
      token: token
    }
  };
}

export function destroySession() {
  return { 
    type: DESTROY_SESSION, 
    payload: null
  };
}