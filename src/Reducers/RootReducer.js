import { combineReducers } from "redux";

import accident from "./AccidentReducer";
import account from "./AccountReducer";
import alert from "./AlertReducer";
import config from "./ConfigReducer";
import confirm from "./ConfirmReducer";
import feed from "./FeedReducer";
import loading from "./LoadingReducer";
import route from "./RouteReducer";

const rootReducer = combineReducers({
  accident,
  account,
  alert,
  config,
  confirm,
  feed,
  loading,
  route,
});

export default rootReducer;
