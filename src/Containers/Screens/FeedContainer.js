import { connect } from "react-redux";

import { Routes, Service } from "../../Constants/Service";
import { HttpMethods, getJsonResponse } from "../../Shared/RequestFactory";
import FeedScreen from "../../Components/Feed/FeedScreen";
import { saveFeedEvents } from "../../Actions/FeedAction";

const mapStateToProps = (state) => {
  return {
    events: state.feed.latest
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    query: () => {
      let responseHandler = data => {
        return dispatch(saveFeedEvents(data));
      }

      return getJsonResponse(
        dispatch, 
        Service.NECRO_AUTOMOBILIA,
        Routes[Service.NECRO_AUTOMOBILIA].FEED_EVENTS,
        responseHandler, 
        HttpMethods.GET);
    }
  };
}

const FeedContainer = connect(mapStateToProps, mapDispatchToProps)(FeedScreen);

export default FeedContainer
