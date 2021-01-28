import "date-fns";
import React from "react";
//import DateFnsUtils from '@date-io/date-fns';
import { withStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
//import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { ValidationRule, Validator } from "../../Shared/Validator";

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    minWidth: 300,
  },
});

class LocationFilterMenu extends React.Component {
  constructor(props) {
    super(props);
    this.minDate = new Date("2014-12-31");
    this.maxDate = new Date("2017-01-02");

    this.rules = {
      pageSize: {
        label: "Page Size",
        rules: [[ValidationRule.RANGE, 1, 40]],
      },
      searchDistance: {
        label: "Search Distance (km)",
        rules: [[ValidationRule.RANGE, 10, 50]],
      },
      startDate: {
        label: "Start Date",
        rules: [[ValidationRule.RANGE, this.minDate, this.maxDate]],
      },
      endDate: {
        label: "End Date",
        rules: [[ValidationRule.RANGE, this.minDate, this.maxDate]],
      },
    };

    this.validator = new Validator(this.rules);

    this.state = {
      isOpen: false,
      pageSize: 5,
      searchDistance: 30,
      startDate: undefined,
      endDate: undefined,
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
        pageSize: this.state.pageSize,
        searchDistance: this.state.searchDistance * 1000,
        startDate: this.startDate,
        endDate: this.endDate,
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
        <Typography id="filter-page-size" gutterBottom>
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
          onChange={this.handleChange}
        />
        <Typography id="filter-search-distance" gutterBottom>
          {this.rules.searchDistance.label}
        </Typography>
        <Slider
          id="searchDistance"
          aria-labelledby="filter-search-distance"
          step={10}
          marks
          min={10}
          max={100}
          valueLabelDisplay="auto"
          value={this.state.searchDistance}
          error={this.state.errors.searchDistance.isInvalid}
          helperText={this.state.errors.searchDistance.message}
          onChange={this.handleChange}
        />
        {/*
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            clearable={true}
            initialFocusedDate="2016-01-01"
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="startDate"
            label={this.rules.startDate.label}
            minDate={this.minDate}
            maxDate={this.maxDate}
            value={this.startDate}
            onChange={this.handleDateChange("startDate")}
            KeyboardButtonProps={{
              'aria-label': 'change start date',
            }} />
          <KeyboardDatePicker
            clearable={true}
            initialFocusedDate="2016-01-01"
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="endDate"
            label={this.rules.endDate.label}
            minDate={this.minDate}
            maxDate={this.maxDate}
            value={this.endDate}
            onChange={this.handleDateChange("endDate")}
            KeyboardButtonProps={{
              'aria-label': 'change end date',
            }} />
        </MuiPickersUtilsProvider>
          */}
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

export default withStyles(styles)(LocationFilterMenu);
