App.MapboxMapComponent = Ember.Component.extend({
  didInsertElement: function() {
    this._super();
    App.map = L.mapbox.map('map', App.config.api_key).setView(App.config.center, App.config.zoom);

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
        var popupView = $this.container.lookup('component:mapbox-map').createChildView(App.PopupView, { context: item });
        event.target.bindPopup(popupView.renderToBuffer().buffer);
        event.target.openPopup();
      });
    }); 
  }
});


App.PopupView = Ember.View.extend({
  templateName: 'popup'
});

Ember.Handlebars.helper('dash-for-null', function(value, options) {
  if (value != null) {
    return value;
  } else {
    return '-';
  }
});
