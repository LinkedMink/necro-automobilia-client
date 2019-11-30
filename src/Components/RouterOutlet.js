import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Roles } from '../Constants/Account';
import RouteAuthContainer from '../Containers/RouteAuthContainer';
import HomeScreen from './Screens/HomeScreen';
import AboutScreen from './Screens/AboutScreen';
import LoginScreen from './Screens/LoginScreen';

class RouterOutlet extends React.Component {
  render = () => (
    <Switch>
      <Route exact path="/login" component={LoginScreen} />
      <Route exact path="/about" component={AboutScreen} />
      <RouteAuthContainer requiredRole={Roles.PUBLIC} exact path="/home" component={HomeScreen} />
      <Redirect from="/" to="/home" />
    </Switch>
  )
}

export default RouterOutlet;
