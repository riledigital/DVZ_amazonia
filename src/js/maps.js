import 'leaflet';

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

let mapLayers;


export const setupMap = async (mapContainer) => {
  // make the map
  console.info('making map at '+ mapContainer);
  const mymap = L.map(mapContainer, {
    center: point_home,
    maxBounds: L.latLngBounds(L.latLng( 0.21972602392080884, -65.126953125), L.latLng(-31.203404950917385, -35.15625)),
    minZoom: 5,
    zoomControl: false,
    preferCanvas: true,
    dragging: true,
    scrollWheelZoom: false
  });

  mymap.setView(point_home, 5);

  const CartoDB_Positron = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 15
    }
  ).addTo(mymap);

  setupSources(mymap);
  setupWaypoints(mymap);
  window.myMap = mymap;
  return mymap;
};

async function setupSources(theMap) {
  // Adds borders to indigenous lands
  const addTerritoryBounds = async (url, styleOptions) => {
    const response = await fetch(url);
    const data = await response.json();
    const myLayer = L.geoJSON(data, styleOptions).addTo(theMap);
  };

  mapLayerSources.forEach((d) => {
    addTerritoryBounds(d[0], d[1]);
  });

  mapLayers = new Map();

  Array.from(geojsonDataUrls.entries()).map(
    async (d) => {
      const response = await fetch(d[1]);
      const data = await response.json();

      const firePointsLayer = L.geoJSON(data, {
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, styleInactiveYear);
        }
      });
      firePointsLayer.addTo(theMap);
      console.info('Saved: ' + data.name);
      mapLayers.set(data.name, firePointsLayer);
    });
  return mapLayers;
}

export const updateMapStyle = (areaName, year) => {

  let features = mapLayers.get({
    Arariboia: 'ara_geom',
    'Parque do Araguaia': 'geom_parque',
    Maraiwatsede: 'Maraiwatsede_geom'
  }[areaName]);

  features.eachLayer(layer => {
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
    debugger;
    observer.observe(document.querySelector(d.targetNode));
  });
}

