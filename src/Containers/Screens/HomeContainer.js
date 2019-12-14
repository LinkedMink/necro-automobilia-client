import { connect } from "react-redux";

import HomeScreen from "../../Components/Screens/HomeScreen";

function mapStateToProps (state) {
  return {
    mapsApiKey: state.config.googleMapsApiKey,
  };
}

const HomeContainer = connect(mapStateToProps)(HomeScreen);

export default HomeContainer;
