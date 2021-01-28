import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { DistanceUnit } from "../../Constants/Settings";
import { getMenuItems } from "../../Shared/JsxHelper";
import { ValidationRule, Validator } from "../../Shared/Validator";

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class UnitsSettingsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.rules = {
      distance: {
        label: "Distance",
        rules: [ValidationRule.REQUIRED],
      },
    };

    this.validator = new Validator(this.rules);

    this.state = {
      distance: "",
      errors: this.validator.getDefaultErrorState(),
    };
  }

  handleChange = stateKey => {
    return event => {
      this.setState({ [stateKey]: event.target.value });
    };
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.isDirty()) {
      return;
    }

    const dirtyProperties = {};
    if (this.state.distance !== this.props.settings.distance) {
      dirtyProperties.distance = this.state.distance;
    }

    const validationState = this.validator.validate(this.state);
    this.setState({ errors: validationState.errors });

    if (validationState.isValid && this.props.saveAccountData) {
      this.props.saveAccountData(dirtyProperties);
    }
  };

  isDirty = () => {
    return (
      !this.props.settings ||
      this.state.distance !== this.props.settings.distance
    );
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (this.props.settings !== prevProps.settings) {
      this.setState({
        distance: this.props.settings.distance,
      });
    }
  };

  render = () => {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography variant="h4">Units of Measure</Typography>
        <form
          className={this.props.classes.form}
          onSubmit={this.handleSubmit}
          noValidate
        >
          <FormControl
            className={this.props.classes.formControl}
            error={this.state.errors.distance.isInvalid}
          >
            <InputLabel shrink id="unit-settings-panel-distance-label">
              {this.rules.distance.label}
            </InputLabel>
            <Select
              labelId="unit-settings-panel-distance-label"
              id="unit-settings-panel-distance"
              value={this.state.distance}
              onChange={this.handleChange("distance")}
              className={this.props.classes.selectEmpty}
            >
              {getMenuItems(DistanceUnit)}
            </Select>
            <FormHelperText>
              {this.state.errors.distance.message}
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!this.isDirty()}
            className={this.props.classes.submit}
          >
            Save
          </Button>
        </form>
      </Paper>
    );
  };
}

export default withStyles(styles)(UnitsSettingsPanel);
