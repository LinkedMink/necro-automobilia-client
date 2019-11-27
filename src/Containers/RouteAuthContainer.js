import { connect } from "react-redux";

import RouteAuth from "../Components/RouteAuth";

function mapStateToProps (state) {
  return {
    roles: state.account.roles ? state.account.roles : []
  };
}

const RouteAuthContainer = connect(mapStateToProps)(RouteAuth);

export default RouteAuthContainer;