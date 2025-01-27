import { connect } from "react-redux";

import { Routes, Services } from "../../Constants/Service";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import RegisterScreen from "../../Components/Screens/RegisterScreen";
import { alertRedirect } from "../../Actions/AlertAction";

const SUCCESS_MESSAGE =
  "Your account has been created. Verify your email address to login.";

const mapStateToProps = state => {
  return {
    isLoggedIn: state.account.token ? true : false,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (email, password) => {
      let requestData = {
        email,
        password,
      };

      let responseHandler = data => {
        return dispatch(alertRedirect(SUCCESS_MESSAGE, "/login"));
      };

      return getJsonResponse(
        dispatch,
        Services.USER,
        Routes[Services.USER].REGISTER,
        responseHandler,
        HttpMethods.POST,
        requestData
      );
    },
  };
};

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);

export default RegisterContainer;
