import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import React from "react";

const styles = theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  menuIcon: {
    minWidth: 20 + theme.spacing(2),
  },
});

class HeaderPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuAnchor: null,
    };
  }

  handleMenuClick = event => {
    this.setState({ menuAnchor: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ menuAnchor: null });
  };

  getLinkReference = path => {
    return React.forwardRef((props, ref) => (
      <RouterLink innerRef={ref} to={path} {...props} />
    ));
  };

  renderAccount = () => {
    if (this.props.isLoggedIn) {
      return (
        <IconButton
          aria-label="account"
          aria-controls="account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={this.handleMenuClick}
        >
          <AccountCircleIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          aria-label="account"
          aria-controls="account-menu"
          aria-haspopup="true"
          color="inherit"
          component={this.getLinkReference("/login")}
        >
          <AccountCircleIcon />
        </IconButton>
      );
    }
  };

  renderMenu = () => {
    if (this.props.isLoggedIn) {
      return (
        <Menu
          id="account-menu"
          keepMounted
          anchorEl={this.state.menuAnchor}
          open={Boolean(this.state.menuAnchor)}
          onClose={this.handleMenuClose}
        >
          <MenuItem component={this.getLinkReference("/account")}>
            <ListItemIcon className={this.props.classes.menuIcon}>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Settings</Typography>
          </MenuItem>
          <MenuItem component={this.getLinkReference("/logout")}>
            <ListItemIcon className={this.props.classes.menuIcon}>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Logout</Typography>
          </MenuItem>
        </Menu>
      );
    }
  };

  render = () => (
    <AppBar
      position="absolute"
      className={clsx(
        this.props.classes.appBar,
        this.props.isOpen && this.props.classes.appBarShift
      )}
    >
      <Toolbar className={this.props.classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={this.props.onMenuOpen}
          className={clsx(
            this.props.classes.menuButton,
            this.props.isOpen && this.props.classes.menuButtonHidden
          )}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          color="inherit"
          className={this.props.classes.title}
        >
          Necro Automobilia
        </Typography>
        {this.renderAccount()}
        {this.renderMenu()}
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(HeaderPanel);
