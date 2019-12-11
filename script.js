// Setup the first leaflet map
// --------------------------------------------------------------- //
// FIRST declare the options
var mapOptions = {
  zoomControl: false,
  preferCanvas: true,
  // renderer: L.Canvas, // this causes serious problems??? im gonna file a bug report
  dragging: false
};

// declare home first (PHONE HOME)
var point_home = L.latLng(-10.250059987303004, -49.46044921875);

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
var point_parque = L.latLng(-11.6388, -50.4877);
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


const globalZoomLevel = 8.5;
const globalOffsetValue = 450;

var make_waypoint = 
(selector, 
  triggerpoint, 
  offsety, 
  zoomLevel = globalZoomLevel, 
  callbacky = x => {}) => {
  new Waypoint({
    element: document.querySelector(selector),
    handler: function(direction) {
      zoomToLocation(triggerpoint, zoomLevel);
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

make_waypoint("#parque", point_parque, (offsety = -100), globalZoomLevel, x => {
  return console.log("we did parque");
});
make_waypoint("#marai", point_marai, globalOffsetValue, 11);

make_waypoint("#ara", point_ara, globalOffsetValue, 10.5,  x => {
  console.log("ara");
});
make_waypoint("#appendix", point_home, globalOffsetValue, globalZoomLevel);




// LEAFLET STYLING
