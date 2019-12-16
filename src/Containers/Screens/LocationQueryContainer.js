import { connect } from "react-redux";

import LocationQueryScreen from "../../Components/Screens/LocationQueryScreen";
import { ServiceUrl } from "../../Constants/Service";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import { saveLocationAccidents } from "../../Actions/Accident";
import { alertInfo } from "../../Actions/Alert";

const ACCIDENTS_PATH = 'accidents';
const MAX_DISTANCE = 25000;
const MAX_RESULTS = 5;

function mapStateToProps (state) {
  return {
    mapsApiKey: state.config.googleMapsApiKey,
    searchResult: state.accident.locationResult
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openDialog: (dialog) => {
      return dispatch(alertInfo(`TODO`));
    },
    query: (location) => {
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
    }
  };
}

const LocationQueryContainer = connect(mapStateToProps, mapDispatchToProps)(LocationQueryScreen);

export default LocationQueryContainer;
