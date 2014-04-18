App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.config = { 
  api_key: 'greenfield.i0p4gl0k',
  center: [42.35, -71.051],
  zoom: 15
};
