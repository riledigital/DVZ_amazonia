import {
  territoryBoundsStyle, territoryBoundsStyleFocus, amazonLegalBoundsStyle
} from './mapStyles';

import {
  makeMultiLine, makeLineGraph, makeAreaGraph
} from './plotStyles.js';

export const point_home = L.latLng(-10.250059987303004, -49.46044921875);

export const mapLayerSources = [
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

export const geojsonDataUrls = new Map([
  [
    'parque', 'https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fgeom_parque.geojson'
  ],
  [
    'ara', 'https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fara_geom.geojson'
  ],
  [
    'marai', 'https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2FMaraiwatsede_geom.geojson'
  ]
]);


const globalZoomLevel = 8.5;
const globalOffsetValue = 450;

export const observerTriggers = new Map([
  ['introduction', {
    targetNode: '#introduction',
    point: point_home,
    offset: -800,
    zoom: 7
  }],
  ['parque', {
    targetNode: '#parque',
    point: L.latLng(-11.6388, -50.4877),
    offset: -100,
    zoom: 9.25
  }],
  ['marai', {
    targetNode: '#marai',
    point: L.latLng(-11.745025146562764, -51.6632080078125),
    offset: globalOffsetValue,
    zoom: 11.5
  }],
  ['ara', {
    targetNode: '#ara',
    point: L.latLng(-5.077265294455729, -46.454315185546875),
    offset: globalOffsetValue,
    zoom: 10
  }],
  ['appendix', {
    targetNode: '#appendix',
    point: point_home,
    offset: globalOffsetValue,
    zoom: 7
  }],
]);


export const plotSpecs = [
  {
    id: '#top10_areagraph',
    graph: makeAreaGraph('https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Ftop_10_firecount_of_total.csv?v=1576026693381'
    ),
  },
  {
    id: '#focus_regions_linegraph',
    graph: makeMultiLine('https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Ffocus_regions_linegraph.csv?v=1575991690328'),
  },
  {
    id: '#parque_linegraph',
    graph: makeLineGraph('https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque_linegraph.csv?v=1575833062445')
  },
  {
    id: '#ara_linegraph',
    graph: makeLineGraph('https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fara_linegraph.csv?v=1575833062680'),
  },
  {
    id: '#marai_linegraph',
    graph: makeLineGraph('https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2FMaraiwatsede_linegraph.csv?v=1575833062211'),
  },
];