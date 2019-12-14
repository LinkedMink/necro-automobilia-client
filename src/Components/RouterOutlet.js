import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Claim } from '../Constants/Account';
import RouteAuthContainer from '../Containers/RouteAuthContainer';
import LoginContainer from '../Containers/Screens/LoginContainer';
import LogoutContainer from '../Containers/LogoutContainer';
import PasswordResetContainer from '../Containers/Screens/PasswordResetContainer';
import SetPasswordContainer from '../Containers/Screens/SetPasswordContainer';
import RegisterContainer from '../Containers/Screens/RegisterContainer';
import HomeContainer from '../Containers/Screens/HomeContainer';
import LocationQueryContainer from '../Containers/Screens/LocationQueryContainer';
import FeedScreen from './Screens/FeedScreen';
import SavedScreen from './Screens/SavedScreen';
import QueryContainer from '../Containers/Screens/QueryContainer';
import AccountContainer from '../Containers/Screens/AccountContainer';
import AboutScreen from './Screens/AboutScreen';
import UnauthorizedScreen from './Screens/UnauthorizedScreen';

class RouterOutlet extends React.Component {
  getDefaultRedirect = () => {
    return this.props.defaultRedirect ? this.props.defaultRedirect : '/login'
  }

  render = () => (
    <Switch>
      <Route exact path="/login" component={LoginContainer} />
      <Route exact path="/logout" component={LogoutContainer} />
      <Route exact path="/register" component={RegisterContainer} />
      <Route exact path="/password-reset" component={PasswordResetContainer} />
      <Route exact path="/set-password/:email/:token" component={SetPasswordContainer} />
      <Route exact path="/about" component={AboutScreen} />
      <Route exact path="/unauthorized/:claims" component={UnauthorizedScreen} />
      <RouteAuthContainer 
        requiredClaim={Claim.NECRO_AUTOMOBILIA_USER} 
        exact path="/home" component={HomeContainer} />
      <RouteAuthContainer 
        requiredClaim={Claim.NECRO_AUTOMOBILIA_USER} 
        exact path="/location" component={LocationQueryContainer} />
      <RouteAuthContainer 
        requiredClaim={Claim.NECRO_AUTOMOBILIA_USER} 
        exact path="/feed" component={FeedScreen} />
      <RouteAuthContainer 
        requiredClaim={Claim.NECRO_AUTOMOBILIA_USER} 
        exact path="/routes" component={SavedScreen} />
      <RouteAuthContainer 
        requiredClaim={Claim.NECRO_AUTOMOBILIA_USER} 
        exact path="/query" component={QueryContainer} />
      <RouteAuthContainer 
        requiredClaim={Claim.NECRO_AUTOMOBILIA_USER} 
        exact path="/account" component={AccountContainer} />
      <Redirect from="/" to={this.getDefaultRedirect()} />
    </Switch>
  )
}

export default RouterOutlet;
