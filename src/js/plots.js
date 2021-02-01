import { multi_linegraph as makeMultiLine, linegraph as makeLineGraph, areagraph as makeAreaGraph} from './plotStyles.js';
import vegaEmbed from 'vega-embed';

const enableMouseovers = true;

console.log(
  'Toggle this to change it. Currently, enableMouseovers is: ' +
    enableMouseovers
);



var focus_regions_linegraph = makeMultiLine(
);

var parque_linegraph = makeLineGraph(
  'https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque_linegraph.csv?v=1575833062445'
);
var ara_linegraph = makeLineGraph(
  'https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fara_linegraph.csv?v=1575833062680'
);
var marai_linegraph = makeLineGraph(
  'https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2FMaraiwatsede_linegraph.csv?v=1575833062211'
);

var top10_areagraph = makeAreaGraph(
);

// vega embeds! handles event listening for conditional map filtering
// --------------------------------------------------------------- //

const enableMouseoversTrue = x => {
  console.log(
    'Enabled linegraph mouseovers... be careful! Refresh page to restart. '
  );
  enableMouseovers = true;
};

function handlePlotMouseover(view, update, getAreaIndex) {
  if (enableMouseovers) {
    view.addEventListener('mouseover', function(event, item) {
      try {
        const date = new Date(Number(new Date(item.datum.datum.acq_year)));
        let areaName = item.datum.datum.Name;
        update(
          getAreaIndex(areaName),
          date.getFullYear() + 1
        );
      } catch (error) {
        console.error(error);
      }
    });
  }
}

function setupVegaPlotInteractivity(id, graph) {
  vegaEmbed(id, graph).then(({ spec, view }) => handlePlotMouseover(view, updateMapStyle, getAreaIndex));
}

const makeAllGraphs = () => {
  [
    { id: '#top10_areagraph',
      graph: makeAreaGraph(  'https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Ftop_10_firecount_of_total.csv?v=1576026693381'
      ),
    },
    { id: '#focus_regions_linegraph',
      graph: makeMultiLine('https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Ffocus_regions_linegraph.csv?v=1575991690328'),
    },
    { id: '#parque_linegraph',
      graph: makeLineGraph('https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque_linegraph.csv?v=1575833062445')
    },
    { id: '#ara_linegraph',
      graph: makeLineGraph(   'https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fara_linegraph.csv?v=1575833062680'),
    },
    { id: '#marai_linegraph',
      graph: makeLineGraph('https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2FMaraiwatsede_linegraph.csv?v=1575833062211'),
    },
  ].forEach(({ id, graph }) => {
    setupVegaPlotInteractivity(id, graph);
  });
};

export default makeAllGraphs;