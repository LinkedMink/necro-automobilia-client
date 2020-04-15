import { connect } from "react-redux";

import { StorageKey } from "../../Constants/Storage";
import { Routes, Services } from "../../Constants/Service";
import { decodeToken } from "../../Shared/DecodeToken";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import LoginScreen from "../../Components/Screens/LoginScreen";
import { saveSession } from "../../Actions/AccountAction";

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.account.token ? true : false
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password, rememberMe) => {
      let requestData = { 
        email,
        password,
      };

      let responseHandler = data => {
        localStorage.removeItem(StorageKey.JWT_TOKEN);
        if (rememberMe) {
          localStorage.setItem(StorageKey.JWT_TOKEN, data.token);
        }

        var decoded = decodeToken(data.token);
        return dispatch(saveSession(data.token, decoded));
      }

      return getJsonResponse(
        dispatch, 
        Services.USER,
        Routes[Services.USER].AUTHENTICATE, 
        responseHandler, 
        HttpMethods.POST,
        requestData);
    }
  };
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

export default LoginContainer
