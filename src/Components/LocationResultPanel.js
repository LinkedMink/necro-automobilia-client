import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import LocationResultCard from './LocationResultCard';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    overflow: 'auto',
    maxHeight: '85vh',
  },
});

class LocationResultPanel extends React.Component {
  renderResults = () => {
    if (!this.props.results) {
      return (
        <Typography variant="body1">
          No results
        </Typography>
      );
    }

    return this.props.results.map((result, index) => {
      const selected = this.props.selected === index;

      return (
        <LocationResultCard 
          key={index} 
          avatar={index + 1} 
          result={result}
          selected={selected} />
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
