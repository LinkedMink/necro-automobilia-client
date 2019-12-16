import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { ValidationRule, Validator } from "../Shared/Validator";

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    minWidth: 300,
  },
});

class FilterMenu extends React.Component {
  constructor(props) {
    super(props);
    this.rules = {
      pageSize: {
        label: "Page Size",
        rules: [[ValidationRule.RANGE, 1, 40]]
      },
    };

    this.validator = new Validator(this.rules);

    this.state = {
      isOpen: false,
      pageSize: 5,
      errors: this.validator.getDefaultErrorState()
    };
  }

  handleChange = (event, value) => {
    if (value) {
      this.setState({[event.target.id]: value});
    } else {
      this.setState({[event.target.id]: event.target.value});
    }
  }

  handleClose = () => {
    this.setState({isOpen: false});
    if (this.props.onClose) {
      this.props.onClose(this.state);
    }
  }

  renderControls = () => {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography 
          id="filter-page-size"
          gutterBottom>
          {this.rules.pageSize.label}
        </Typography>
        <Slider
          id="pageSize"
          aria-labelledby="filter-page-size"
          step={1}
          marks
          min={1}
          max={10}
          valueLabelDisplay="auto" 
          value={this.state.pageSize} 
          error={this.state.errors.pageSize.isInvalid}
          helperText={this.state.errors.pageSize.message}
          onChange={this.handleChange} />
      </Paper>
    )
  }

  render() {
    if (this.state.isOpen !== this.props.isOpen) {
      this.setState({isOpen: this.props.isOpen});
    }

    return (
      <Popper open={this.state.isOpen} 
        anchorEl={this.props.anchorRef.current} 
        role={undefined} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}>
            <ClickAwayListener onClickAway={this.handleClose}>
              {this.renderControls()}
            </ClickAwayListener>
          </Grow>
        )}
      </Popper>
    );
  }
}

export default withStyles(styles)(FilterMenu);
