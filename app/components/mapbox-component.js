App.MapboxMapComponent = Ember.Component.extend({
  didInsertElement: function() {
    this._super();
    App.mapbox.map = L.mapbox.map('map', App.mapbox.api_key).setView(App.mapbox.center, App.mapbox.zoom);
    this.drawMarkers();
  },
  drawMarkers: function() {
    if (typeof(App.mapbox.map) != 'undefined') {
      // remove old markers, skip index 0 as that is the actual map tiles
      var layerIndex = 0;
      App.mapbox.map.eachLayer(function(layer) {
        if (layerIndex == 0) {
          layerIndex++;
          return;
        }
        App.mapbox.map.removeLayer(layer);
        layerIndex++;
      }); 
      // add new markers
      var controller = this;
      this.get('markers').forEach(function(item) {
        var marker = L.marker([item.latitude, item.longitude], {
          icon: L.divIcon({
            className: 'marker-icon',
            html: '',
            iconSize: [15, 15]
          })
        });
        marker.addTo(App.mapbox.map);

        marker.removeEventListener();

        var $this = controller;
        marker.on('click', function(event) {
          var popupView = $this.container.lookup('component:mapbox-map').createChildView($this.get('popup-view'), { context: item });
          event.target.bindPopup(popupView.renderToBuffer().buffer);
          event.target.openPopup();
        });
      }); 
    }
  }.observes('markers'),
  // returns list of markers that are within the bounds of the visible map
  visibleMarkers: function() {
    var inBounds = [],
        bounds = App.mapbox.map.getBounds();

    var layerIndex = 0;
    App.mapbox.map.eachLayer(function(marker) {
      if (layerIndex == 0) {
        layerIndex++;
        return;
      }
      if (bounds.contains(marker.getLatLng())) {
        inBounds.push(marker);
      }
      layerIndex++;
    }); 

    return inBounds;
  }.property()
});

App.DefaultPopupView = Ember.View.extend({
  template: Ember.Handlebars.compile('<ul><li>name: <p>{{name}}</p></li><li>description: <div id="description">{{{description}}}</div></li></ul>')
});
