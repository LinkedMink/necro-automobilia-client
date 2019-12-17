export const SAVE_ACTIVE_ROUTE = 'SAVE_ACTIVE_ROUTE';

export function saveActiveRoute(data) {
  return { 
    type: SAVE_ACTIVE_ROUTE, 
    payload: data 
  };
}
