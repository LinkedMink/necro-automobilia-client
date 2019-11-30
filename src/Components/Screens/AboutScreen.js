import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/List';
import Typography from '@material-ui/core/List';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
});

class AboutScreen extends React.Component {
  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography variant="h5" component="h1">
          About
        </Typography>
        <List>
          <ListItem>
            <Link href="https://github.com/LinkedMink/necro-automobilia">Necro Automobilia UI</Link>
          </ListItem>
          <ListItem>
            <Link href="https://github.com/LinkedMink/node-user-service">User Service</Link>
          </ListItem>
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(AboutScreen);
