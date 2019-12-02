const GOOGLE_MAPS_BASE_URL = 'https://maps.googleapis.com/maps/api/js?';
const INITIAL_MAP_CENTER = { lat: 39.8283, lng: -98.5795 }; // Center of US
const INITIAL_ZOOM = 4;

let isMapReady = false;

class GoogleMaps {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.loadingPromise = null;
    this.boundElements = {};
  }
  
  loadApiScript = (options = {}) => {
    if (!this.loadingPromise && !isMapReady) {
      this.loadingPromise  = new Promise((resolve, reject) => {
        try {
          window.onGoogleMapsApiLoaded = resolve;
  
          options.key = this.apiKey;
          options.callback = "onGoogleMapsApiLoaded";
          const optionsQuery = Object.keys(options)
            .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(options[k])}`)
            .join('&');
        
          const url = GOOGLE_MAPS_BASE_URL + optionsQuery;
        
          const script = document.createElement('script');
        
          script.setAttribute('src', url);
          script.setAttribute('async', '');
          script.setAttribute('defer', '');
        
          document.head.appendChild(script);
        } catch (error) {
          reject(error);
        }
      }).then(() => {
        isMapReady = true;
        window.onGoogleMapsApiLoaded = undefined;
      });
    }
  
    return this.loadingPromise;
  };

  initMap = (mapElementId) => {
    const mapElement = document.getElementById(mapElementId);
    this.boundMap = new window.google.maps.Map(mapElement, {
      center: INITIAL_MAP_CENTER,
      zoom: INITIAL_ZOOM
    });
  }

  initAutocomplete = (inputElementId, onChangeHandler) => {
    const inputElement = document.getElementById(inputElementId);
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputElement, 
      { componentRestrictions: {country: 'us'} }
    );

    autocomplete.bindTo(this.boundMap);

    window.google.maps.event.addListener(
      autocomplete, 'place_changed', onChangeHandler(inputElementId, autocomplete));
    
    this.boundElements[inputElementId] = autocomplete
  }
}

export default GoogleMaps;
