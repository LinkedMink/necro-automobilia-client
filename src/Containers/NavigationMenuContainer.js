import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';

import NavigationMenu from "../Components/NavigationMenu";

function getGuestLinks() {
  return [
    { path: "/login", name: "Login", icon: LockOpenIcon, active: false },
    { path: "/register", name: "Register", icon: PersonAddOutlinedIcon, active: false },
    { path: "/about", name: "About", icon: InfoOutlinedIcon, active: false },
  ];
}

function mapStateToProps (state, ownProps) {
  let links = getGuestLinks();
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