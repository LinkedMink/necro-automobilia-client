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

class MapSearchPanel extends React.Component {
  constructor(props) {
    super(props)

    this.rules = {
      source: { 
        label: "source", 
        rules: [ValidationRule.REQUIRED]
      },
      destination: { 
        label: "destination", 
        rules: [ValidationRule.REQUIRED]
      },
    };

    this.validator = new Validator(this.rules);

    this.state = {
      source: "",
      destination: "",
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

    if (validationState.isValid && this.props.submit) {
      this.props.submit(this.state.address);
    }
  }

  componentDidMount = () => {
    if (!this.map) {
      this.map = new GoogleMaps(this.props.apiKey)
      const initMap = () => {
        this.setState({ isMapLoaded: true })
        this.map.initMap("mapSurface")
        this.map.initAutocomplete("source", this.handleAutocompleteChange)
        this.map.initAutocomplete("destination", this.handleAutocompleteChange)
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
            <Grid item xs={12} sm={5}>
              <TextField
                required
                fullWidth
                id="source"
                label={this.rules.source.label}
                name="source"
                autoComplete="source"
                type="text"
                onChange={this.handleChange}
                value={this.state.source}
                error={this.state.errors.source.isInvalid}
                helperText={this.state.errors.source.message}
                autoFocus />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                required
                fullWidth
                id="destination"
                label={this.rules.destination.label}
                name="destination"
                autoComplete="destination"
                type="text"
                onChange={this.handleChange}
                value={this.state.destination}
                error={this.state.errors.destination.isInvalid}
                helperText={this.state.errors.destination.message}
                autoFocus />
            </Grid>
            <Grid item xs={6} sm={2} className={this.props.classes.submitContainer}>
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

export default withStyles(styles)(MapSearchPanel);
