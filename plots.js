// This is where you should declare your (vega) plots

// README!
// Syntax for the plots
//
// FOR CSS selectors also!
// <div id="parque_linegraph"> </div>
// FOR JS variables,:
// {article}_{type of plot}
// EG: parque_linegraph

// ;)
var linegraph = function(data) {
  return {
    width: 300,
    height: 250,
    data: {
      url: data,
      format: {
        type: "csv"
      }
    },
    layer: [
      {
        
        encoding: {
          x: {
            field: "acq_year",
            type: "temporal",
            axis: { title: "Acquisition year" }
          },
          y: {
            field: "count",
            type: "quantitative",
            axis: { title: "Total fire count" }
          }
        },
        layer: [
          { mark: "line" },
          {
            selection: {
              label: {
                type: "single",
                nearest: true,
                on: "mouseover",
                encodings: ["x"],
                empty: "none"
              }
            },
            mark: "point",
            encoding: {
              opacity: {
                condition: { selection: "label", value: 1 },
                value: 0
              }
            }
          }
        ]
      },
      {
        transform: [{ filter: { selection: "label" } }],
        layer: [
          {
            mark: { type: "rule", color: "gray" },
            encoding: {
              x: { type: "temporal", field: "acq_year" }
            }
          },
          {
            encoding: {
              text: { type: "quantitative", field: "count" },
              x: { type: "temporal", field: "acq_year" },
              y: { type: "quantitative", field: "count" }
            },
            layer: [
              {
                mark: {
                  type: "text",
                  stroke: "white",
                  strokeWidth: 2,
                  align: "left",
                  dx: 5,
                  dy: -5
                }
              },
              {
                mark: { type: "text", align: "left", dx: 5, dy: -5 },
                encoding: {
                  color: { type: "nominal", field: "symbol", legend: null }
                }
              }
            ]
          }
        ]
      }
    ]
  };
};

var parque_linegraph = linegraph(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque_linegraph.csv?v=1575833062445"
);
var ara_linegraph = linegraph(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fara_linegraph.csv?v=1575833062680"
);
var marai_linegraph = linegraph(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2FMaraiwatsede_linegraph.csv?v=1575833062211"
);

vegaEmbed("#parque_linegraph", parque_linegraph);
vegaEmbed("#ara_linegraph", ara_linegraph);
vegaEmbed("#marai_linegraph", marai_linegraph);

// var summary_streamgraph = {
//   // "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
//   "width": 300, "height": 200,
//     data: {
//       url: "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Foverview_streamgraph_fires_by_year.csv?v=1575833062342",
//       format: {
//         type: "csv"
//       }
//     },
//   "mark": "area",
//   "selection": {
//     "Name": {
//       "type": "multi", "fields": ["groupname"], "bind": "legend"
//     }
//   },
//   "encoding": {
//     "x": {
//       "timeUnit": "year", "field": "acq_year", "type": "temporal",
//       "axis": {"domain": false, "format": "%Y", "tickSize": 0}
//     },
//     "y": {
//       "aggregate": "sum", "field": "count", "type": "quantitative",
//       "stack": "center", "axis": null
//     },
//     "color": {
//       "field":"groupname", "type": "nominal",
//       "scale": {"scheme": "category20b"}
//     },
//     "opacity": {
//       "condition": {"selection": "Name", "value": 1},
//       "value": 0.2
//     }
//   }
// }

// vegaEmbed("#summary_streamgraph", summary_streamgraph)
