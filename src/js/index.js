import './../styles/style.scss';
import {
  observerTriggers
} from './data';
import {
  setupMap
} from './maps';

import {
  makeAllGraphs,
  setupVegaPlotInteractivity
} from './plots.js';

import './embed';

window.addEventListener('DOMContentLoaded', async (event) => {
  await setupMap(document.querySelector('#mapid'));
  makeAllGraphs();
});

// setupVegaPlotInteractivity();

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('intersecting');
      document.querySelector('.map-legend').classList.add('hidden');
    } else {
      document.querySelector('.map-legend').classList.remove('hidden');
    }
  });
}, {
  threshold: 0.1,
  root: null,
  rootMargin: '0px'
});

observer.observe(document.querySelector('.donate'));