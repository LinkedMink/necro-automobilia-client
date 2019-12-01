import { combineReducers } from 'redux';

import account from './Account';
import alert from './Alert';
import config from './Config';
import loading from './Loading';

const rootReducer = combineReducers({
  account,
  alert,
  config,
  loading,
});

export default rootReducer;