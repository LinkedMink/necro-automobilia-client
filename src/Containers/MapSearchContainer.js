import { connect } from "react-redux";

import MapSearchPanel from "../Components/MapSearchPanel";

function mapStateToProps (state) {
  return {
    apiKey: state.config.googleMapsApiKey,
  };
}

const MapSearchContainer = connect(mapStateToProps)(MapSearchPanel);

export default MapSearchContainer;
