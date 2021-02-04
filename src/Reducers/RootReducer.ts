import { combineReducers } from "redux";

import accident from "./AccidentReducer";
import account from "./AccountReducer";
import alert from "./AlertReducer";
import config from "./ConfigReducer";
import confirm from "./ConfirmReducer";
import feed from "./FeedReducer";
import loading from "./LoadingReducer";
import route from "./RouteReducer";

const rootMap = {
  accident,
  account,
  alert,
  config,
  confirm,
  feed,
  loading,
  route,
};

const rootReducer = combineReducers(rootMap);

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
