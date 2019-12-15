import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import LocationResultCard from './LocationResultCard';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    overflow: 'auto',
    height: '85vh',
  },
});

class LocationResultPanel extends React.Component {
  renderResults = () => {
    if (!this.props.results) {
      return (
        <Typography variant="body1">
          Input a address to find near by accidents.
        </Typography>
      );
    }

    return this.props.results.map((result, index) => {
      return (
        <LocationResultCard key={index} result={result} />
      );
    });
  }

  render = () => {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography variant="h4">
          Results
        </Typography>
        {this.renderResults()}
      </Paper>
    );
  }
}

export default withStyles(styles)(LocationResultPanel);
