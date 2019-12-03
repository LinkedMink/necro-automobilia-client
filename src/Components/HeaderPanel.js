import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const styles = theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
});

class HeaderPanel extends React.Component {
  getLinkReference = (path) => {
    return React.forwardRef((props, ref) => (
      <RouterLink innerRef={ref} to={path} {...props} />
    ));
  }

  renderAccount = () => {
    if (this.props.isLoggedIn) {
      return (
        <IconButton 
          aria-label="account"
          color="inherit"
          component={this.getLinkReference("/account")} >
          <AccountCircleIcon />
        </IconButton>
      )
    }
  }

  render = () => (
    <AppBar 
      position="absolute" 
      className={clsx(
        this.props.classes.appBar, 
        this.props.isOpen && this.props.classes.appBarShift)}>
      <Toolbar className={this.props.classes.toolbar}>
        <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="menu" 
          onClick={this.props.onMenuOpen}
          className={clsx(
            this.props.classes.menuButton, 
            this.props.isOpen && this.props.classes.menuButtonHidden)}>
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" 
          className={this.props.classes.title}>
          Necro Automobilia
        </Typography>
        {this.renderAccount()}
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(HeaderPanel);
