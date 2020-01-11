import clsx from 'clsx';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';

import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import FlightIcon from '@material-ui/icons/Flight';
import TrainIcon from '@material-ui/icons/Train';
//import FlightLandIcon from '@material-ui/icons/FlightLand';
//import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '100%',
    minHeight: 500
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
  //{ label: "Jet (Terrorism)", mmPerMile: 1 / 12000, icon: FlightLandIcon },
]

class MortRankPanel extends React.Component {
  handleShare = () => {
    if (this.props.onShare) {
      this.props.onShare();
    }
  }

  renderTravelRank = () => {
    let ranks;
    if (this.props.result) {
      const resultMMPerMile = this.props.result.averageMicromorts;

      for (let i = mortalityRanks.length - 1; i >= 0; i--) {
        if (mortalityRanks[i].mmPerMile > resultMMPerMile) {
          ranks = mortalityRanks.slice(0, i + 1);
          ranks.push({ label: USER_TRIP_LABEL, mmPerMile: resultMMPerMile, icon: LocalCarWashIcon });
          ranks = ranks.concat(mortalityRanks.slice(i + 1));
          break;
        }
      }

      if (!ranks) {
        ranks = [{ label: USER_TRIP_LABEL, mmPerMile: resultMMPerMile, icon: LocalCarWashIcon }];
        ranks = ranks.concat(mortalityRanks.slice());
      }
    } else {
      ranks = mortalityRanks.slice();
    }

    const max = ranks[0].mmPerMile;
    const min = ranks[ranks.length - 1].mmPerMile;

    return ranks.map((rank, index) => {
      const isUserRank = rank.label === USER_TRIP_LABEL;
      const micromortsPer100 = (rank.mmPerMile * 100).toFixed(3);
      const proportion = (rank.mmPerMile - min) / max * 100;
      const proportionTooltip = `Micromorts per 100 Mile: ${micromortsPer100}`;

      return (
        <ListItem 
          key={index}
          className={clsx(isUserRank && this.props.classes.highlight)}>
          <ListItemAvatar>
            <Avatar>
              <rank.icon />
            </Avatar>
          </ListItemAvatar>
          <Tooltip title={proportionTooltip} placement="bottom">
            <ListItemText 
              primary={rank.label} 
              secondary={
                <LinearProgress variant="determinate" value={proportion} color="secondary" />
              } />
          </Tooltip>
        </ListItem>
      );
    });
  }

  render = () => {
    return (
      <Paper className={this.props.classes.paper}>
        <div className={this.props.classes.header}>
          <Typography variant="h4" className={this.props.classes.headerText}>
            Micromorts
          </Typography>
          {this.props.result &&
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
      </Paper>
    );
  }
}

export default withStyles(styles)(MortRankPanel);
