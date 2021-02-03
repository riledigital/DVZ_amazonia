import 'leaflet';
// import './node_modules/leaflet/dist/leaflet.css';

import {
  point_home
} from './data';

import {
  throttle
} from 'lodash-es';

import {
  styleActiveYear, styleInactiveYear,
} from './mapStyles';

import {
  mapLayerSources, geojsonDataUrls, observerTriggers
} from './data.js';

const L = window.L;
let mapLayers;
export const setupMap = (mapContainer) => {
  // make the map
  console.log('making map at '+ mapContainer);
  const mymap = L.map(mapContainer, {
    center: point_home,
    // maxBounds: L.latLngBounds(L.latLng( 0.21972602392080884, -65.126953125), L.latLng(-31.203404950917385, -35.15625)),
    minZoom: 5,
    zoomControl: false,
    preferCanvas: true,
    dragging: true,
    scrollWheelZoom: false
  });
  mymap.setView(point_home, 5);

  mapLayers = setupSources(mymap);
  debugger;
  setupWaypoints(mymap);
  return mymap;
};

function setupSources(map) {
  // Adds borders to indigenous lands
  const addTerritoryBounds = (url, styleOptions) => {
    try {
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const myLayer = L.geoJSON(data, styleOptions).addTo(map);
        });
    } catch (err) {
      console.error(err);
    }
  };

  mapLayerSources.forEach((d) => {
    addTerritoryBounds(d[0], d[1]);
  });

  const mapLayers = new Map();
  const results = Promise.allSettled(Array.from(geojsonDataUrls.entries()).map(d => fetch(d[1]).then(resp => resp.json())))
    .then((values) => {
      values.map(({
        value: data
      }) => {
        console.log('Make sure that we are getting values rather than promises');

        const firePointsLayer = L.geoJSON(data, {
          pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, styleInactiveYear);
          }
        });

        firePointsLayer.addTo(map);
        debugger;
        mapLayers.set(data.name, firePointsLayer);
      });
    });

  const CartoDB_Positron = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 15
    }
  ).addTo(map);

  // return the loadOrder that we can access for interactivity later;
  // use indexOf to get these
  return mapLayers;
}

export const updateMapStyle = (areaName, year) => {
  // TODO Check areaname
  console.log(arguments);
  console.log(mapLayers);
  debugger;
  const features = mapLayers.get('areaName');
  features.forEach(layer => {
    let tempYear = new Date(layer.feature.properties.ACQ_DATE);
    if (year == tempYear.getFullYear()) {
      layer.setStyle(styleActiveYear);
    } else {
      layer.setStyle(styleInactiveYear);
    }
  });
};


function flyMapTo(map, areaId) {
  const area = observerTriggers.get(areaId);
  map.flyTo(area.point, area.zoom, {
    animate: true,
    duration: 2,
    easeLinearity: 0.05
  });
}

export function setupWaypoints(theMap) {
  console.info('Setup observer');

  const handleIntersection = (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        flyMapTo(theMap, entry.target.id);
      }
    });
  };
  const observer = new IntersectionObserver((entries, obs) => handleIntersection(entries, obs), {
    threshold: 0.1,
    root: null,
    rootMargin: '0px'
  });
  const triggers = Array.from(observerTriggers.values());
  const allObserving = triggers.forEach(d => {
    observer.observe(document.querySelector(d.targetNode));
  });
}

