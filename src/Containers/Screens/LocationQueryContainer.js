import { connect } from "react-redux";

import LocationQueryScreen from "../../Components/Screens/LocationQueryScreen";
import { ServiceUrl } from "../../Constants/Service";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import { saveLocationAccidents } from "../../Actions/Accident";
import { alertInfo } from "../../Actions/Alert";

const ACCIDENTS_PATH = 'accidents';
const DEFAULT_DISTANCE = 25000;
const DEFAULT_RESULTS = 5;

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
    query: (location, options) => {
      const locationQuery = {
        location: {
          $nearSphere: {
            $geometry: {
               type : "Point",
               coordinates : location
            },
            $maxDistance: options && options.searchDistance
              ? options.searchDistance
              : DEFAULT_DISTANCE
          }
        }
      };

      const requestData = {
        query: JSON.stringify(locationQuery),
        pageSize: options && options.pageSize 
          ? options.pageSize
          : DEFAULT_RESULTS, 
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
