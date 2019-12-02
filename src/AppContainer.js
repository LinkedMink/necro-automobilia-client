import jwt from "jsonwebtoken"
import { connect } from "react-redux";

import App from "./App";
import { StorageKey } from "./Constants/Storage";
import { RequestFactory } from "./Shared/RequestFactory";
import { saveConfig } from "./Actions/Config";
import { saveSession } from "./Actions/Account";

const CONFIG_PATH = 'config';

function mapStateToProps (state) {
  return {
    isConfigLoaded: state.config.userServiceUrl ? true : false,
    isLoggedIn: state.account.token ? true : false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getConfig: () => {
      if (process.env.LOCAL_CONFIG) {
        const localConfig = JSON.parse(process.env.LOCAL_CONFIG);
        dispatch(saveConfig(localConfig));
        return;
      }
      
      let responseHandler = data => {
        return dispatch(saveConfig(data));
      }

      return RequestFactory.getJsonResponse(
        dispatch, 
        '',
        CONFIG_PATH, 
        responseHandler);
    },
    getAccount: () => {
      const token = localStorage.getItem(StorageKey.JWT_TOKEN);
      if (token) {
        // TODO get public key with config endpoint and verify
        var decoded = jwt.decode(token);
        return dispatch(saveSession(token, decoded));
      }
    }
  };
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
