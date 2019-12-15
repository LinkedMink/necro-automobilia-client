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

class RouteSearchPanel extends React.Component {
  constructor(props) {
    super(props)

    this.rules = {
      mapSource: { 
        label: "Source", 
        rules: [ValidationRule.REQUIRED]
      },
      mapDestination: { 
        label: "Destination", 
        rules: [ValidationRule.REQUIRED]
      },
    };

    this.validator = new Validator(this.rules);

    this.state = {
      mapSource: "",
      mapDestination: "",
      source: null,
      destination: null,
      isMapLoaded: false,
      errors: this.validator.getDefaultErrorState()
    };

    this.sourceRef = React.createRef();
    this.destinationRef = React.createRef();
    this.mapRef = React.createRef();
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const validationState = this.validator.validate(this.state);
    this.setState({ errors: validationState.errors });

    if (validationState.isValid && this.props.onSubmit) {
      this.props.onSubmit(this.state.source, this.state.destination);
    }
  }

  getAutocompleteHandler = (descriptionField, locationField) => {
    return (autocomplete) => {
      return () => {
        const place = autocomplete.getPlace();
        const locationState = {};
        locationState[descriptionField] = place.formatted_address;
        locationState[locationField] = [
          place.geometry.location.lng(),
          place.geometry.location.lat()
        ];

        this.setState(locationState);
      }
    }
  }

  componentDidMount = () => {
    if (!this.map) {
      this.map = new GoogleMaps(this.props.mapsApiKey)

      const initMap = () => {
        this.setState({ isMapLoaded: true });
        this.map.initMap(this.mapRef.current);

        setTimeout(() => {
          this.map.initAutocomplete(
            this.sourceRef.current,
            this.getAutocompleteHandler('mapSource', 'source'));

          this.map.initAutocomplete(
            this.destinationRef.current,
            this.getAutocompleteHandler('mapDestination', 'destination'));
        }, 100);
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
                id="mapSource"
                label={this.rules.mapSource.label}
                name="mapSource"
                type="text"
                onChange={this.handleChange}
                value={this.state.mapSource}
                error={this.state.errors.mapSource.isInvalid}
                helperText={this.state.errors.mapSource.message}
                inputRef={this.sourceRef}
                autoFocus />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                required
                fullWidth
                id="mapDestination"
                label={this.rules.mapDestination.label}
                name="mapDestination"
                type="text"
                onChange={this.handleChange}
                value={this.state.mapDestination}
                error={this.state.errors.mapDestination.isInvalid}
                helperText={this.state.errors.mapDestination.message} 
                inputRef={this.destinationRef} />
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
        <div ref={this.mapRef} 
          className={this.props.classes.map} 
          id="mapSurface"></div>
      </Paper>
    );
  }
}

export default withStyles(styles)(RouteSearchPanel);
