import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import GoogleMaps from '../Shared/GoogleMaps';
import { ValidationRule, Validator } from "../Shared/Validator";

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 350
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  map: {
    flexGrow: 1,
    margin: theme.spacing(1, 0, 0, 0),
  },
  submitContainer: {
    display: "flex",
    flexDirection: 'column',
    alignItems: "center"
  }
});

class LocationSearchPanel extends React.Component {
  constructor(props) {
    super(props)

    this.rules = {
      mapLocation: { 
        label: "Location", 
        rules: [ValidationRule.REQUIRED]
      },
    };

    this.validator = new Validator(this.rules);

    this.state = {
      mapLocation: "",
      isMapLoaded: false,
      errors: this.validator.getDefaultErrorState()
    };
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }

  handleAutocompleteChange = (inputId, autocomplete) => {
    return () => {
      this.setState({ [inputId]: autocomplete.getPlace() });
    }
  } 

  handleSubmit = (event) => {
    event.preventDefault();

    const validationState = this.validator.validate(this.state);
    this.setState({ errors: validationState.errors });

    if (validationState.isValid && this.props.onSubmit) {
      this.props.onSubmit(this.state.mapLocation);
    }
  }

  componentDidMount = () => {
    if (!this.map) {
      this.map = new GoogleMaps(this.props.mapsApiKey)
      const initMap = () => {
        this.setState({ isMapLoaded: true })
        this.map.initMap("mapSurface")
        //this.map.initAutocomplete("mapLocation", this.handleAutocompleteChange)
      };

      const loadPromise = this.map.loadApiScript({ libraries: "places" });
      if (loadPromise) {
        loadPromise.then(initMap);
      } else {
        initMap();
      }
    }
  }

  render = () => {
    return (
      <Paper className={this.props.classes.paper}>
        <form className={this.props.classes.form} onSubmit={this.handleSubmit} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <TextField
                required
                fullWidth
                id="mapLocation"
                label={this.rules.mapLocation.label}
                name="mapLocation"
                type="text"
                onChange={this.handleChange}
                value={this.state.mapLocation}
                error={this.state.errors.mapLocation.isInvalid}
                helperText={this.state.errors.mapLocation.message}
                autoFocus />
            </Grid>
            <Grid item xs={3} className={this.props.classes.submitContainer}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <div className={this.props.classes.map} id="mapSurface"></div>
      </Paper>
    );
  }
}

export default withStyles(styles)(LocationSearchPanel);
