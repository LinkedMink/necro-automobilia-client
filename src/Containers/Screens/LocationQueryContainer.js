import { connect } from "react-redux";

import LocationQueryScreen from "../../Components/Screens/LocationQueryScreen";
import { Routes, Service } from "../../Constants/Service";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import { saveLocationAccidents } from "../../Actions/AccidentAction";
import { alertInfo } from "../../Actions/AlertAction";

const DEFAULT_DISTANCE = 25000;
const DEFAULT_RESULTS = 5;

const mapStateToProps = (state) => {
  return {
    mapsApiKey: state.config.googleMapsApiKey,
    searchResult: state.accident.locationResult
  };
}

const mapDispatchToProps = (dispatch) => {
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

      if (options && options.startDate && options.endDate) {
        locationQuery.timestampOfCrash = {
          "$gt": options.startDate,
          "$lt": options.endDate,
        }
      }

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
        Service.NECRO_AUTOMOBILIA,
        Routes[Service.NECRO_AUTOMOBILIA].ACCIDENTS, 
        responseHandler, 
        HttpMethods.GET,
        requestData);
    }
  };
}

const LocationQueryContainer = connect(mapStateToProps, mapDispatchToProps)(LocationQueryScreen);

export default LocationQueryContainer;
