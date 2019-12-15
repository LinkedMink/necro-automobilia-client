import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import RouteSearchPanel from "../RouteSearchPanel";
import MortRankPanel from '../MortRankPanel';
import StatsPanel from '../StatsPanel';
import AnimationPanel from '../AnimationPanel';

const MOCK_MM_RANKING = 1 / 37; // TODO

const styles = theme => ({

});

class HomeScreen extends React.Component {
  handleMortPanelShare = () => {
    if (this.props.openDialog) {
      this.props.openDialog("Share");
    }
  }

  handleSearchSubmit = (source, destination) => {
    if (this.props.query) {
      this.props.query(source, destination);
    }
  }

  render = () => {
    return (
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <RouteSearchPanel 
              onSubmit={this.handleSearchSubmit}
              mapsApiKey={this.props.mapsApiKey} />
          </Grid>
          <Grid item xs={12} md={4}>
            <MortRankPanel
              onShare={this.handleMortPanelShare}
              userMMPerMile={MOCK_MM_RANKING} /> 
          </Grid>
          <Grid item xs={12} md={4}>
            <StatsPanel />
          </Grid>
          <Grid item xs={12} md={8}>
            <AnimationPanel />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(HomeScreen);
