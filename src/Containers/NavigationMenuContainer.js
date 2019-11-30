import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import NavigationMenu from "../Components/NavigationMenu";

function getGuestLinks() {
  return [
    { path: "/login", name: "Login", icon: LockOpenIcon, active: false },
    { path: "/about", name: "About", icon: InfoOutlinedIcon, active: false },
  ];
}

function mapStateToProps (state, ownProps) {
  let links = getGuestLinks();
  const location = ownProps.location;
  
  if (location && location.pathname.startsWith(links[1].path)) {
    links[1].active = true;
  } else {
    links[1].active = false;
  }

  return {
    links: links
  };
}

const container = connect(mapStateToProps, null, null, { pure: false })(NavigationMenu);
const NavigationMenuContainer = withRouter(container);

export default NavigationMenuContainer