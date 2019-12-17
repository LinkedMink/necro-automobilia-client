export const SAVE_FEED_EVENTS = 'SAVE_FEED_EVENTS';

export function saveFeedEvents(data) {
  return { 
    type: SAVE_FEED_EVENTS, 
    payload: { latest: data }
  };
}
