import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

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
          <Typography variant="h3">
            About
          </Typography>
          <Typography variant="body1">
            TODO. This is a work in progress.
          </Typography>
          <br/>
          <Typography variant="h4">
            Related Projects
          </Typography>
          <List>
            <ListItem>
              <Link href="https://github.com/LinkedMink/necro-automobilia">Necro Automobilia UI</Link>
            </ListItem>
            <ListItem>
              <Link href="https://github.com/LinkedMink/necro-automobilia-service">Necro Automobilia Service</Link>
            </ListItem>
            <ListItem>
              <Link href="https://github.com/LinkedMink/necro-automobilia-ml">Necro Automobilia Machine Learning</Link>
            </ListItem>
            <ListItem>
              <Link href="https://github.com/LinkedMink/node-user-service">User Service</Link>
            </ListItem>
            <ListItem>
              <Link href="https://github.com/LinkedMink/nhtsa-fatalities-data-loader">NHTSA Fatality Data Loader</Link>
            </ListItem>
          </List>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(AboutScreen);
