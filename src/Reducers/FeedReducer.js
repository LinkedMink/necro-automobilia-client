import { SAVE_FEED_EVENTS } from "../Actions/FeedAction";

const feedReducer = (state = {}, action) => {
  if (action.type === SAVE_FEED_EVENTS) {
    return Object.assign({}, state, action.payload);
  } else {
    return state;
  }
};

export default feedReducer;
