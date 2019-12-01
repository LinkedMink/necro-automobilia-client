import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Claim } from '../Constants/Account';
import RouteAuthContainer from '../Containers/RouteAuthContainer';
import LoginContainer from '../Containers/Screens/LoginContainer';
import LogoutContainer from '../Containers/LogoutContainer';
import PasswordResetContainer from '../Containers/Screens/PasswordResetContainer';
import SetPasswordContainer from '../Containers/Screens/SetPasswordContainer';
import RegisterSContainer from '../Containers/Screens/RegisterContainer';
import HomeScreen from './Screens/HomeScreen';
import AboutScreen from './Screens/AboutScreen';

class RouterOutlet extends React.Component {
  getDefaultRedirect = () => {
    return this.props.isLoggedIn ? '/home' : '/login'
  }
LoginContainer
  render = () => (
    <Switch>
      <Route exact path="/login" component={LoginContainer} />
      <Route exact path="/logout" component={LogoutContainer} />
      <Route exact path="/register" component={RegisterSContainer} />
      <Route exact path="/password-reset" component={PasswordResetContainer} />
      <Route exact path="/set-password/:email/:token" component={SetPasswordContainer} />
      <Route exact path="/about" component={AboutScreen} />
      <RouteAuthContainer 
        requiredRole={Claim.NECRO_AUTOMOBILIA_USER} 
        exact path="/home" component={HomeScreen} />
      <Redirect from="/" to={this.getDefaultRedirect()} />
    </Switch>
  )
}

export default RouterOutlet;
