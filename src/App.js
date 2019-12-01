import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import LoadingOverlayContainer from './Containers/LoadingOverlayContainer';
import NavigationMenuContainer from './Containers/NavigationMenuContainer';
import HeaderPanel from './Components/HeaderPanel';
import RouterOutlet from './Components/RouterOutlet';
import FooterPanel from './Components/FooterPanel';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    flex: '1 1 auto',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: undefined,
    };

    if (!this.props.isConfigLoaded && this.props.getConfig) {
      this.props.getConfig();
    }

    if (this.props.getAccount) {
      this.props.getAccount();
    }
  }

  handleMenuOpen = () => {
    this.setState({ isMenuOpen: true });
  }

  handleMenuClose = () => {
    this.setState({ isMenuOpen: false });
  }

  render = () => (
    <BrowserRouter>
      <CssBaseline />
      <LoadingOverlayContainer />
      <div className={this.props.classes.root}>
        <HeaderPanel isOpen={this.state.isMenuOpen} onMenuOpen={this.handleMenuOpen} />
        <NavigationMenuContainer isOpen={this.state.isMenuOpen} onMenuClose={this.handleMenuClose} />
        <main className={this.props.classes.content}>
          <div className={this.props.classes.appBarSpacer} />
          <div className={this.props.classes.container}>
            <RouterOutlet defaultRedirect={this.props.isLoggedIn ? "/home" : "/login"} />
          </div>
          <FooterPanel />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default withStyles(styles)(App);
