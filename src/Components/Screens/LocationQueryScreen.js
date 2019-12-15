import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import LocationSearchPanel from "../LocationSearchPanel";
import LocationResultPanel from "../LocationResultPanel";

const styles = theme => ({
  fill: {
    height: "100%"
  }
});

class LocationQueryScreen extends React.Component {
  handleSearchSubmit = (location) => {
    if (this.props.query) {
      this.props.query(location);
    }
  }

  render() {
    return (
      <Container maxWidth="xl" className={this.props.classes.fill}>
        <Grid container spacing={3} className={this.props.classes.fill}>
          <Grid item xs={12} md={8} className={this.props.classes.fill}>
            <LocationSearchPanel 
              onSubmit={this.handleSearchSubmit}
              results={this.props.searchResult}
              mapsApiKey={this.props.mapsApiKey} />
          </Grid>
          <Grid item xs={12} md={4} className={this.props.classes.fill}>
            <LocationResultPanel
              results={this.props.searchResult} />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(LocationQueryScreen);
