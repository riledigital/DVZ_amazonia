// D3 stuff
// --------------------------------------------------------------- //

// a mix of bostock (https://bost.ocks.org/mike/leaflet/) and this tutorial (https://observablehq.com/@sfu-iat355/introduction-to-leaflet-and-d3)

// this is anti-DRY but i'm trying to rough draft this right now so i copied and pasted the code :'(
// ideally make this into one function that takes cdn/geojson and path or point parameter so it knows what to draw
fetch(parqueGeoJSON)
  .then(function(response) {
    // Read data as JSON
    return response.json();
  })
  .then(function(data) {
  // ri: the performance hit might be beacuse this is usign SVG to draw the points 
    // i wasn't sure how to deal with projection. this is copied over
    // var projection = d3.geoMercator();

    // Set up the path-drawing function
    // var path = d3.geoPath().projection(projection);
    var transform = d3.geoTransform({ point: projectPoint }),
      path = d3.geoPath().projection(transform);

    console.log(data);
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
