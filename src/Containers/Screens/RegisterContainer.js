import { connect } from "react-redux";

import { ServiceUrl } from "../../Constants/Service";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import RegisterScreen from "../../Components/Screens/RegisterScreen";
import { alertRedirect } from "../../Actions/Alert";

const REGISTER_PATH = 'register';

function mapStateToProps (state) {
  return {
    isLoggedIn: state.account.token ? true : false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    register: (email, password) => {
      let requestData = { 
        email,
        password,
      };

      let responseHandler = data => {
        return dispatch(alertRedirect(
          "Your account has been created. Verify your email address to login.", "/login"));
      }

      return getJsonResponse(
        dispatch, 
        ServiceUrl.USER,
        REGISTER_PATH, 
        responseHandler, 
        HttpMethods.POST,
        requestData);
    }
  };
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

export default LoginContainer
