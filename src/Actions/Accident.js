export const SAVE_ACCIDENTS_QUERY = 'SAVE_ACCIDENTS_QUERY';

export function saveAccidents(data) {
  return { 
    type: SAVE_ACCIDENTS_QUERY, 
    payload: { queryResult: data }
  };
}