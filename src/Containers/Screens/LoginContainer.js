import { connect } from "react-redux";

import { ServiceUrl } from "../../Constants/Service";
import { HttpMethods, RequestFactory } from "../../Shared/RequestFactory";
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
    login: credentials => {
      let requestData = { 
        email: credentials.email, 
        password: credentials.password 
      };

      let responseHandler = data => {
        return dispatch(saveSession(data.token));
      }

      return RequestFactory.getJsonResponse(
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
