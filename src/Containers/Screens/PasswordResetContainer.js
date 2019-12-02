import { connect } from "react-redux";
import urlJoin from "url-join";

import { ServiceUrl } from "../../Constants/Service";
import { RequestFactory } from "../../Shared/RequestFactory";
import PasswordResetScreen from "../../Components/Screens/PasswordResetScreen";
import { alertRedirect } from "../../Actions/Alert";

const PASSWORD_RESET_PATH = 'password';

function mapStateToProps (state) {
  return {
    isLoggedIn: state.account.token ? true : false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getResetLink: email => {
      let responseHandler = data => {
        return dispatch(alertRedirect(
          "A reset link has been sent. Check your email.", "/login"));
      }

      return RequestFactory.getJsonResponse(
        dispatch, 
        ServiceUrl.USER,
        urlJoin(PASSWORD_RESET_PATH, encodeURIComponent(email)), 
        responseHandler);
    }
  };
}

const PasswordResetContainer = connect(mapStateToProps, mapDispatchToProps)(PasswordResetScreen);

export default PasswordResetContainer
