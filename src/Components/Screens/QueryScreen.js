import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
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
      <Container maxWidth="lg">
        <Paper className={this.props.classes.paper}>
          <Typography variant="h5" component="h1">
            Fatality Query
          </Typography>
          <Typography variant="body1">
            TODO. This will eventually display the data in a more user friendly format. For now,
            I've created this tool for colloborators to get a sense of the available data.
          </Typography>

        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(AboutScreen);
