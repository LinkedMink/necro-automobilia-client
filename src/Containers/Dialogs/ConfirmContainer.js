import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import ConfirmDialog from "../../Components/Dialogs/ConfirmDialog";
import { confirmSetValue } from "../../Actions/ConfirmAction";

const mapStateToProps = (state) => {
  return {
    show: state.confirm.active ? true : false,
    text: state.confirm.active ? state.confirm.active.message : undefined,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    confirmYes: () => dispatch(confirmSetValue(true)),
    confirmNo: () => dispatch(confirmSetValue(false))
  };
}

const ConfirmContainer = connect(mapStateToProps, mapDispatchToProps)(ConfirmDialog);

export default withRouter(ConfirmContainer);
