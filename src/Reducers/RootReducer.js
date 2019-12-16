import { combineReducers } from 'redux';

import accident from './Accident';
import account from './Account';
import alert from './Alert';
import config from './Config';
import loading from './Loading';
import route from './Route';

const rootReducer = combineReducers({
  accident,
  account,
  alert,
  config,
  loading,
  route
});

export default rootReducer;
