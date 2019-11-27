export const SAVE_SESSION = 'SAVE_SESSION';
export const DESTROY_SESSION = 'DESTROY_SESSION';

export function saveSession(serverBaseUrl, email, userId, token, roles) {
  return { 
    type: SAVE_SESSION, 
    payload: { 
      serverBaseUrl: serverBaseUrl, 
      email: email, 
      userId: userId, 
      token: token,
      roles: roles
    }
  };
}

export function destroySession() {
  return { 
    type: DESTROY_SESSION, 
    payload: null
  };
}