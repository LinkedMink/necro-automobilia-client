import { connect } from "react-redux";

import App from "./App";
import { StorageKey } from "./Constants/Storage";
import { getJsonResponse } from "./Shared/RequestFactory";
import { decodeToken } from "./Shared/DecodeToken";
import { saveConfig } from "./Actions/ConfigAction";
import { saveSession } from "./Actions/AccountAction";
import { Routes, Services } from "./Constants/Service";

const mapStateToProps = state => {
  return {
    isConfigLoaded: state.config.urls ? true : false,
    isLoggedIn: state.account.token ? true : false,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getConfig: () => {
      if (process.env.LOCAL_CONFIG) {
        const localConfig = JSON.parse(process.env.LOCAL_CONFIG);
        dispatch(saveConfig(localConfig));
        return;
      }

      let responseHandler = data => {
        return dispatch(saveConfig(data));
      };

      return getJsonResponse(
        dispatch,
        Services.SELF,
        Routes[Services.SELF].CONFIG,
        responseHandler
      );
    },
    getAccount: () => {
      const token = localStorage.getItem(StorageKey.JWT_TOKEN);
      if (token) {
        var decoded = decodeToken(token);
        return dispatch(saveSession(token, decoded));
      }
    },
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
