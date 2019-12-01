import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import DialogPanel from "../Components/AlertDialog";
import { alertClear } from "../Actions/Alert";

function mapDispatchToProps(dispatch) {
  return {
    close: () => { dispatch(alertClear()) }
  };
}

function mapStateToProps (state) {
  return {
    show: state.alert.severity ? true : false,
    title: state.alert.severity,
    text: state.alert.message,
    redirect: state.alert.redirect,
  };
}

const AlertDialogContainer = connect(mapStateToProps, mapDispatchToProps)(DialogPanel);

export default withRouter(AlertDialogContainer);
