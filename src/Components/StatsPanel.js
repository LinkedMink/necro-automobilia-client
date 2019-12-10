import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/List';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '100%',
  },
});

class StatsPanel extends React.Component {
  render = () => {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography variant="h5" component="h1">
          Stats
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(StatsPanel);
