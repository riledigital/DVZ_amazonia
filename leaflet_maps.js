// Use this file to load geojson layers
const geojsonStyle = {
  color: "#fff",
  weight: 1,
  fillOpacity: 0.1,
  strokeOpacity: 0.5,
  // dashArray: "10",
  opacity: 0.5
};

const geojsonFocusStyle = {
  color: "#50e3eb",
  weight: 2,
  fillOpacity: 0.5,
  // dashArray: "10",
  opacity: 1
};

// not named properly, but this adds borders
const addGeoJSONToMap = (url, styleOptions) => {
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
        console.log(data);
      });
  } catch {
    // # nothing
  }
};

// addGeoJSONToMap("https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fbra_land_rights.json?v=1575993454246", geojsonStyle);
// addGeoJSONToMap("https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque-borders.geojson?v=1575833062533", geojsonFocusStyle);
// addGeoJSONToMap("https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fmaraiwatsede-borders.geojson?v=1575833062234", geojsonFocusStyle);
// addGeoJSONToMap("https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Faraboia_borders.geojson?v=1575833062709", geojsonFocusStyle);

const firePoints = {
  radius: 1,
  fillColor: "#f00",
  color: "#f00",
  weight: 0,
  opacity: 1,
  fillOpacity: .55,
  preferCanvas: true
  // renderer: L.Canvas
};

var layerGroupByDate = [];
// adding points
const addPointsLayer = (url) => {
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
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, firePoints);
        },
        filter: function(feature, layer) {
          console.log(feature.properties.ACQ_DATE);
          // var f = feature.properties.ACQ_DATE > "2019-01-01";
          // console.log(f);
        }
      }).addTo(mymap);
//       ,
//       sliderControl = L.control.sliderControl({
//         position: "bottomright",
//         layer: myLayer,
//         range: true,
//         timeAttribute: "ACQ_DATE",
//         follow: true,
//       });
//       console.log(myLayer);
//     //add sliderControl to the map
//     mymap.addControl(sliderControl);

//     //initialize sliderControl
//     sliderControl.startSlider()
//     });
})};

// addPointsLayer("https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque_geom.geojson?v=1575833062519");
// addPointsLayer("https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fara_geom.geojson?v=1575833062609");
addPointsLayer("https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2FMaraiwatsede_geom.geojson?v=1575833062821");

//Create sliderControl
// var sliderControl = L.control.sliderControl({
//     position: "bottomright",
//     layer: addPointsLayer("https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fara_geom.geojson?v=1575833062609"),
//     range: true,
//     timeAttribute: "ACQ_DATE",
//     follow: true,
// });



// README Article on using assets lib
// https://glitch.com/~assets-lib
// var assets = require("./assets");
// var express = require("express");
// var app = express();
// app.use("/assets", assets);