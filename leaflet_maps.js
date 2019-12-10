// Use this file to load geojson layers
geojsonStyle = {
  color: "#52cc00",
  weight: 2,
  fillOpacity: 0.1,
  // dashArray: "10",
  opacity: 1
};

addGeoJSONToMap = (url) => {
  // this is a helper function that adds the geojsons to the map
  try {
    fetch(url)
      .then(function(response) {
        // Read data as JSON
        return response.json();
      })
      .then(function(data) {
        // Add data to the map
        var myLayer = L.geoJSON(data, geojsonStyle).addTo(mymap);
        console.log(data);
      });
  } catch {
    // # nothing
  }
};

addGeoJSONToMap("https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque-borders.geojson?v=1575833062533");
addGeoJSONToMap("https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fmaraiwatsede-borders.geojson?v=1575833062234");
addGeoJSONToMap("https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Faraboia_borders.geojson?v=1575833062709");


// README Article on using assets lib
// https://glitch.com/~assets-lib
// var assets = require("./assets");
// var express = require("express");
// var app = express();
// app.use("/assets", assets);