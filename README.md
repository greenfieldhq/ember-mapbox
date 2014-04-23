Ember mapbox-map
============

A reusable Ember component for integrating Mapbox in your application

Usage
=====
###Configuration
Look in app/app.js for a sample configuration

```js
App.mapbox = {
  api_key: 'greenfield.i0p4gl0k',
  center: [42.35, -71.051],
  zoom: 15
};
```
#####api_key
Sign up for a [Mapbox](https://www.mapbox.com) account and get your very own api_key
#####center
Latitude, Longitude. The initial geographical center of the map
#####zoom
Initial map zoom
###Sample data
Sample data can be found in app/data/data.js. You'll want to replace this with your own data which will likely be accessed via your controller.
###Example
```js
<script type="text/x-handlebars" data-template-name="index">
    {{mapbox-map markers=App.data.companies popup-view=App.DefaultPopupView}}
</script>
```
###Default Popup View
todo
###Customize Popup View
todo

Contributions
=============
Pull requests are more than welcome, they're greatly appreciated.
