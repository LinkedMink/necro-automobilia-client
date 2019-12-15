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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

//import { stateMap } from '../Constants/States';
import { getLongDateString } from '../Shared/DateHelper';
import { download } from '../Shared/FileOperations';

const styles = theme => ({
  card: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  highlighted: {
    backgroundColor: 'rgba(0, 0, 0, 0.14)'
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
    cursor: 'pointer',
    backgroundColor: red[500],
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: red[700],
    }
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
      isExpanded: false,
      isMenuOpen: false,
    };

    this.menuRef = React.createRef();
  }

  handleMenuClick = () => {
    this.setState({ isMenuOpen: true });
  };

  handleMenuClose = () => {
    this.setState({ isMenuOpen: false });
  };

  handleExpandClick = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  handleSelectClick = () => {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.index)
    }
  };

  handleFavoriteClick = () => {
    if (this.props.onFavorite) {
      this.props.onFavorite(this.props.index)
    }
  };
  
  handleShareClick = () => {
    if (this.props.onShare) {
      this.props.onShare(this.props.index)
    }
  };

  startDownload = () => {
    download('accident.json', JSON.stringify(this.props.result), 'application/json');
  }

  renderMenu = () => {
    return (
      <Menu
        aria-controls={`settings-menu-${this.props.result.consecutiveNumber}`}
        keepMounted
        anchorEl={this.menuRef.current}
        open={this.state.isMenuOpen}
        onClose={this.handleMenuClose}>
        <MenuItem onClick={this.startDownload}>
          <ListItemIcon>
            <CloudDownloadIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Download</Typography>
        </MenuItem>
      </Menu>
    )
  }

  render = () => {
    const result = this.props.result;
    //const stateCode = stateMap.get(result.stateName);
    const title = `${result.firstHarmfulEventName}: ${result.numberOfFatalities} Dead`
    const date = getLongDateString(result.timestampOfCrash);
    const primaryVehicle = result.vehicleDetails[0];
    const primaryVehicleText = `${primaryVehicle.makeName} ${primaryVehicle.modelCode}`;

    return (
      <Card 
        ref={this.props.containerRef}
        className={clsx(
          this.props.classes.card, 
          this.props.selected && this.props.classes.highlighted)}>
        <CardHeader
          title={title}
          subheader={date}
          avatar={
            <Avatar 
              aria-label="distance order"
              className={this.props.classes.avatar}
              onClick={this.handleSelectClick}>
              {this.props.avatar}
            </Avatar>}
          action={
            <IconButton
              aria-label={`settings-${result.consecutiveNumber}`}
              aria-controls={`settings-menu-${result.consecutiveNumber}`}
              aria-haspopup="true"
              ref={this.menuRef}
              onClick={this.handleMenuClick}>
              <MoreVertIcon />
            </IconButton>} />
        <CardContent>
          <List dense={true} disablePadding={true} 
            className={this.props.classes.attributeList}>
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
          <IconButton 
            onClick={this.handleFavoriteClick}
            aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton
            onClick={this.handleShareClick}
            aria-label="share">
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
        {this.renderMenu()}
      </Card>
    );
  }
}

export default withStyles(styles)(LocationResultCard);
