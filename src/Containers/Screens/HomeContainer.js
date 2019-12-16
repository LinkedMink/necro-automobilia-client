import { connect } from "react-redux";

import { alertInfo } from "../../Actions/Alert";
import HomeScreen from "../../Components/Screens/HomeScreen";
import { ServiceUrl } from "../../Constants/Service";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import { saveActiveRoute } from "../../Actions/Route";

const ROUTES_PATH = 'routes'

function mapStateToProps (state) {
  return {
    mapsApiKey: state.config.googleMapsApiKey,
    searchResult: state.route.activeRoute
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openDialog: (dialog) => {
      return dispatch(alertInfo(`TODO`));
    },
    query: (source, destination) => {
      const requestData = {
        source: JSON.stringify(source),
        destination: JSON.stringify(destination)
      };

      const responseHandler = data => {
        return dispatch(saveActiveRoute(data));
      }

      return getJsonResponse(
        dispatch, 
        ServiceUrl.NECRO_AUTOMOBILIA,
        ROUTES_PATH, 
        responseHandler, 
        HttpMethods.GET,
        requestData);
    }
  };
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

export default HomeContainer;
