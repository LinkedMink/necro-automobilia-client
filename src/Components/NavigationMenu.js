import clsx from "clsx";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: 240,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
});

class NavigationMenu extends React.Component {
  getLinkReference = path => {
    return React.forwardRef((props, ref) => (
      <RouterLink innerRef={ref} to={path} {...props} />
    ));
  };

  getLinkItem = (link, index) => {
    if (!link.path) {
      return <Divider key={index} />;
    }

    const listItem = (
      <ListItem
        button
        key={index}
        component={this.getLinkReference(link.path)}
        selected={link.active}
      >
        <ListItemIcon>
          <link.icon />
        </ListItemIcon>
        <ListItemText primary={link.name} />
      </ListItem>
    );

    if (link.tooltip) {
      return (
        <Tooltip title={link.tooltip} placement="right">
          {listItem}
        </Tooltip>
      );
    } else {
      return listItem;
    }
  };

  render = () => {
    return (
      <Drawer
        variant="permanent"
        open={this.props.isOpen}
        classes={{
          paper: clsx(
            this.props.classes.drawerPaper,
            !this.props.isOpen && this.props.classes.drawerPaperClose
          ),
        }}
      >
        <div className={this.props.classes.toolbarIcon}>
          <IconButton onClick={this.props.onMenuClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{this.props.links.map(this.getLinkItem)}</List>
      </Drawer>
    );
  };
}

export default withStyles(styles)(NavigationMenu);
