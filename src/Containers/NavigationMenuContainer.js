import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import StorageIcon from '@material-ui/icons/Storage';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';

import NavigationMenu from "../Components/NavigationMenu";

function getGuestLinks() {
  return [
    { path: "/login", name: "Login", icon: LockOpenIcon, active: false },
    { path: "/register", name: "Register", icon: PersonAddOutlinedIcon, active: false },
    { path: null, name: null, icon: null, active: null },
    { path: "/about", name: "About", icon: InfoOutlinedIcon, active: false },
  ];
}

function getAuthenticatedLinks() {
  return [
    { path: "/home", name: "Home", icon: HomeOutlinedIcon, active: false },
    { path: "/location", name: "Find Accidents", icon: SearchIcon, active: false },
    { path: "/feed", name: "Feed", icon: ForumOutlinedIcon, active: false },
    { path: "/routes", name: "Saved Routes", icon: StorageIcon, active: false },
    { path: "/query", name: "Test Query", icon: QueryBuilderIcon, active: false },
    { path: null, name: null, icon: null, active: null },
    { path: "/about", name: "About", icon: InfoOutlinedIcon, active: false },
  ];
}

function mapStateToProps (state, ownProps) {
  let links;
  if (state.account.token) {
    links = getAuthenticatedLinks();
  } else {
    links = getGuestLinks();
  }

  const location = ownProps.location;
  if (location) {
    links.forEach((link) => {
      if (location.pathname.startsWith(link.path)) {
        link.active = true;
      } else {
        link.active = false;
      }
    });
  }

  return {
    links: links
  };
}

const container = connect(mapStateToProps, null, null, { pure: false })(NavigationMenu);
const NavigationMenuContainer = withRouter(container);

export default NavigationMenuContainer