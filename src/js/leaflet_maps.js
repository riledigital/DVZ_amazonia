import L from 'leaflet';
import {throttle} from 'lodash-es';
import { territoryBoundsStyle, territoryBoundsStyleFocus, styleActiveYear, styleInactiveYear, amazonLegalBoundsStyle} from './mapStyles';

const point_home = L.latLng(-10.250059987303004, -49.46044921875);

const mapOptions = {
  center: point_home,
  maxBounds: L.latLngBounds(L.latLng( 0.21972602392080884, -65.126953125), L.latLng(-31.203404950917385, -35.15625)),
  minZoom: 5,
  zoomControl: false,
  preferCanvas: true,
  dragging: true,
  scrollWheelZoom: false
};

export const setupMap = () => {
  // make the map
  const mymap = L.map('mapid', mapOptions).setView(point_home, 5);

  function setupSources(map) {

    // Adds borders to indigenous lands
    const addTerritoryBounds = (url, styleOptions) => {
      // this is a helper function that adds the geojsons to the map
      try {
        fetch(url)
          .then(function (response) {
            // Read data as JSON
            return response.json();
          })
          .then(function (data) {
            // Add data to the map
            const myLayer = L.geoJSON(data, styleOptions).addTo(map);
            // console.log(data);
          });
      } catch {
        // # nothing
      }
    };

    const layers = [
      ['https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fbra_land_rights.json?v=1575993454246',
        territoryBoundsStyle],
      ['https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque-borders.geojson?v=1575833062533',
        territoryBoundsStyleFocus],
      ['https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fmaraiwatsede-borders.geojson?v=1575833062234',
        territoryBoundsStyleFocus],
      ['https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Faraboia_borders.geojson?v=1575833062709',
        territoryBoundsStyleFocus],
      ['https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Famazonlegalarea.geojson?v=1576094165990',
        amazonLegalBoundsStyle]];

    layers.forEach((d) => {
      addTerritoryBounds(d[0], d[1]);
    });

    const parqueGeoJSON =
            'https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque_geom.geojson?v=1575833062519';
    const araGeoJSON =
            'https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fara_geom.geojson?v=1575833062609';
    const maraiGeoJSON =
            'https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2FMaraiwatsede_geom.geojson?v=1575833062821';

    const geojsonDataUrls = ['https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque_geom.geojson?v=1575833062519',
      'https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fara_geom.geojson?v=1575833062609',
      'https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2FMaraiwatsede_geom.geojson?v=1575833062821'];

    const geoPointsArray = [];
    const loadOrder = [];
    const results = Promise.allSettled(geojsonDataUrls.map(d => fetch(d).then(resp => resp.json())))
      .then((values) => {
        values.map(({value: data}) => {
          console.log('Make sure that we are getting values rather than promises');
          debugger;
          // copy data to loadOrder
          loadOrder.push(data.features[0].properties.Name);

          const firePointsLayer = L.geoJSON(data, {
            pointToLayer: function(feature, latlng) {
              return L.circleMarker(latlng, styleInactiveYear);
            }
          });

          firePointsLayer.addTo(map);
          geoPointsArray.push(firePointsLayer);
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
    ).addTo(mymap);
  }

  setupSources(mymap);
  setupWaypoints(mymap);
  return mymap;
};


const getAreaLoadIndex = (areaName, loadOrder) => {
  // grab name of area from vega event listener
// return index in loadOrder
// index in loadOrder should correspond to index in geoPointsArray
  return loadOrder.indexOf(areaName);
};

export function setupInteractiveMap(map, loadOrder, geoPointsArray) {
  var tempYear = new Date();
  const updateMapStyle = (areaIndex, year) => {
    // console.log("updating index " + areaIndex);
    // console.log("passed thru update function: " + year);

    geoPointsArray[areaIndex].eachLayer(layer => {
      tempYear = new Date(layer.feature.properties.ACQ_DATE);
      if (year == tempYear.getFullYear()) {
        layer.setStyle(styleActiveYear);
      } else {
        layer.setStyle(styleInactiveYear);
      }
    });
  };

  return {
    getAreaLoadIndex,
    updateMapStyle
  };
}

export function setupWaypoints(mymap) {
  const globalZoomLevel = 8.5;
  const globalOffsetValue = 450;

  const observerTriggers = [
    {
      parentNode: null,
      targetNode: '#introduction',
      map: mymap,
      point: point_home,
      offset: -800,
      zoom: 7
    },
    {
      parentNode: null,
      targetNode: '#parque',
      map: mymap,
      point: L.latLng(-11.6388, -50.4877),
      offset: -100,
      zoom: 9.25
    },
    {
      parentNode: null,
      targetNode: '#marai',
      map: mymap,
      point: L.latLng(-11.745025146562764, -51.6632080078125),
      offset: globalOffsetValue,
      zoom: 11.5
    },
    {
      parentNode: null,
      targetNode: '#ara',
      map: mymap,
      point: L.latLng(-5.077265294455729, -46.454315185546875),
      offset: globalOffsetValue,
      zoom: 10
    },
    {
      parentNode: null,
      targetNode: '#appendix',
      map: mymap,
      point: point_home,
      offset: globalOffsetValue,
      zoom: 7
    },
  ];



  function makeObserver(parentNode = document.querySelector('body'), targetNode, map, point, offset = 1.0, zoom = 9) {
    const flyMapTo = (map, point, zoom) => {
      map.flyTo(point, zoom, {
        animate: true,
        duration: 2,
        easeLinearity: 0.05
      });
    };
    const throttled = throttle(() => {
      flyMapTo(map, point, zoom);
    }, 8000);


    const options = {
      root: parentNode,
      rootMargin: '1px',
      threshold: 1.0
    };

    const callback = (entries, obs) => {
      console.info(entries);
      console.info('you scrolled to ' + entries[0].target.id);
      throttled();
    };

    const observer = new IntersectionObserver(callback, options);
    return observer.observe(document.querySelector(targetNode));
  }

  const allObservers = observerTriggers.map(d => {
    makeObserver(d.parentNode, d.targetNode, mymap, d.point, d.offset, d.zoom);
  });
}

