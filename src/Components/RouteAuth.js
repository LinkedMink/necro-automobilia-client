import React from 'react'
import { Redirect, Route } from 'react-router-dom'

class RouteAuth extends React.Component {
  constructor(props) {
    super(props);

    this.renderComponentRedirect  = this.renderComponentRedirect.bind(this);
  }

  getNoComponentProps(props) {
    let { component: Component, ...rest } = props;
    return rest;
  }

  hasRequiredRole() {
    let hasRequiredRole = true;
    if (this.props.requiredRole) {
      if (!this.props.roles || 
          this.props.roles.indexOf(this.props.requiredRole) < 0) {
        hasRequiredRole = false;
      }
    }

    return hasRequiredRole;
  }

  renderComponentRedirect(props) {
    if (this.hasRequiredRole()) {
      return (<this.props.component {...props} />);
    } else {
      return (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />);
    }
  }

  render() {
    return (
      <Route
        {...this.getNoComponentProps(this.props)}
        render={this.renderComponentRedirect} />
    );
  }
}

export default RouteAuth;