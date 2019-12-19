import { connect } from "react-redux";

import { alertInfo } from "../../Actions/AlertAction";
import HomeScreen from "../../Components/Screens/HomeScreen";
import { Routes, Service } from "../../Constants/Service";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import { saveActiveRoute } from "../../Actions/RouteAction";

const mapStateToProps = (state) => {
  return {
    mapsApiKey: state.config.googleMapsApiKey,
    searchResult: state.route.activeRoute
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDialog: (dialog) => {
      return dispatch(alertInfo(`TODO`));
    },
    query: (source, destination, route) => {
      const requestData = {
        source,
        destination,
        route
      };

      const responseHandler = data => {
        return dispatch(saveActiveRoute(data));
      }

      return getJsonResponse(
        dispatch, 
        Service.NECRO_AUTOMOBILIA,
        Routes[Service.NECRO_AUTOMOBILIA].ROUTES, 
        responseHandler, 
        HttpMethods.POST,
        requestData);
    }
  };
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

export default HomeContainer;
