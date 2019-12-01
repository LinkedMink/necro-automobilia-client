import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux";

import { destroySession } from "../Actions/Account";

function mapStateToProps (state) {
  return {
    isLoggedIn: state.account.token ? true : false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => { dispatch(destroySession()) }
  };
}

class Logout extends React.Component {
  render() {
    if (this.props.isLoggedIn && this.props.logout) {
      this.props.logout() 
    }

    return (<Redirect to='/' />)
  }
}

const LogoutContainer = connect(mapStateToProps, mapDispatchToProps)(Logout);

export default LogoutContainer;