import { combineReducers } from 'redux';

import accident from './Accident';
import account from './Account';
import alert from './Alert';
import config from './Config';
import loading from './Loading';

const rootReducer = combineReducers({
  accident,
  account,
  alert,
  config,
  loading,
});

export default rootReducer;