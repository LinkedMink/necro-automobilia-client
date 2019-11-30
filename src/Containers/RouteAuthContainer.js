import { connect } from "react-redux";

import RouteAuth from "../Components/RouteAuth";

function mapStateToProps (state) {
  return {
    claims: state.account.claims ? state.account.claims : []
  };
}

const RouteAuthContainer = connect(mapStateToProps)(RouteAuth);

export default RouteAuthContainer;