import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import FlightIcon from '@material-ui/icons/Flight';
import TrainIcon from '@material-ui/icons/Train';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  highlight: {
    backgroundColor: "rgba(0, 0, 0, 0.14)"
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerText: {
    flex: '1 1 auto'
  }
});

//const micromortsPerDay = 22;
//const nonNaturalCauses = 1.6;
//const nonNaturalExcludeSuicide = 1.3;
//const homicide = 48 / 365;

const USER_TRIP_LABEL = "Your Trip";

const mortalityRanks = [
  { label: "Motorbike", mmPerMile: 1 / 6, icon: MotorcycleIcon },
  { label: "Bicycle", mmPerMile: 1 / 10, icon: DirectionsBikeIcon },
  { label: "Walking", mmPerMile: 1 / 17, icon: DirectionsWalkIcon },
  { label: "Car", mmPerMile: 1 / 230, icon: DirectionsCarIcon },
  { label: "Jet", mmPerMile: 1 / 1000, icon: FlightIcon },
  { label: "Train", mmPerMile: 1 / 6000, icon: TrainIcon },
  { label: "Jet (Terrorism)", mmPerMile: 1 / 12000, icon: FlightLandIcon },
]

class MortRankPanel extends React.Component {
  handleShare = () => {
    if (this.props.onShare) {
      this.props.onShare();
    }
  }

  renderTravelRank = () => {
    let ranks;
    if (this.props.userMMPerMile) {
      for (let i = mortalityRanks.length - 1; i >= 0; i--) {
        if (mortalityRanks[i].mmPerMile > this.props.userMMPerMile) {
          ranks = mortalityRanks.slice(0, i + 1);
          ranks.push({ label: USER_TRIP_LABEL, mmPerMile: this.props.userMMPerMile, icon: LocalCarWashIcon });
          ranks = ranks.concat(mortalityRanks.slice(i + 1));
          break;
        }
      }

      if (!ranks) {
        ranks = [{ label: USER_TRIP_LABEL, mmPerMile: this.props.userMMPerMile, icon: LocalCarWashIcon }];
        ranks = ranks.concat(mortalityRanks.slice());
      }
    } else {
      ranks = mortalityRanks.slice();
    }

    return ranks.map((rank, index) => {
      const isUserRank = rank.label === USER_TRIP_LABEL;

      return (
        <ListItem 
          key={index}
          className={isUserRank && this.props.classes.highlight}>
          <ListItemAvatar>
            <Avatar>
              <rank.icon color={isUserRank ? "secondary" : ""} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText 
            primary={rank.label} 
            secondary={`Micromorts per Mile: ${rank.mmPerMile.toFixed(5)}`} />
          {isUserRank &&
            <ListItemIcon>
              <ChevronLeftOutlinedIcon color={isUserRank && "secondary"} />
            </ListItemIcon>
          }
        </ListItem>
      );
    });
  }

  renderDailyComparison = () => {

  }

  render = () => {
    return (
      <Paper className={this.props.classes.paper}>
        <div className={this.props.classes.header}>
          <Typography variant="h4" className={this.props.classes.headerText}>
            <Link href="https://en.wikipedia.org/wiki/Micromort">Micromorts</Link>
          </Typography>
          {this.props.userMMPerMile &&
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleShare}
              endIcon={<ShareOutlinedIcon />}>
              Share
            </Button>
          }
        </div>
        <List>
          {this.renderTravelRank()}
        </List>
        {this.renderDailyComparison()}
      </Paper>
    );
  }
}

export default withStyles(styles)(MortRankPanel);
