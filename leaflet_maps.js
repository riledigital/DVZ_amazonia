// Use this file to load geojson layers
geojsonStyle = {
  color: "#52cc00",
  weight: 2,
  fillOpacity: 0,
  dashArray: "10",
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

addGeoJSONToMap("https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fgeom_parque.geojson");
