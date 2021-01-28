import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import RouteSearchPanel from "./RouteSearchPanel";
import MortRankPanel from "./MortRankPanel";
import RouteStatsPanel from "./RouteStatsPanel";
import RouteAnimationPanel from "./RouteAnimationPanel";

const styles = theme => ({});

class HomeScreen extends React.Component {
  handleMortPanelShare = () => {
    if (this.props.openDialog) {
      this.props.openDialog("Share");
    }
  };

  handleSearchSubmit = (source, destination, route) => {
    if (this.props.query) {
      this.props.query(source, destination, route);
    }
  };

  render = () => {
    return (
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <RouteSearchPanel
              onSubmit={this.handleSearchSubmit}
              mapsApiKey={this.props.mapsApiKey}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MortRankPanel
              onShare={this.handleMortPanelShare}
              result={this.props.searchResult}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <RouteStatsPanel result={this.props.searchResult} />
          </Grid>
          <Grid item xs={12} md={8}>
            <RouteAnimationPanel result={this.props.searchResult} />
          </Grid>
        </Grid>
      </Container>
    );
  };
}

export default withStyles(styles)(HomeScreen);
