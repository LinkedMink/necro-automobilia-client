import { connect } from "react-redux";

import { ServiceUrl } from "../../Constants/Service";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import QueryScreen from "../../Components/Screens/QueryScreen";
import { saveAccidents } from "../../Actions/Accidents";

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
        saveAccidents(data);
      }

      return getJsonResponse(
        dispatch, 
        ServiceUrl.NECRO_AUTOMOBILIA,
        AUTHENTICATE_PATH, 
        responseHandler, 
        HttpMethods.POST,
        requestData);
    }
  };
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(QueryScreen);

export default LoginContainer
