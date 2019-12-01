import { connect } from "react-redux";

import App from "./App";
import { RequestFactory } from "./Shared/RequestFactory";
import { saveConfig } from "./Actions/Config";

const CONFIG_PATH = 'config';

function mapStateToProps (state) {
  return {
    isConfigLoaded: state.config.token ? true : false
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
    }
  };
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
