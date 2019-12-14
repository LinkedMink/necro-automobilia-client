import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import MapSearchContainer from "../../Containers/MapSearchContainer";
import MortRankPanel from '../MortRankPanel';
import StatsPanel from '../StatsPanel';
import AnimationPanel from '../AnimationPanel';

const MOCK_MM_RANKING = 1 / 37; // TODO

const styles = theme => ({

});

class HomeScreen extends React.Component {
  handleMortPanelShare = () => {
    console.log("Share"); // TODO
  }

  render = () => {
    return (
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <MapSearchContainer />
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
