/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */
// require('waypoints');
// prints "hi" in the browser's dev tools console
console.log("hi");

// Leaflet maps //
// --------------------------------------------------------------- //
// FIRST declare the options
var mapOptions = {
  zoomControl: false,
  // preferCanvas: true, // More issues
  // renderer: L.Canvas, // this causes serious problems??? im gonna file a bug report
  dragging: false
};

// declare home first (PHONE HOME)
var point_home = L.latLng(-5.309766, -58.139648);

// make the map
var mymap = L.map("mapid", mapOptions).setView(point_home, 5);

// assuming this changes the base layer theme or whatever
var CartoDB_Positron = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 15
  }
).addTo(mymap);

// WAYPOINTS //
// --------------------------------------------------------------- //
// http://imakewebthings.com/waypoints/guides/getting-started/
// Declare our zoom points on the map
// Make them with geojson.io but note that its flipped
// http://geojson.io/#map=19/40.80805/-73.96041
var point_parque = L.latLng(-11.119117380425525, -50.28442382812499);
var point_ara = L.latLng(-5.077265294455729, -46.454315185546875);
var point_marai = L.latLng(-11.745025146562764, -51.6632080078125);

// This is a callback function
// it changes locations for us
var zoomToLocation = (point, zoomLevel) => {
  mymap.flyTo(point, zoomLevel, {
    animate: true,
    duration: 1,
    easeLinearity: 0.1
  });
  // mymap.setZoom(zoom);
};

var make_waypoint = (selector, triggerpoint, offsety, callbacky = x => {}) => {
  new Waypoint({
    element: document.querySelector(selector),
    handler: function(direction) {
      zoomToLocation(triggerpoint, 10);
      // callbacky = typeof callbacky !== undefined ? null: callbacky();
      callbacky();
      console.log(
        "Triggered a waypoint with params: " + selector + triggerpoint
      );
    },
    offset: offsety
  });
};

// make_waypoint("#introduction", point_home, -10);

offsetValue = 400;
make_waypoint("#parque", point_parque, (offsety = -100), x => {
  return console.log("we did parque");
});
make_waypoint("#ara", point_ara, offsetValue, x => {
  console.log("ara");
});
make_waypoint("#marai", point_marai, offsetValue);
make_waypoint("#appendix", point_home, offsetValue);

// mymap.panTo(point_1);
var parqueGeoJSON = "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque_geom.geojson?v=1575833062519";
var araGeoJSON = "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fara_geom.geojson?v=1575833062609";
var maraiGeoJSON = "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2FMaraiwatsede_geom.geojson?v=1575833062821";

fetch(parqueGeoJSON)
  .then(function(response) {
    // Read data as JSON
    return response.json();
  })
  .then(function(data) {
   var nest = d3.nest()
      .key(function(d) {return d.properties.ACQ_DATE})
      .entries(data.features);

   console.log(JSON.stringify(nest, null, 2));
});