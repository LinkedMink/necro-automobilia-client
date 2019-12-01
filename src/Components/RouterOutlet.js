import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Claim } from '../Constants/Account';
import RouteAuthContainer from '../Containers/RouteAuthContainer';
import HomeScreen from './Screens/HomeScreen';
import AboutScreen from './Screens/AboutScreen';
import LoginScreen from './Screens/LoginScreen';
import PasswordResetScreen from './Screens/PasswordResetScreen';
import SetPasswordScreen from './Screens/SetPasswordScreen';
import RegisterScreen from './Screens/RegisterScreen';

class RouterOutlet extends React.Component {
  getDefaultRedirect = () => {
    return this.props.isLoggedIn ? '/home' : '/login'
  }

  render = () => (
    <Switch>
      <Route exact path="/login" component={LoginScreen} />
      <Route exact path="/register" component={RegisterScreen} />
      <Route exact path="/password-reset" component={PasswordResetScreen} />
      <Route exact path="/set-password/:email/:token" component={SetPasswordScreen} />
      <Route exact path="/about" component={AboutScreen} />
      <RouteAuthContainer 
        requiredRole={Claim.NECRO_AUTOMOBILIA_USER} 
        exact path="/home" component={HomeScreen} />
      <Redirect from="/" to={this.getDefaultRedirect()} />
    </Switch>
  )
}

export default RouterOutlet;
