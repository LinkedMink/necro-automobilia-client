import { connect } from "react-redux";

import { ServiceUrl } from "../../Constants/Service";
import { HttpMethods, RequestFactory } from "../../Shared/RequestFactory";
import SetPasswordScreen from "../../Components/Screens/SetPasswordScreen";
import { alertRedirect } from "../../Actions/Alert";

const PASSWORD_RESET_PATH = 'password';

function mapStateToProps (state) {
  return {
    isLoggedIn: state.account.token ? true : false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetPassword: (email, resetToken, password) => {
      let requestData = { 
        email,
        resetToken,
        password,
      };

      let responseHandler = data => {
        return dispatch(alertRedirect(
          "Your password has been reset.", "/login"));
      }

      return RequestFactory.getJsonResponse(
        dispatch, 
        ServiceUrl.USER,
        PASSWORD_RESET_PATH, 
        responseHandler, 
        HttpMethods.PUT,
        requestData);
    }
  };
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(SetPasswordScreen);

export default LoginContainer
