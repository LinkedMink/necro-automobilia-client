import { combineReducers } from 'redux';

import account from './Account';
import alert from './Alert';
import loading from './Loading';

const rootReducer = combineReducers({
  account,
  alert,
  loading,
});

export default rootReducer;