import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import AlertDialog from "../../Components/Dialogs/AlertDialog";
import { alertClear } from "../../Actions/AlertAction";

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(alertClear())
  };
}

const mapStateToProps = (state) => {
  return {
    show: state.alert.severity ? true : false,
    title: state.alert.severity,
    text: state.alert.message,
    redirect: state.alert.redirect,
  };
}

const AlertContainer = connect(mapStateToProps, mapDispatchToProps)(AlertDialog);

export default withRouter(AlertContainer);
