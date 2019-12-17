import { connect } from "react-redux";
import urlJoin from "url-join";

import { Routes, Service } from "../../Constants/Service";
import { getJsonResponse } from "../../Shared/RequestFactory";
import PasswordResetScreen from "../../Components/Screens/PasswordResetScreen";
import { alertRedirect } from "../../Actions/AlertAction";

const SUCCESS_MESSAGE = "A reset link has been sent. Check your email.";

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.account.token ? true : false
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getResetLink: email => {
      let responseHandler = data => {
        return dispatch(alertRedirect(SUCCESS_MESSAGE, "/login"));
      }

      return getJsonResponse(
        dispatch, 
        Service.USER,
        urlJoin(Routes[Service.USER].PASSWORD, encodeURIComponent(email)), 
        responseHandler);
    }
  };
}

const PasswordResetContainer = connect(mapStateToProps, mapDispatchToProps)(PasswordResetScreen);

export default PasswordResetContainer
