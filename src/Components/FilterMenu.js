import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

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
      searchDistance: {
        label: "Search Distance (km)",
        rules: [[ValidationRule.RANGE, 10, 50]]
      },
      startDate: {
        label: "Start Date",
        rules: [[ValidationRule.RANGE, new Date(), new Date()]]
      },
      endDate: {
        label: "End Date",
        rules: [[ValidationRule.RANGE, new Date(), new Date()]]
      },
    };

    this.validator = new Validator(this.rules);

    this.state = {
      isOpen: false,
      pageSize: 5,
      searchDistance: 25,
      startDate: new Date(),
      endDate: new Date(),
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

  handleDateChange = (fieldName) => {
    return (date) => {
      const dateState = {};
      dateState[fieldName] = date;
      this.setState(dateState);
    }
  }

  handleClose = () => {
    const validationState = this.validator.validate(this.state);
    this.setState({ errors: validationState.errors });
    if (!validationState.isValid) {
      return;
    }
    
    this.setState({isOpen: false});
    if (this.props.onClose) {
      this.props.onClose({
        pageSize: this.state.pageSize,
        searchDistance: this.state.searchDistance * 1000,
      });
    }
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (this.state.isOpen !== this.props.isOpen) {
      this.setState({isOpen: this.props.isOpen});
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
        <Typography 
          id="filter-search-distance"
          gutterBottom>
          {this.rules.searchDistance.label}
        </Typography>
        <Slider
          id="searchDistance"
          aria-labelledby="filter-search-distance"
          step={5}
          marks
          min={10}
          max={50}
          valueLabelDisplay="auto" 
          value={this.state.searchDistance} 
          error={this.state.errors.searchDistance.isInvalid}
          helperText={this.state.errors.searchDistance.message}
          onChange={this.handleChange} />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="startDate"
            label={this.rules.startDate.label}
            value={this.startDate}
            onChange={this.handleDateChange("startDate")}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }} />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="endDate"
            label={this.rules.endDate.label}
            value={this.endDate}
            onChange={this.handleDateChange("endDate")}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }} />
        </MuiPickersUtilsProvider>
      </Paper>
    )
  }

  render() {
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
