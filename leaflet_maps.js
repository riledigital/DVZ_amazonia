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

var layerGroupByDate = L.layerGroup([]);
// adding points
const addPointsLayer = (url, startDateString, endDateString) => {
  fetch(url)
    .then(function(response) {
      // Read data as JSON
      return response.json();
    })
    .then(function(data) {
      // sorts geoJSON features by acquisition date, ascending order
      // var sorted = data.features.sort((a, b) => a.properties.ACQ_DATE < b.properties.ACQ_DATE ? -1 : ((a.properties.ACQ_DATE > b.properties.ACQ_DATE) ? 1 : 0));
      // Add data to the map
      var myLayer = L.geoJSON(data, {
        filter: function(feature, layer) {
          // console.log(feature.properties.ACQ_DATE);
          var f =
            feature.properties.ACQ_DATE > startDateString &&
            feature.properties.ACQ_DATE < endDateString; // testing the filter
          // console.log(f);
          return f;
        },
        pointToLayer: function(feature, latlng) {
          // console.log(feature);
          return L.circleMarker(latlng, firePointsStyle);
        }
      }).addTo(layerGroupByDate);
    });
};

// addPointsLayer("https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque_geom.geojson?v=1575833062519");
// addPointsLayer("https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fara_geom.geojson?v=1575833062609");
addPointsLayer(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2FMaraiwatsede_geom.geojson?v=1575833062821",
  "2001-01-01",
  "2006-01-01"
);
addPointsLayer(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2FMaraiwatsede_geom.geojson?v=1575833062821",
  "2006-01-01",
  "2011-01-01"
);
// layerGroupByDate.addTo(mymap);

// console.log(layerGroupByDate);
var sliderControl = L.control.sliderControl({
  position: "bottomright",
  layer: layerGroupByDate,
  range: true,
  timeAttribute: "ACQ_DATE",
  follow: true
});

//add sliderControl to the map
mymap.addControl(sliderControl);

// initialize sliderControl
sliderControl.startSlider();

// README Article on using assets lib
// https://glitch.com/~assets-lib
// var assets = require("./assets");
// var express = require("express");
// var app = express();
// app.use("/assets", assets);


// Enable zoom with hold 
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