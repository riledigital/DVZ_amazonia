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
var point_parque = L.latLng(-14.916919445133201, -51.81976318359375,
);

// make the map
var mymap = L.map("mapid", mapOptions).setView(point_parque, 7);

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
var point_hollywood = L.latLng(34.1016774615434, -118.330135345459);
var point_nyc = L.latLng(40.80807627279606, -73.96046251058578);
var point_burbank = L.latLng(34.18539, -118.364295);
var point_koreatown = L.latLng(34.028762179464465, -118.26476454734802);

// This is a callback function
// it changes locations for us
var zoomToLocation = (point, zoomLevel) => {
  mymap.flyTo(point, zoomLevel, {
    animate: false,
    duration: 2,
    easeLinearity: 0.1
  });
  // mymap.setZoom(zoom);
};

var make_waypoint = (selector, triggerpoint, offsety, callbacky = x => {}) => {
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
make_waypoint("#parque", point_home, (offsety = -100), x => {
  return console.log("we did parque");
});
make_waypoint("#burbank", point_burbank, 0, x => {
  console.log("burbank");
});
// make_waypoint("#appendix", point_home, 900);
// make_waypoint("#koreatown", point_koreatown, 50);

// mymap.panTo(point_1);



// D3 stuff
// --------------------------------------------------------------- //

// a mix of bostock (https://bost.ocks.org/mike/leaflet/) and this tutorial (https://observablehq.com/@sfu-iat355/introduction-to-leaflet-and-d3)

// drawing borders
/*fetch(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Faraboia_borders.geojson?v=1575833062709"
)
  .then(function(response) {
    // Read data as JSON
    return response.json();
  })
  .then(function(data) {
    // i wasn't sure how to deal with projection. this is copied over
    // var projection = d3.geoAlbersUsa();

    // Set up the path-drawing function
    // var path = d3.geoPath().projection(projection);
    var transform = d3.geoTransform({ point: projectPoint }),
      path = d3.geoPath().projection(transform);
    
    console.log(data)
    // actual point drawing, just regular d3 stuff
    var feature = g
      .selectAll("path")
      .attr("class", "border")
      .data(data.features)
      .join("path")
      .attr("stroke", "black")
      .attr("stroke-width", 0.5)

      // leaflet handles coordinates
      .attr(
        "cx",
        d =>
          mymap.latLngToLayerPoint([
            d.geometry.coordinates[1],
            d.geometry.coordinates[0]
          ]).x
      )
      .attr(
        "cy",
        d =>
          mymap.latLngToLayerPoint([
            d.geometry.coordinates[1],
            d.geometry.coordinates[0]
          ]).y
      )
      .attr("r", 1);

    // just for debugging, this is actually cool and shows you the html of each point drawn
    console.log(feature);

    mymap.on("viewreset", reset);
    reset();

    // according to bostock this function "repositions the svg to cover the features"...not sure what it means but it works lol
    // i fear this messes up the zoom...but do we need it?
    function reset() {
      var bounds = path.bounds(data),
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
  });*/

// this is anti-DRY but i'm trying to rough draft this right now so i copied and pasted the code :'(
// ideally make this into one function that takes cdn/geojson and path or point parameter so it knows what to draw
fetch(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fgeom_parque.geojson?v=1575832072828"
)
  .then(function(response) {
    // Read data as JSON
    return response.json();
  })
  .then(function(data) {
    // i wasn't sure how to deal with projection. this is copied over
    // var projection = d3.geoAlbersUsa();

    // Set up the path-drawing function
    // var path = d3.geoPath().projection(projection);
    var transform = d3.geoTransform({ point: projectPoint }),
      path = d3.geoPath().projection(transform);
  
    console.log(data)
    // actual point drawing, just regular d3 stuff
    var feature = g
      .selectAll("circle")
      .attr("class", "fire-points")
      .data(data.features)
      .join("circle")
      .attr("fill", "red")

      // leaflet handles coordinates
      .attr(
        "cx",
        d =>
          mymap.latLngToLayerPoint([
            d.geometry.coordinates[1],
            d.geometry.coordinates[0]
          ]).x
      )
      .attr(
        "cy",
        d =>
          mymap.latLngToLayerPoint([
            d.geometry.coordinates[1],
            d.geometry.coordinates[0]
          ]).y
      )
      .attr("r", 1);

    // just for debugging, this is actually cool and shows you the html of each point drawn
    console.log(feature);

    mymap.on("viewreset", reset);
    reset();

    // according to bostock this function "repositions the svg to cover the features"...not sure what it means but it works lol
    // i fear this messes up the zoom...but do we need it?
    function reset() {
      var bounds = path.bounds(data),
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
  });

// according to bostock this "uses leaflet to implement d3 geometric transformation"
function projectPoint(x, y) {
  var point = mymap.latLngToLayerPoint(new L.LatLng(y, x));
  this.stream.point(point.x, point.y);
}

// drawing d3 over the map?
var svg = d3.select(mymap.getPanes().overlayPane).append("svg"),
  g = svg.append("g").attr("class", "leaflet-zoom-hide");
