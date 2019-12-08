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
point_home = L.latLng(-5.309766, -58.139648);
// make the map
var mymap = L.map("mapid", mapOptions).setView(point_home, 5);

// Declare our zoom points on the map
// Make them with geojson.io but note that its flipped
// http://geojson.io/#map=19/40.80805/-73.96041
point_parque = L.latLng(-50.2458091667028, -50.2455555197316); 
point_hollywood = L.latLng(34.1016774615434, -118.330135345459);
point_nyc = L.latLng(40.80807627279606, -73.96046251058578);
point_burbank = L.latLng(34.18539, -118.364295);
point_koreatown = L.latLng(34.028762179464465, -118.26476454734802);

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

// D3 stuff 
// --------------------------------------------------------------- //

// I keep getting stuff like "L is not defined" or "d3 is not defined or w/e"
// doing shit from bostock tutorial https://bost.ocks.org/mike/leaflet/
var svg = d3.select(mymap.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");

// gross ass geojson data import 
d3.json("https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fgeom_parque.geojson?v=1575832072828", function(error, collection) {
  if (error) throw error;
  console.log("not loaded lol");
  // code here
});

function projectPoint(x, y) {
  var point = mymap.latLngToLayerPoint(new L.LatLng(y, x));
  this.stream.point(point.x, point.y);
}
// console.log(point);
var transform = d3.geoTransform({point: projectPoint}),
    path = d3.geoPath().projection(transform);

var feature = g.selectAll("path")
    .data(collection.features)
  .enter().append("path");

feature.attr("d", path); 

// WAYPOINTS //
// --------------------------------------------------------------- //
// http://imakewebthings.com/waypoints/guides/getting-started/


// This is a callback function
// it changes locations for us
zoomToLocation = (point, zoom) => {
  mymap.flyTo(point, zoom, { animate: true, duration: 2, easeLinearity: 0.1 });
  // mymap.setZoom(zoom);
};

make_waypoint = (selector, triggerpoint, zoomLevel, offsety, callbacky= x=>{}) => {
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

make_waypoint("#introduction", point_home, 3, -20);
make_waypoint("#hollywood", point_home, 7, 50, x => {return console.log('lolol')});
make_waypoint("#burbank", point_home, 5, 50);
make_waypoint("#appendix", point_home, 5 ,900);
make_waypoint("#koreatown", point_koreatown, 50);

// mymap.panTo(point_1);

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "50",
    width: "500",
    videoId: "5wBTdfAkqGU",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  // event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}


