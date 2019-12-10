import { connect } from "react-redux";

import { ServiceUrl } from "../../Constants/Service";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import QueryScreen from "../../Components/Screens/QueryScreen";
import { saveAccidents } from "../../Actions/Accident";

const ACCIDENTS_PATH = 'accidents';

function mapStateToProps (state) {
  return {
    accidentData: state.accident.queryResult
  };
}

function mapDispatchToProps(dispatch) {
  return {
    query: (query, sort, pageNumber, pageSize) => {
      let requestData = { 
        query,
        sort,
        pageNumber,
        pageSize
      };

      let responseHandler = data => {
        return dispatch(saveAccidents(data));
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

const QueryContainer = connect(mapStateToProps, mapDispatchToProps)(QueryScreen);

export default QueryContainer
