App.MapboxMapComponent = Ember.Component.extend({
  didInsertElement: function() {
    App.map = L.mapbox.map('map', App.config.api_key).setView(App.config.center, App.config.zoom);
  }
});
