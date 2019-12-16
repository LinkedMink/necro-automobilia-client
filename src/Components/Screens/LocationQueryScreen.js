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
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
    };
  }

  handleSearchSubmit = (location, options) => {
    if (this.props.query) {
      this.props.query(location, options);
    }
  }

  handleResultSelect = (index) => {
    this.setState({ selected: index });
  }

  handleResultFavorite = (index) => {
    if (this.props.openDialog) {
      this.props.openDialog("Share");
    }
  }

  handleResultShare = (index) => {
    if (this.props.openDialog) {
      this.props.openDialog("Share");
    }
  }

  render() {
    return (
      <Container maxWidth="xl" className={this.props.classes.fill}>
        <Grid container spacing={3} className={this.props.classes.fill}>
          <Grid item xs={12} md={8} className={this.props.classes.fill}>
            <LocationSearchPanel 
              onSubmit={this.handleSearchSubmit}
              onSelect={this.handleResultSelect}
              results={this.props.searchResult}
              selected={this.state.selected}
              mapsApiKey={this.props.mapsApiKey} />
          </Grid>
          <Grid item xs={12} md={4} className={this.props.classes.fill}>
            <LocationResultPanel
              results={this.props.searchResult}
              selected={this.state.selected} 
              onSelect={this.handleResultSelect} 
              onFavorite={this.handleResultFavorite} 
              onShare={this.handleResultShare} />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(LocationQueryScreen);
