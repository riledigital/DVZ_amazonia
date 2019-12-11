// adding geoJSON layers through leaflet
// --------------------------------------------------------------- //

// Use this file to load geojson layers
const territoryBoundsStyle = {
  color: "#fff",
  weight: 1,
  fillOpacity: 0,
  strokeOpacity: 0.5,
  // dashArray: "10",
  opacity: 0.5
};

const territoryBoundsStyleFocus = {
  color: "#50e3eb",
  weight: 2,
  fillOpacity: 0,
  strokeOpacity: 1,
  // dashArray: "10",
  opacity: 1
};

const firePointsStyle = {
  radius: 1,
  fillColor: "#f00",
  color: "#f00",
  weight: 0,
  opacity: .25,
  fillOpacity: 0.4,
  preferCanvas: true
  // renderer: L.Canvas
};

// Adds borders to indigenous lands
const addTerritoryBounds = (url, styleOptions) => {
  // this is a helper function that adds the geojsons to the map
  try {
    fetch(url)
      .then(function(response) {
        // Read data as JSON
        return response.json();
      })
      .then(function(data) {
        // Add data to the map
        var myLayer = L.geoJSON(data, styleOptions).addTo(mymap);
        // console.log(data);
      });
  } catch {
    // # nothing
  }
};

addTerritoryBounds(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fbra_land_rights.json?v=1575993454246",
  territoryBoundsStyle
);

addTerritoryBounds(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque-borders.geojson?v=1575833062533",
  territoryBoundsStyleFocus
);

addTerritoryBounds(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fmaraiwatsede-borders.geojson?v=1575833062234",
  territoryBoundsStyleFocus
);

addTerritoryBounds(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Faraboia_borders.geojson?v=1575833062709",
  territoryBoundsStyleFocus
);

// P
// --------------------------------------------------------------- //
var parqueGeoJSON =
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque_geom.geojson?v=1575833062519";
var araGeoJSON =
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fara_geom.geojson?v=1575833062609";
var maraiGeoJSON =
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2FMaraiwatsede_geom.geojson?v=1575833062821";

// Let's load the GEOJSON as a layer for Leaflet. No d3 in this try.

// Adds geojsons to leaflet
// using leaflet features
const addGeoJSONPoints = url => {
  fetch(url)
    .then(function(response) {
      // Read data as JSON
      return response.json();
    })
    .then(function(data) {
      var geojsonMarkerOptions = {
        radius: 2,
        fillColor: "#ff7800",
        color: "#000",
        weight: 0,
        opacity: 0.8,
        fillOpacity: 0.8
      };

      firePointsLayer = L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
        }
      });
      firePointsLayer.addTo(mymap);

      console.log(JSON.stringify(nest, null));
    });
};

addGeoJSONPoints(parqueGeoJSON);
addGeoJSONPoints(araGeoJSON);
addGeoJSONPoints(maraiGeoJSON);

// just messing around with d3 nesting
// fetch(parqueGeoJSON)
//   .then(function(response) {
//     // Read data as JSON
//     return response.json();
//   })
//   .then(function(data) {
//    var nest = d3.nest()
//       .key(function(d) {return d.properties.ACQ_DATE})
//       .entries(data.features);

//    console.log(JSON.stringify(nest, null));
// });

// README Article on using assets lib
// https://glitch.com/~assets-lib
// var assets = require("./assets");
// var express = require("express");
// var app = express();
// app.use("/assets", assets);


// Enable zoom with hold?
// interact('.tap-target')
//   .on('tap', function (event) {
//     event.currentTarget.classList.toggle('switch-bg')
//     event.preventDefault()
//   })
//   .on('doubletap', function (event) {
//     event.currentTarget.classList.toggle('large')
//     event.currentTarget.classList.remove('rotate')
//     event.preventDefault()
//   })
//   .on('hold', function (event) {
//     event.currentTarget.classList.toggle('rotate')
//     event.currentTarget.classList.remove('large')
//   })