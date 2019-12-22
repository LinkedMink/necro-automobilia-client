export const SAVE_ACTIVE_ROUTE = 'SAVE_ACTIVE_ROUTE';

export function saveActiveRoute(data, params) {
  return { 
    type: SAVE_ACTIVE_ROUTE, 
    payload: {
      activeRoute: data,
      activeParams: params
    } 
  };
}
