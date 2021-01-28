import React from "react";
import { Redirect, Route } from "react-router-dom";

class RouteAuth extends React.Component {
  constructor(props) {
    super(props);

    this.renderComponentRedirect = this.renderComponentRedirect.bind(this);
  }

  getNoComponentProps(props) {
    let { component: Component, ...rest } = props;
    return rest;
  }

  hasRequiredClaim() {
    let hasRequiredClaim = true;
    if (this.props.requiredClaim) {
      if (
        !this.props.claims ||
        this.props.claims.indexOf(this.props.requiredClaim) < 0
      ) {
        hasRequiredClaim = false;
      }
    }

    return hasRequiredClaim;
  }

  renderComponentRedirect(props) {
    if (!this.props.isLoggedIn) {
      return (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      );
    } else if (this.hasRequiredClaim()) {
      return <this.props.component {...props} />;
    } else {
      return (
        <Redirect
          to={{
            pathname: `/unauthorized/${this.props.requiredClaim}`,
            state: { from: props.location },
          }}
        />
      );
    }
  }

  render() {
    return (
      <Route
        {...this.getNoComponentProps(this.props)}
        render={this.renderComponentRedirect}
      />
    );
  }
}

export default RouteAuth;
