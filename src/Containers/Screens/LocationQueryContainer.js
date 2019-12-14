import { connect } from "react-redux";

import LocationQueryScreen from "../../Components/Screens/LocationQueryScreen";

function mapStateToProps (state) {
  return {
    mapsApiKey: state.config.googleMapsApiKey,
  };
}

const LocationQueryContainer = connect(mapStateToProps)(LocationQueryScreen);

export default LocationQueryContainer;
