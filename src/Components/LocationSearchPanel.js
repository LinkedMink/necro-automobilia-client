import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';

import GoogleMaps from '../Shared/GoogleMaps';
import { ValidationRule, Validator } from "../Shared/Validator";

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    height: '85vh'
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
    alignItems: "center",
    justifyContent: "center"
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
      location: null,
      isMapLoaded: false,
      markers: null,
      selected: null,
      errors: this.validator.getDefaultErrorState()
    };

    this.locationRef = React.createRef();
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
      this.props.onSubmit(this.state.location);
      this.map.clearMarkers();
      this.setState({ markers: null });
    }
  }

  getAutocompleteHandler = (autocomplete) => {
    return () => {
      const place = autocomplete.getPlace();
      this.setState({ 
        mapLocation: place.formatted_address,
        location: [
          place.geometry.location.lng(),
          place.geometry.location.lat()
        ]
      });
    }
  }

  getMarkerHandler = (marker) => {
    return () => {
      this.setState({ selected: marker.data.index });
      this.map.focus(marker.position);
      if (this.props.onSelect) {
        this.props.onSelect(marker.data.index);
      }
    }
  }

  createMarkers = () => {
    const markers = [];
    this.props.results.forEach((element, index) => {
      markers.push({
        data: {
          index,
        },
        label: `${index + 1}`,
        description: `${element.firstHarmfulEventName}: ${element.numberOfFatalities} Dead`,
        coordinates: element.location.coordinates,
      });
    })

    this.map.setMarkers(markers, this.getMarkerHandler);
    this.setState({ markers });
  }

  focusSelected = () => {
    const selectedResult = this.props.results[this.state.selected];
    this.map.focus(selectedResult.location.coordinates);
  }

  componentDidMount = () => {
    if (!this.map) {
      this.map = new GoogleMaps(this.props.mapsApiKey)

      const initMap = () => {
        this.setState({ isMapLoaded: true });
        this.map.initMap(this.mapRef.current);

        setTimeout(() => {
          this.map.initAutocomplete(
            this.locationRef.current,
            this.getAutocompleteHandler);

          if (this.props.results) {
            this.createMarkers();
          }
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
    if (this.map && this.props.results && !this.state.markers) {
      this.createMarkers();
    }

    if (this.state.selected !== this.props.selected) {
      this.setState({selected: this.props.selected});
      setTimeout(this.focusSelected.bind(this), 100);
    }

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
                inputRef={this.locationRef}
                autoFocus />
            </Grid>
            <Grid item xs={3} className={this.props.classes.submitContainer}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<SearchIcon />}
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

export default withStyles(styles)(LocationSearchPanel);
