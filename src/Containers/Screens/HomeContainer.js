import { connect } from "react-redux";

import { alertInfo } from "../../Actions/Alert";
import HomeScreen from "../../Components/Screens/HomeScreen";

function mapStateToProps (state) {
  return {
    mapsApiKey: state.config.googleMapsApiKey,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openDialog: (dialog) => {
      return dispatch(alertInfo(`TODO`));
    },
    query: (source, destination) => {
      
      return dispatch(alertInfo(`TODO Source: ${JSON.stringify(source)}, Destination: ${JSON.stringify(source)}`));
      /*
      const locationQuery = {
        location: {
          $nearSphere: {
            $geometry: {
               type : "Point",
               coordinates : location
            },
            $maxDistance: MAX_DISTANCE
          }
        }
      };

      const requestData = {
        query: JSON.stringify(locationQuery),
        pageSize: MAX_RESULTS
      };

      const responseHandler = data => {
        return dispatch(saveLocationAccidents(data));
      }

      return getJsonResponse(
        dispatch, 
        ServiceUrl.NECRO_AUTOMOBILIA,
        ACCIDENTS_PATH, 
        responseHandler, 
        HttpMethods.GET,
        requestData);
        */
    }
  };
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

export default HomeContainer;
