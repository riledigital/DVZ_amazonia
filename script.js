/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */
// require('waypoints');
// prints "hi" in the browser's dev tools console
console.log("hi");

// Leaflet maps //
// --------------------------------------------------------------- //
// FIRST declare the options
var mapOptions = {
  preferCanvas: true,
  zoomControl: false,
  renderer: L.Canvas,
  dragging: false
};

// declare home first (PHONE HOME)
var point_home = L.latLng(-5.309766, -58.139648);

// make the map
var mymap = L.map("mapid", mapOptions)
  .setView(point_home, 4
);


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
var point_parque = L.latLng(-50.2458091667028, -50.2455555197316);
var point_hollywood = L.latLng(34.1016774615434, -118.330135345459);
var point_nyc = L.latLng(40.80807627279606, -73.96046251058578);
var point_burbank = L.latLng(34.18539, -118.364295);
var point_koreatown = L.latLng(34.028762179464465, -118.26476454734802);

// This is a callback function
// it changes locations for us
var zoomToLocation = (point, zoomLevel) => {
  mymap.flyTo(point, zoomLevel, {animate: false, duration: 2, easeLinearity: 0.1 });
  // mymap.setZoom(zoom);
};

var make_waypoint = (selector, triggerpoint, offsety, callbacky= x=>{}) => {
  new Waypoint({
    element: document.querySelector(selector),
    handler: function(direction) {
      zoomToLocation(triggerpoint, 5);
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
make_waypoint("#parque", point_home, offsety=-100, x => {
  return console.log("we did parque");
});
make_waypoint("#burbank", point_burbank, 0, x => {console.log('burbank')});
// make_waypoint("#appendix", point_home, 900);
// make_waypoint("#koreatown", point_koreatown, 50);

// mymap.panTo(point_1);


// D3 stuff
// --------------------------------------------------------------- //

var geoitem =
  "https://raw.githubusercontent.com/simonepri/geo-maps/master/previews/countries-land.geo.json";
// gross ass geojson data import

console.log(geoitem);










// old stuff from bostock tutorial
/* d3.json(geoitem, function(error, collection) {
  if (error) throw error;

  var transform = d3.geo.transform({ point: projectPoint }),
    path = d3.geo.path().projection(transform);

  var feature = g
    .selectAll("path")
    .data(collection.features)
    .enter()
    .append("path");

//   mymap.on("viewreset", reset);
//   reset();

  // Reposition the SVG to cover the features.
  function reset() {
    var bounds = path.bounds(collection),
      topLeft = bounds[0],
      bottomRight = bounds[1];

    svg
      .attr("width", bottomRight[0] - topLeft[0])
      .attr("height", bottomRight[1] - topLeft[1])
      .style("left", topLeft[0] + "px")
      .style("top", topLeft[1] + "px");

    g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

    feature.attr("d", path);
  }

  // Use Leaflet to implement a D3 geometric transformation.
  function projectPoint(x, y) {
    var point = mymap.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  }
});*/

// emma::
// var collection = d3.json(geoitem,
//         function(error, collection) {
//   if (error) throw error;
//   console.log("loaded lol");
//   // code here
// });

// function projectPoint(x, y) {
//   var point = mymap.latLngToLayerPoint(new L.LatLng(y, x));
//   this.stream.point(point.x, point.y);
// }
// // console.log(point);
// var transform = d3.geo.transform({point: projectPoint}),
//     path = d3.geo.path().projection(transform);

// var feature = g.selectAll("path")
//     .data(collection.features)
//   .enter().append("path");

// feature.attr("d", path);
