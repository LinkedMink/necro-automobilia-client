import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import AppContainer from './AppContainer';
import store from "./Store";

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app'),
);

module.hot.accept();
