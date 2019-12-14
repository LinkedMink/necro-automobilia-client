import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
});

class FeedScreen extends React.Component {
  render() {
    return (
      <Container maxWidth="lg">
        <Paper className={this.props.classes.paper}>
          <Typography variant="h3">
            Feed
          </Typography>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(FeedScreen);
