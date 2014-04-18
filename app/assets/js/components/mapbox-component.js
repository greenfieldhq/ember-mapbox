App.MapboxMapComponent = Ember.Component.extend({
  markers: function() {
    return App.data.companies;
  }.property(),
  didInsertElement: function() {
    this._super();
    App.map = L.mapbox.map('map', App.config.api_key).setView(App.config.center, App.config.zoom);

    this.get('markers').forEach(function(marker) {
      var marker = L.marker([marker.latitude, marker.longitude], {
          icon: L.divIcon({
            className: 'marker-icon',
            html: '',
            iconSize: [15, 15]
          })
      });
      marker.addTo(App.map);
    }); 
  }
});
