// adding geoJSON layers through leaflet
// --------------------------------------------------------------- //
const colorFireOrange = "#ff7800";
const colorActiveBlue = "blue";

const territoryBoundsStyle = {
  color: "#fff",
  weight: 2,
  fillOpacity: 0,
  strokeOpacity: 0.5,
  dashArray: "10",
  opacity: 0.5
};

const territoryBoundsStyleFocus = {
  color: "#50e3eb",
  weight: 2,
  fillOpacity: 0,
  strokeOpacity: .8,
  dashArray: "10",
  opacity: 1
};

const amazonLegalBoundsStyle = {
  color: "#50e3eb",
  weight: 4,
  fillOpacity: 0,
  strokeOpacity: .7,
  opacity: 1
};

const firePointsStyle = {
  radius: 1,
  fillColor: colorFireOrange,
  color: colorFireOrange,
  weight: 0,
  opacity: 0.45,
  fillOpacity: 0.45,
  preferCanvas: true
  // renderer: L.Canvas
};

const styleActiveYear = {
  radius: 1,
  fillColor: colorActiveBlue,
  color: colorActiveBlue,
  weight: 0,
  opacity: 0.9,
  fillOpacity: 0.8,
  preferCanvas: true
  // renderer: L.Canvas
};

const styleInactiveYear = {
  radius: 1,
  fillColor: colorFireOrange,
  color: colorFireOrange,
  weight: 0,
  opacity: .45,
  fillOpacity: .45,
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

addTerritoryBounds(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Famazonlegalarea.geojson?v=1576094165990",
  amazonLegalBoundsStyle
);

// POINTS POINTS POINTS POINTS POINTS POINTS
// --------------------------------------------------------------- //

var parqueGeoJSON =
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque_geom.geojson?v=1575833062519";
var araGeoJSON =
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fara_geom.geojson?v=1575833062609";
var maraiGeoJSON =
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2FMaraiwatsede_geom.geojson?v=1575833062821";

// Let's load the GEOJSON as a layer for Leaflet. No d3 in this try.

// Adds geoJSON points/markers to leaflet
// using leaflet features

geoPointsArray = [];
loadOrder = [];
const addGeoJSONPoints = url => {
  fetch(url)
    .then(function(response) {
      // Read data as JSON
      return response.json();
    })
    .then(function(data) {
      // var geojsonMarkerOptions = {
      //   radius: 2,
      //   fillColor: colorFireOrange,
      //   color: "#000",
      //   weight: 0,
      //   opacity: 0.8,
      //   fillOpacity: 0.8
      // };

      loadOrder.push(data.features[0].properties.Name);
      firePointsLayer = L.geoJSON(data, {
        // onEachFeature: function(feature, layer) {
        //   var tempYear = new Date(feature.properties.ACQ_DATE).getFullYear();
        //   console.log(tempYear);
        //   feature.set("ACQ_YEAR", tempYear);
        // },
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, firePointsStyle);
        }
      });

      firePointsLayer.addTo(mymap);
      geoPointsArray.push(firePointsLayer);
      // console.log(JSON.stringify(nest, null));
    });
};

addGeoJSONPoints(parqueGeoJSON);
addGeoJSONPoints(araGeoJSON);
addGeoJSONPoints(maraiGeoJSON);

// console.log(loadOrder);

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


// we probably don't need this anymore, i guess it costs a lot of memory
// const layerIsName = (testIndex, areaName) => {
//   // figures out if we're selecting the right thing
//   var dicty = geoPointsArray[testIndex]._layers;
//   var thisKey = Object.keys(dicty)[0]; // get the key of the first thing
//   return dicty[thisKey].feature.properties.Name == areaName;
// };

// grab name of area from vega event listener
// return index in loadOrder
// index in loadOrder should correspond to index in geoPointsArray
const getAreaLoadIndex = areaName => {
  return loadOrder.indexOf(areaName);
};

var tempYear = new Date();
const updateHighlightedYearPoints = (areaIndex, year) => {
  // console.log("updating index " + areaIndex);
  // console.log("passed thru update function: " + year);

  geoPointsArray[areaIndex].eachLayer(layer => {
    tempYear = new Date(layer.feature.properties.ACQ_DATE);
    // console.log("Updating style: " + layer);
    if (year == tempYear.getFullYear()) {
      layer.setStyle(styleActiveYear);
    } else {
      layer.setStyle(styleInactiveYear);
    }
    // console.log("Successfully styled");
  });
  // var i = 0;
  // while (i < geoPointsArray.length) {
  //   console.log("i value: " + i);
  //   if (layerIsName(i, area)) {
  //     console.log("cond is TRUE on " + i + ", " + area);
  //     //do stuff
  //     geoPointsArray[i].onEachFeature(layer => {
  //        console.log("Changing the layer style woo");
  //       layer.setStyle(styleActiveYear);
  //     });
  //   } else {
  //     i++;
  //   }
  // }
};

// we want to throttle