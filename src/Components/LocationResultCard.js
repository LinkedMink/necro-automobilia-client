import clsx from 'clsx';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
//import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { stateMap } from '../Constants/States';
import { getLongDateString } from '../Shared/DateHelper';

const styles = theme => ({
  card: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  attributeList: {
    "& li": {
      padding: '0'
    },
    "& div": {
      margin: '0'
    },
  }
});

class LocationResultCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    };
  }

  handleExpandClick = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  render = () => {
    const result = this.props.result;
    const stateCode = stateMap.get(result.stateName);
    const title = `${result.firstHarmfulEventName}: ${result.numberOfFatalities} Dead`
    const date = getLongDateString(result.timestampOfCrash);
    const primaryVehicle = result.vehicleDetails[0];
    const primaryVehicleText = `${primaryVehicle.makeName} ${primaryVehicle.modelCode}`;

    return (
      <Card className={this.props.classes.card}>
        <CardHeader
          title={title}
          subheader={date}
          avatar={
            <Avatar aria-label="recipe" className={this.props.classes.avatar}>
              {stateCode}
            </Avatar>}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>} />
        <CardContent>
          <List dense={true} disablePadding={true} className={this.props.classes.attributeList}>
            <ListItem disableGutters={true}>
              <ListItemText 
                secondary={`Road: ${result.trafficwayIdentifier}`} />
            </ListItem>
            <ListItem disableGutters={true}>
              <ListItemText 
                secondary={`Vehicle: ${primaryVehicleText}`} />
            </ListItem>
          </List>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(this.props.classes.expand, {
              [this.props.classes.expandOpen]: this.state.isExpanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.isExpanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.isExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>TODO</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(LocationResultCard);
