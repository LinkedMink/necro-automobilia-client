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
          <Typography variant="body1">
            This application seeks to assign a mortality rating to any location in the United States while operating a 
            motor vehicle (see <Link href="https://en.wikipedia.org/wiki/Micromort">Micromorts</Link>). The app uses a 
            machine learning algorithm to produce a plane of predicted risk. This risk is then used to calculate the 
            risk of routes or locations. The app shows graphical comparisons to illustrate how risky a particular trip will be.
          </Typography>
          <br/>
          <Typography variant="h4">
            Data Sources
          </Typography>
          <Typography variant="body1">
            Currently, the application uses historical data from the NHTSA to calculate risk. There are plans to produce
            a model that evolves with conditions (weather, traffic, etc.) that will adjust at regular intervals, so people
            can compare there risk over time.
          </Typography>
          <br/>
          <Typography variant="h4">
            Related Projects
          </Typography>
          <List>
            <Link href="https://github.com/LinkedMink/necro-automobilia">
              <ListItem button>
                Necro Automobilia UI
              </ListItem>
            </Link>
            <Link href="https://github.com/LinkedMink/necro-automobilia-service">
              <ListItem button>
                Necro Automobilia Service
              </ListItem>
            </Link>
            <Link href="https://github.com/LinkedMink/necro-automobilia-ml">
              <ListItem button>
                Necro Automobilia Machine Learning
              </ListItem>
            </Link>
            <Link href="https://github.com/LinkedMink/node-user-service">
              <ListItem button>
                User Service
              </ListItem>
            </Link>
            <Link href="https://github.com/LinkedMink/nhtsa-fatalities-data-loader">
              <ListItem button>
                NHTSA Fatality Data Loader
              </ListItem>
            </Link>
          </List>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(AboutScreen);
