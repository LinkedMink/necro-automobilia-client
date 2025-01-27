import { connect } from "react-redux";

import LocationScreen from "../../Components/Location/LocationScreen";
import { Routes, Services } from "../../Constants/Service";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import { saveLocationAccidents } from "../../Actions/AccidentAction";
import { alertInfo } from "../../Actions/AlertAction";

const DEFAULT_DISTANCE = 30000;
const DEFAULT_RESULTS = 5;

const mapStateToProps = state => {
  return {
    mapsApiKey: state.config.googleMapsApiKey,
    searchResult: state.accident.locationResult,
    searchParams: state.accident.locationParams,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDialog: dialog => {
      return dispatch(alertInfo(`TODO`));
    },
    query: (location, options, params) => {
      const locationQuery = {
        location: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: location,
            },
            $maxDistance:
              options && options.searchDistance
                ? options.searchDistance
                : DEFAULT_DISTANCE,
          },
        },
      };

      if (options && options.startDate && options.endDate) {
        locationQuery.timestampOfCrash = {
          $gt: options.startDate,
          $lt: options.endDate,
        };
      }

      const requestData = {
        query: JSON.stringify(locationQuery),
        pageSize:
          options && options.pageSize ? options.pageSize : DEFAULT_RESULTS,
      };

      const responseHandler = data => {
        return dispatch(saveLocationAccidents(data, params));
      };

      return getJsonResponse(
        dispatch,
        Services.NECRO_AUTOMOBILIA,
        Routes[Services.NECRO_AUTOMOBILIA].ACCIDENTS,
        responseHandler,
        HttpMethods.GET,
        requestData
      );
    },
  };
};

const LocationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationScreen);

export default LocationContainer;
