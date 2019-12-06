import { connect } from "react-redux";

import RouteAuth from "../Components/RouteAuth";

function mapStateToProps (state) {
  return {
    isLoggedIn: state.account.token ? true : false,
    claims: state.account.decodedToken && state.account.decodedToken.claims 
      ? state.account.decodedToken.claims : []
  };
}

const RouteAuthContainer = connect(mapStateToProps)(RouteAuth);

export default RouteAuthContainer;
