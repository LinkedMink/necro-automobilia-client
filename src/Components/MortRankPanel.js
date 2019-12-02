import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

//import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import FlightIcon from '@material-ui/icons/Flight';
import TrainIcon from '@material-ui/icons/Train';
import FlightLandIcon from '@material-ui/icons/FlightLand';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
});

//const micromortsPerDay = 22;
//const nonNaturalCauses = 1.6;
//const nonNaturalExcludeSuicide = 1.3;
//const homicide = 48 / 365;

const travelRanks = {
  "Motorbike": { mmPerMile: 1 / 6, icon: MotorcycleIcon },
  "Bicycle": { mmPerMile: 1 / 10, icon: DirectionsBikeIcon },
  "Walking": { mmPerMile: 1 / 17, icon: DirectionsWalkIcon },
  "Car": { mmPerMile: 1 / 230, icon: DirectionsCarIcon },
  "Jet": { mmPerMile: 1 / 1000, icon: FlightIcon },
  "Train": { mmPerMile: 1 / 6000, icon: TrainIcon },
  "Jet (Terrorism)": { mmPerMile: 1 / 12000, icon: FlightLandIcon },
}

class MortRankPanel extends React.Component {
  renderTravelRank = () => {
    return Object.entries(travelRanks).map(([method, descriptor], index) => {
      return (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar>
              <descriptor.icon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText 
            primary={method} 
            secondary={`Micromorts per Mile: ${descriptor.mmPerMile.toFixed(5)}`} />
        </ListItem>
      );
    });
  }

  renderDailyComparison = () => {

  }

  render = () => {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography variant="h5" component="h2">
          <Link href="https://en.wikipedia.org/wiki/Micromort">Micromorts</Link>
        </Typography>
        <List>
          {this.renderTravelRank()}
        </List>
        {this.renderDailyComparison()}
      </Paper>
    );
  }
}

export default withStyles(styles)(MortRankPanel);
