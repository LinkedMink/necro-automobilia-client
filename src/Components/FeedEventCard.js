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
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

//import { stateMap } from '../Constants/States';
import { getLongDateString } from '../Shared/DateHelper';

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
});

class FeedEventCard extends React.Component {
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

  handleShareClick = () => {
    if (this.props.onShare) {
      this.props.onShare(this.props.index)
    }
  };

  renderMenu = () => {
    return (
      <Menu
        aria-controls={`feed-card-menu-${this.props.event.id}`}
        keepMounted
        anchorEl={this.menuRef.current}
        open={this.state.isMenuOpen}
        onClose={this.handleMenuClose}>
        <MenuItem>
          <ListItemIcon>
            <CloudDownloadIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">TODO</Typography>
        </MenuItem>
      </Menu>
    )
  }

  render = () => {
    const event = this.props.event;
    const date = getLongDateString(event.releaseDate);

    return (
      <Card 
        className={clsx(
          this.props.classes.card, 
          this.props.selected && this.props.classes.highlighted)}>
        <CardHeader
          title={event.title}
          subheader={date}
          avatar={
            <Avatar 
              aria-label="short title"
              className={this.props.classes.avatar}>
              {this.props.avatar}
            </Avatar>}
          action={
            <IconButton
              aria-label={`feed-card-${event.id}`}
              aria-controls={`feed-card-menu-${event.id}`}
              aria-haspopup="true"
              ref={this.menuRef}
              onClick={this.handleMenuClick}>
              <MoreVertIcon />
            </IconButton>} />
        <CardContent>
          <Typography variant="body1">TODO</Typography>
        </CardContent>
        <CardActions disableSpacing>
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

export default withStyles(styles)(FeedEventCard);
