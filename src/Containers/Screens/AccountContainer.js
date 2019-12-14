import { connect } from "react-redux";

import { ServiceUrl } from "../../Constants/Service";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import AccountScreen from "../../Components/Screens/AccountScreen";
import { saveAccount } from "../../Actions/Account";
import { alertInfo } from "../../Actions/Alert";

const ACCOUNT_PATH = 'account';
const UPDATE_SUCCESS = "Your account has been updated successfully.";
const EMAIL_VERIFICATION_NEEDED = "You will need to verify your email before the next login.";

const mapStateToProps = (state) => {
  return {
    profile: state.account.profile
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAccountData: () => {
      let responseHandler = data => {
        return dispatch(saveAccount(data));
      }

      return getJsonResponse(
        dispatch, 
        ServiceUrl.USER,
        ACCOUNT_PATH, 
        responseHandler, 
        HttpMethods.GET);
    },
    saveAccountData: (properties) => {
      let responseHandler = data => {
        let message = UPDATE_SUCCESS;
        if (properties.email) {
          message += ` ${EMAIL_VERIFICATION_NEEDED}`;
        }

        return dispatch(alertInfo(message));
      }

      return getJsonResponse(
        dispatch, 
        ServiceUrl.USER,
        ACCOUNT_PATH, 
        responseHandler, 
        HttpMethods.PUT,
        properties);
    }
  };
}

const AccountContainer = connect(mapStateToProps, mapDispatchToProps)(AccountScreen);

export default AccountContainer
