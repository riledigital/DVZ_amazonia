

import embed from 'vega-embed';

import {
  updateMapStyle
} from './maps';

import {
  plotSpecs
} from './data';


function handlePlotMouseover(view, update) {

  view.addEventListener('mouseover', function (event, item) {
    try {
      const date = new Date(Number(new Date(item.datum.datum.acq_year)));
      let areaName = item.datum.datum.Name;
      update(
        areaName,
        date.getFullYear() + 1
      );
    } catch (error) {
      console.error(error);
    }
  });
}

export function setupVegaPlotInteractivity(id, graph) {
  return embed(id, graph).then(({
    spec, view
  }) => handlePlotMouseover(view, updateMapStyle));
}

export function makeAllGraphs() {
  plotSpecs.forEach(({
    id, graph
  }) => {
    setupVegaPlotInteractivity(id, graph);
  });
}

export default makeAllGraphs;