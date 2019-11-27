import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Roles } from './Constants/Account';
import RouteAuthContainer from './Containers/RouteAuthContainer';
import HomeScreen from './Components/Screens/HomeScreen';
import AboutScreen from './Components/Screens/AboutScreen';
import AuthScreen from './Components/Screens/AuthScreen';

class RouterOutlet extends React.Component {
  render = () => (
    <Switch>
      <Route exact path="/home" component={HomeScreen} />
      <Route exact path="/about" component={AboutScreen} />
      <RouteAuthContainer requiredRole={Roles.PUBLIC} exact path="/auth" component={AuthScreen} />
      <Redirect from="/" to="/home" />
    </Switch>
  )
}

export default RouterOutlet;
