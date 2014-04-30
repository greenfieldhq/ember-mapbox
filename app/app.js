App = Ember.Application.create();

// Register the mapbox component with your app
App.register('component:mapbox-map', Ember.Mapbox.MapboxMapComponent)

// Set config params for the mapbox component
Ember.Mapbox.config = {
  api_key: 'greenfield.i0p4gl0k',
  center: [42.35, -71.051],
  zoom: 15
};
