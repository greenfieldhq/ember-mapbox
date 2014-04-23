App.MapboxMapComponent = Ember.Component.extend({
  didInsertElement: function() {
    this._super();
    App.map = L.mapbox.map('map', App.mapbox.api_key).setView(App.mapbox.center, App.mapbox.zoom);
    this.drawMarkers();
  },
  drawMarkers: function() {
    if (typeof(App.map) != 'undefined') {
      // remove old markers, skip index 0 as that is the actual map tiles
      var layerIndex = 0;
      App.map.eachLayer(function(layer) {
        if (layerIndex == 0) {
          layerIndex++;
          return;
        }
        App.map.removeLayer(layer);
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
        marker.addTo(App.map);

        marker.removeEventListener();

        var $this = controller;
        marker.on('click', function(event) {
          var popupView = $this.container.lookup('component:mapbox-map').createChildView($this.get('popup-view'), { context: item });
          event.target.bindPopup(popupView.renderToBuffer().buffer);
          event.target.openPopup();
        });
      }); 
    }
  }.observes('markers')
});

App.DefaultPopupView = Ember.View.extend({
  template: Ember.Handlebars.compile('<ul><li>name: <p>{{name}}</p></li><li>description: <div id="description">{{{description}}}</div></li></ul>')
});
