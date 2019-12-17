import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { getDateTimeString } from '../Shared/DateHelper';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '100%',
  },
});

class RouteStatsPanel extends React.Component {
  render = () => {
    let calculateDate, distance, micromorts;
    if (this.props.result) {
      const result = this.props.result;
      distance = `Distance: ${result.distance.toFixed(3)} km`;
      const date = getDateTimeString(result.modelCalculatedOn);
      calculateDate = `Calculated On: ${date}`;
      micromorts = `Micromorts: ${result.totalMicromorts}`;
    }

    return (
      <Paper className={this.props.classes.paper}>
        <Typography variant="h4">
          Stats
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary={distance} />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={micromorts} />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={calculateDate} />
          </ListItem>
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(RouteStatsPanel);
