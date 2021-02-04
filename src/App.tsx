import { withStyles, StyleRulesCallback } from "@material-ui/core/styles";
import { CssBaseline, Theme } from "@material-ui/core";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import AlertContainer from "./Containers/Dialogs/AlertContainer";
import ConfirmContainer from "./Containers/Dialogs/ConfirmContainer";
import LoadingOverlayContainer from "./Containers/LoadingOverlayContainer";
import NavigationMenuContainer from "./Containers/NavigationMenuContainer";
import HeaderPanel from "./Components/HeaderPanel";
import LoadingOverlay from "./Components/LoadingOverlay";
import RouterOutlet from "./Components/RouterOutlet";
import FooterPanel from "./Components/FooterPanel";

import "./App.scss";

type StyleClass = "root" | "appBarSpacer" | "content" | "container";

export interface AppStateProps {
  isConfigLoaded?: boolean;
  isLoggedIn?: boolean;
}

export interface AppDispatchProps {
  getConfig?: () => void;
  getAccount?: () => void;
}

export type AppProps = AppStateProps & AppDispatchProps & { classes: Record<StyleClass, string> };

interface AppState {
  isMenuOpen?: boolean;
}

const styles: StyleRulesCallback<Theme, AppProps, StyleClass> = (
  theme: Theme
) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    flex: "1 1 auto",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
});

class App extends React.Component<AppProps, AppState> {
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
  };

  handleMenuClose = () => {
    this.setState({ isMenuOpen: false });
  };

  render = () => {
    if (!this.props.isConfigLoaded) {
      return <LoadingOverlay isLoading={true} />;
    }

    return (
      <BrowserRouter>
        <CssBaseline />
        <LoadingOverlayContainer />
        <AlertContainer />
        <ConfirmContainer />
        <div className={this.props.classes.root}>
          <HeaderPanel
            isLoggedIn={this.props.isLoggedIn}
            isOpen={this.state.isMenuOpen}
            onMenuOpen={this.handleMenuOpen}
          />
          <NavigationMenuContainer
            isOpen={this.state.isMenuOpen}
            onMenuClose={this.handleMenuClose}
          />
          <main className={this.props.classes.content}>
            <div className={this.props.classes.appBarSpacer} />
            <div className={this.props.classes.container}>
              <RouterOutlet
                defaultRedirect={this.props.isLoggedIn ? "/home" : "/login"}
              />
            </div>
            <FooterPanel />
          </main>
        </div>
      </BrowserRouter>
    );
  };
}

export default withStyles(styles)(App);
