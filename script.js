/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */
// const d3 = require("d3");
// const waypoints = require("waypoints");
// const bootstrap = require("bootstrap");

// prints "hi" in the browser's dev tools console
console.log("hi");

var mymap = L.map("mapid").setView([34.0522, -118.2437], 13);

var CartoDB_DarkMatter = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19
  }
).addTo(mymap);

var waypoint = new Waypoint({
  element: document.getElementById("scrollstory"),
  handler: function(direction) {
    console.log("Scrolled to " + direction);
  }
});

var waypoint2 = new Waypoint({
  element: document.getElementsByClassName("landmark"),
  handler: function(direction) {
    console.log("Scrolled to " + this);
  }
});
