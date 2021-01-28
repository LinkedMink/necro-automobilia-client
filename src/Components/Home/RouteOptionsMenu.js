import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { withStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";

import { ValidationRule, Validator } from "../../Shared/Validator";

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    minWidth: 300,
  },
});

class RouteOptionsMenu extends React.Component {
  constructor(props) {
    super(props);

    this.rules = {
      departDate: {
        label: "Depart At",
        rules: [[ValidationRule.RANGE, this.minDate, this.maxDate]],
      },
    };

    this.validator = new Validator(this.rules);

    this.state = {
      isOpen: false,
      departDate: undefined,
      errors: this.validator.getDefaultErrorState(),
    };
  }

  handleChange = (event, value) => {
    if (value) {
      this.setState({ [event.target.id]: value });
    } else {
      this.setState({ [event.target.id]: event.target.value });
    }
  };

  handleDateChange = fieldName => {
    return date => {
      this.setState({ [fieldName]: date });
    };
  };

  handleClose = () => {
    const validationState = this.validator.validate(this.state);
    this.setState({ errors: validationState.errors });
    if (!validationState.isValid) {
      return;
    }

    this.setState({ isOpen: false });
    if (this.props.onClose) {
      this.props.onClose({
        departDate: this.departDate,
      });
    }
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (this.state.isOpen !== this.props.isOpen) {
      this.setState({ isOpen: this.props.isOpen });
    }
  };

  renderControls = () => {
    return (
      <Paper className={this.props.classes.paper}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            clearable={true}
            disablePast
            showTodayButton
            format="MM/dd/yyyy hh:mm a"
            margin="normal"
            id="startDate"
            label={this.rules.departDate.label}
            value={this.departDate}
            onChange={this.handleDateChange("departDate")}
            KeyboardButtonProps={{
              "aria-label": "change departure datetime",
            }}
          />
        </MuiPickersUtilsProvider>
      </Paper>
    );
  };

  render() {
    return (
      <Popper
        open={this.state.isOpen}
        anchorEl={this.props.anchorRef.current}
        role={undefined}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              {this.renderControls()}
            </ClickAwayListener>
          </Grow>
        )}
      </Popper>
    );
  }
}

export default withStyles(styles)(RouteOptionsMenu);
