import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfirmDialog extends React.Component {
  handleNo = () => {
    if (this.props.confirmNo) {
      this.props.confirmNo();
    }
  }

  handleYes = () => {
    if (this.props.confirmYes) {
      this.props.confirmYes();
    }
  }

  render = () => {
    return (
      <Dialog
        open={this.props.show}
        onClose={this.handleClose}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description">
        <DialogTitle id="confirm-dialog-title">
          Confirm
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            {this.props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleNo} color="secondary">
            No
          </Button>
          <Button onClick={this.handleYes} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmDialog;
