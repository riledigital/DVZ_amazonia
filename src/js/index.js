import './../styles/style.scss';
import {
  setupMap
} from './maps';

import {
  makeAllGraphs,
  setupVegaPlotInteractivity
} from './plots.js';

window.addEventListener('DOMContentLoaded', (event) => {
  setupMap(document.querySelector('#mapid'));
});

makeAllGraphs();
// setupVegaPlotInteractivity();