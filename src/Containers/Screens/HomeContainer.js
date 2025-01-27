import { connect } from "react-redux";

import { alertInfo } from "../../Actions/AlertAction";
import HomeScreen from "../../Components/Home/HomeScreen";
import { Routes, Services } from "../../Constants/Service";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import { saveActiveRoute } from "../../Actions/RouteAction";

const mapStateToProps = state => {
  return {
    mapsApiKey: state.config.googleMapsApiKey,
    searchResult: state.route.activeRoute,
    searchParams: state.route.activeParams,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDialog: dialog => {
      return dispatch(alertInfo(`TODO`));
    },
    query: (source, destination, route, options) => {
      const requestData = {
        source,
        destination,
        route,
        options,
      };

      const responseHandler = data => {
        return dispatch(saveActiveRoute(data));
      };

      return getJsonResponse(
        dispatch,
        Services.NECRO_AUTOMOBILIA,
        Routes[Services.NECRO_AUTOMOBILIA].ROUTES,
        responseHandler,
        HttpMethods.POST,
        requestData
      );
    },
  };
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

export default HomeContainer;
