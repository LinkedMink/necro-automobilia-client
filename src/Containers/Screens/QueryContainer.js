import { connect } from "react-redux";

import { Routes, Service } from "../../Constants/Service";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import QueryScreen from "../../Components/Screens/QueryScreen";
import { saveTestAccidents } from "../../Actions/AccidentAction";

const mapStateToProps = (state) => {
  return {
    searchResult: state.accident.testResult,
    searchParams: state.accident.testParams,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    query: (query, sort, pageNumber, pageSize) => {
      let requestData = { 
        query,
        sort,
        pageNumber,
        pageSize
      };

      let responseHandler = data => {
        return dispatch(saveTestAccidents(data));
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

const QueryContainer = connect(mapStateToProps, mapDispatchToProps)(QueryScreen);

export default QueryContainer
