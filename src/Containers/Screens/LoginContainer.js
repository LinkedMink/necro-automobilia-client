import { connect } from "react-redux";

import { StorageKey } from "../../Constants/Storage";
import { ServiceUrl } from "../../Constants/Service";
import { decodeToken } from "../../Shared/DecodeToken";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import LoginScreen from "../../Components/Screens/LoginScreen";
import { saveSession } from "../../Actions/Account";

const AUTHENTICATE_PATH = 'authenticate';

function mapStateToProps (state) {
  return {
    isLoggedIn: state.account.token ? true : false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password, rememberMe) => {
      let requestData = { 
        email,
        password,
      };

      let responseHandler = data => {
        if (rememberMe) {
          localStorage.setItem(StorageKey.JWT_TOKEN, data.token)
        }

        var decoded = decodeToken(data.token);
        return dispatch(saveSession(data.token, decoded));
      }

      return getJsonResponse(
        dispatch, 
        ServiceUrl.USER,
        AUTHENTICATE_PATH, 
        responseHandler, 
        HttpMethods.POST,
        requestData);
    }
  };
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

export default LoginContainer
